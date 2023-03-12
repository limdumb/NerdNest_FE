import { ChangeEvent, useEffect, useState } from "react";
import {
  WriteWrapper,
  ImageUploaderWrapper,
  TitleWriteWrapper,
} from "./BlogWrite";
import TextEditor from "../Components/BlogWrite/TextEditor";
import CommonInput from "../Components/Common/CommonInput";
import CategorySelect from "../Components/BlogWrite/CategorySelect";
import EventButton from "../Components/Common/EventButton";
import editBlogPost from "../API/BlogWriteEdit/Patch/editBlogPost";
import { CategoryType } from "./Blogs";
import useFetch from "../Custom Hook/useFetch";
import "./Style/blogWrite.css";
import { useParams } from "react-router-dom";
import ImageUploader from "../Components/Common/ImageUploader";

interface ExistingDataType {
  titleImageUrl: string;
  blogTitle: string;
  blogContent: string;
  categoryId: number;
}

const BlogWrite = () => {
  const params = useParams();
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

  const existingData = useFetch<{ data: ExistingDataType }>(
    `/blogs/edit/${params.blogId}`,
    { data: existingInitialValue },
    accessToken as string
  );

  const [blogText, setBlogText] = useState("");
  const [blogData, setBlogData] = useState({
    titleImageUrl: existingData.data.data.titleImageUrl,
    blogTitle: existingData.data.data.blogTitle,
    blogContent: existingData.data.data.blogContent,
  });

  useEffect(() => {
    if (!existingData.loading) {
      setBlogData({
        titleImageUrl: existingData.data.data.titleImageUrl,
        blogTitle: existingData.data.data.blogTitle,
        blogContent: existingData.data.data.blogContent,
      });
    }
  }, [existingData]);

  const [categoryId, setCategoryId] = useState<number>(
    categoryData.data.categoryList[0].categoryId
  );
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
        <TextEditor blogText={blogData.blogContent} setBlogText={setBlogText} />
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
        <EventButton usage={"edit"} />
      </div>
    </WriteWrapper>
  );
};

export default BlogWrite;
