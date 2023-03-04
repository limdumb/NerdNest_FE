import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "./Blogs";
import TextEditor from "../Components/BlogWrite/TextEditor";
import TitleImageUploarder from "../Components/BlogWrite/TitleImageUploarder";
import CommonInput from "../Components/Common/CommonInput";

const WirteWrapper = styled(Wrapper)`
  margin-top: 20px;
`;

const ImageUploaderWrapper = styled(Wrapper)`
  margin-bottom: 20px;
`;

const TitleWriteWrapper = styled(Wrapper)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const BlogWrite = () => {
  const [blogData, setBlogData] = useState({
    titleImageUrl: "",
    blogTitle: "",
    blogContent: "",
    categoryId: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setBlogData(() => ({
      ...blogData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <WirteWrapper>
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {handleInputChange(e)}}
          type={"text"}
          placeholder={"제목을 입력하세요"}
        />
      </TitleWriteWrapper>
      <div>
        <TextEditor blogContent={blogData.blogContent}/>
      </div>
      <div></div>
      <div></div>
    </WirteWrapper>
  );
};

export default BlogWrite;
