import useFetch from "../Custom Hook/useFetch";
import { CategoryType, MemberType } from "./Blogs";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventButton from "../Components/Common/EventButton";
import CommonInput from "../Components/Common/CommonInput";
import TextEditor from "../Components/BlogWrite/TextEditor";
import ImageUploader from "../Components/Common/ImageUploader";
import editBlogPost from "../API/BlogWriteEdit/Patch/editBlogPost";
import CategorySelect from "../Components/BlogWrite/CategorySelect";
import { titleImageUploader } from "../API/Blogs/Post/imageUploader";
import {
  WriteWrapper,
  ImageUploaderWrapper,
  TitleWriteWrapper,
} from "./BlogWrite";
import "./Style/blogWrite.css";

interface ExistingDataType {
  titleImageUrl: string;
  blogTitle: string;
  blogContent: string;
  categoryId: number;
}

const BlogWrite = () => {
  const params = useParams();
  const navigate = useNavigate();
  const memberId = parseInt(localStorage.getItem("memberId") as string);
  const accessToken = localStorage.getItem("accessToken");
  const existingInitialValue: ExistingDataType = {
    titleImageUrl: "",
    blogTitle: "",
    blogContent: "",
    categoryId: 0,
  };

  const CateogryInitialValue = {
    categoryList: [{ categoryId: 0, categoryName: "" }],
  };
  const categoryData = useFetch<CategoryType>(
    `/category/${memberId}`,
    CateogryInitialValue
  );
  const memberInitialValue = {
    profileImageUrl: "",
    nickName: "",
    about: "",
  };
  const memberData = useFetch<MemberType>(
    `/members/${memberId}`,
    memberInitialValue
  );

  const existingData = useFetch<{ data: ExistingDataType }>(
    `/blogs/edit/${params.blogId}`,
    { data: existingInitialValue },
    accessToken as string
  );

  const [blogText, setBlogText] = useState(existingData.data.data.blogContent);
  const [blogData, setBlogData] = useState({
    titleImageUrl: existingData.data.data.titleImageUrl,
    blogTitle: existingData.data.data.blogTitle,
  });

  const [categoryId, setCategoryId] = useState<number>(
    categoryData.data.categoryList[0].categoryId
  );

  useEffect(() => {
    if (!existingData.loading) {
      setBlogData({
        titleImageUrl: existingData.data.data.titleImageUrl,
        blogTitle: existingData.data.data.blogTitle,
      });
      setBlogText(existingData.data.data.blogContent);
    }

    if (!categoryData.loading) {
      setCategoryId(categoryData.data.categoryList[0].categoryId);
    }
  }, [existingData]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setBlogData(() => ({
      ...blogData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <WriteWrapper>
      <ImageUploaderWrapper>
        <ImageUploaderWrapper />
        <ImageUploader
          setImageFile={setImageFile}
          imageFile={imageFile}
          profileImageUrl={blogData.titleImageUrl}
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
          usage={"edit"}
          onClick={async () => {
            if(imageFile !== null){
              const imageResponse = await titleImageUploader(imageFile as File)
              editBlogPost({
                blogId: parseInt(params.blogId as string),
                blogTitle: blogData.blogTitle,
                blogContent: blogText,
                categoryId: categoryId,
                titleImageUrl: imageResponse.imageFileUrl,
              });
              navigate(
                `/${memberData.data.nickName}/${memberId}/${blogData.blogTitle}/${params.blogId}`
              );
            } else {
              editBlogPost({
                blogId: parseInt(params.blogId as string),
                blogTitle: blogData.blogTitle,
                blogContent: blogText,
                categoryId: categoryId,
                titleImageUrl: blogData.titleImageUrl,
              });
              navigate(
                `/${memberData.data.nickName}/${memberId}/${blogData.blogTitle}/${params.blogId}`
              );
            }
          }}
        />
      </div>
    </WriteWrapper>
  );
};

export default BlogWrite;
