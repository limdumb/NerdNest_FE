import React from "react";
import styled from "styled-components";
import { Wrapper } from "./Blogs";
import TextEditor from "../Components/BlogWrite/TextEditor";
import TitleImageUploarder from "../Components/BlogWrite/TitleImageUploarder";

const WirteWrapper = styled(Wrapper)`
  margin-top: 20px;
`;

const ImageUploaderWrapper = styled(Wrapper)`
  margin-bottom: 20px;
`;

const TitleWriteWrapper = styled(Wrapper)`
  margin-top: 20px;
`;

const BlogWrite = () => {
  return (
    <WirteWrapper>
      <ImageUploaderWrapper>
        <ImageUploaderWrapper />
        <TitleImageUploarder/>
        <span>썸네일을 등록 해주세요</span>
      </ImageUploaderWrapper>
      <hr/>
      <TitleWriteWrapper></TitleWriteWrapper>
      <div>
        <TextEditor />
      </div>
      <div></div>
      <div></div>
    </WirteWrapper>
  );
};

export default BlogWrite;
