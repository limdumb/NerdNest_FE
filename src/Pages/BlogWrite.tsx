import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { CategoryType, Wrapper } from "./Blogs";
import TextEditor from "../Components/BlogWrite/TextEditor";
import TitleImageUploarder from "../Components/BlogWrite/TitleImageUploarder";
import CommonInput from "../Components/Common/CommonInput";
import CategorySelect from "../Components/BlogWrite/CategorySelect";
import EventButton from "../Components/Common/EventButton";
import useFetch from "../Custom Hook/useFetch";
import postBlog from "../API/BlogWriteEdit/Post/postBlog";
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
  const [blogText, setBlogText] = useState("");
  const [blogData, setBlogData] = useState({
    titleImageUrl: "",
    blogTitle: "",
    blogContent: "",
    categoryId: null,
  });
  const memberId = localStorage.getItem("memberId");
  const CateogryInitialValue = {
    categoryList: [{ categoryId: 0, categoryName: "" }],
  };
  const categoryData = useFetch<CategoryType>(
    `/category/${memberId}`,
    CateogryInitialValue
  );

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
        <CategorySelect data={categoryData.data.categoryList} />
      </div>
      <hr />
      <div className="Submit_Container">
        <EventButton usage={"write"} />
      </div>
    </WriteWrapper>
  );
};

export default BlogWrite;
