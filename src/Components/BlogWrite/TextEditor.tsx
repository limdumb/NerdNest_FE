import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';

interface Props{
  
}

export default function TextEditor() {
  const editorRef = useRef(null)
  return (
    <div>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="800px" // 에디터 창 높이
        initialEditType="markdown" // 초기 입력모드 설정(디폴트 markdown)
        language="ko-KR"
        ref={editorRef}
        hideModeSwitch
      ></Editor>
    </div>
  );
}
