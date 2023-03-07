import { ChangeEvent, useState } from "react";
import {
  WriteWrapper,
  ImageUploaderWrapper,
  TitleWriteWrapper,
} from "./BlogWrite";
import TextEditor from "../Components/BlogWrite/TextEditor";
import TitleImageUploarder from "../Components/BlogWrite/TitleImageUploarder";
import CommonInput from "../Components/Common/CommonInput";
import CategorySelect from "../Components/BlogWrite/CategorySelect";
import EventButton from "../Components/Common/EventButton";
import getBlogEditData from "../API/BlogWriteEdit/Get/getBlogEditData";
import editBlogPost from "../API/BlogWriteEdit/Patch/editBlogPost";
import "./Style/blogWrite.css";

const BlogWrite = () => {
  const [blogText, setBlogText] = useState("");
  const [blogData, setBlogData] = useState({
    titleImageUrl: "",
    blogTitle: "",
    blogContent: "",
    categoryId: null,
  });
  const [categoryValue, setCategoryValue] = useState(0);

  const dummyData = [
    { categoryId: 1, categoryName: "전체" },
    { categoryId: 2, categoryName: "리액트1" },
    { categoryId: 3, categoryName: "리액트2" },
    { categoryId: 4, categoryName: "리액트3" },
  ];

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
        <TitleImageUploarder />
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
        <CategorySelect data={dummyData} setCategoryValue={setCategoryValue} />
      </div>
      <hr />
      <div className="Submit_Container">
        <EventButton usage={"edit"} />
      </div>
    </WriteWrapper>
  );
};

export default BlogWrite;