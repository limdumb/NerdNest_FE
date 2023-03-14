import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryType, MemberType, Wrapper } from "./Blogs";
import TextEditor from "../Components/BlogWrite/TextEditor";
import ImageUploader from "../Components/Common/ImageUploader";
import CommonInput from "../Components/Common/CommonInput";
import CategorySelect from "../Components/BlogWrite/CategorySelect";
import EventButton from "../Components/Common/EventButton";
import useFetch from "../Custom Hook/useFetch";
import postBlog from "../API/BlogWriteEdit/Post/postBlog";
import { useNavigate } from "react-router-dom";
import { titleImageUploader } from "../API/Blogs/Post/imageUploader";
import "./Style/blogWrite.css";

export const WriteWrapper = styled(Wrapper)`
  margin-top: 20px;
`;

export const ImageUploaderWrapper = styled(Wrapper)`
  margin-bottom: 20px;
`;

export const TitleWriteWrapper = styled(Wrapper)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const BlogWrite = () => {
  const memberId = parseInt(localStorage.getItem("memberId") as string);
  const CateogryInitialValue = {
    categoryList: [{ categoryId: 0, categoryName: "" }],
  };
  const memberInitialValue = {
    profileImageUrl: "",
    nickName: "",
    about: "",
  };

  const categoryData = useFetch<CategoryType>(
    `/category/${memberId}`,
    CateogryInitialValue
  );

  const memberData = useFetch<MemberType>(
    `/members/${memberId}`,
    memberInitialValue
  );
  const [blogText, setBlogText] = useState("");
  const [blogData, setBlogData] = useState({
    blogTitle: "",
    categoryId: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number>(
    categoryData.data.categoryList[0].categoryId
  );
  const accessToken = localStorage.getItem("accessToken");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setBlogData(() => ({
      ...blogData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!categoryData.loading) {
      setCategoryId(categoryData.data.categoryList[0].categoryId);
    }
  });

  const navigate = useNavigate();

  return (
    <WriteWrapper>
      <ImageUploaderWrapper>
        <ImageUploaderWrapper />
        <ImageUploader
          setImageFile={setImageFile}
          imageFile={imageFile}
          profileImageUrl={""}
          usage={"Title"}
        />
        <span>썸네일을 등록 해주세요</span>
      </ImageUploaderWrapper>
      <hr />
      <TitleWriteWrapper>
        <CommonInput
          name="blogTitle"
          label="H1"
          value={blogData.blogTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
          }}
          type={"text"}
          placeholder={"제목을 입력하세요"}
        />
      </TitleWriteWrapper>
      <label className="Editor_Label">Body</label>
      <div className="Text_Editor_Container">
        <TextEditor blogText={blogText} setBlogText={setBlogText} />
      </div>
      <div className="Category_Container">
        <span className="Editor_Label">카테고리</span>
        <CategorySelect
          data={categoryData.data.categoryList}
          setCategoryId={setCategoryId}
        />
      </div>
      <hr />
      <div className="Submit_Container">
        <EventButton
          usage={"write"}
          onClick={async () => {
            if (imageFile !== null) {
              const imageResponse = await titleImageUploader(
                imageFile as File,
                accessToken
              );
              const blogResponse = await postBlog({
                titleImageUrl: imageResponse.imageFileUrl,
                blogTitle: blogData.blogTitle,
                blogContent: blogText,
                categoryId: categoryId,
                accessToken: accessToken,
              });
              navigate(
                `/${memberData.data.nickName}/${memberId}/${blogData.blogTitle}/${blogResponse}`
              );
            }
            if (imageFile === null) {
              const blogResponse = await postBlog({
                titleImageUrl: "",
                blogTitle: blogData.blogTitle,
                blogContent: blogText,
                categoryId: categoryId,
                accessToken: accessToken,
              });
              navigate(
                `/${memberData.data.nickName}/${memberId}/${blogData.blogTitle}/${blogResponse}`
              );
            }
          }}
        />
      </div>
    </WriteWrapper>
  );
};

export default BlogWrite;
