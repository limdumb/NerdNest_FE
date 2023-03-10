import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs"
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";

interface Props {
  blogText: string;
  setBlogText: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextEditor(props: Props) {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef.current?.getInstance().setHTML(props.blogText);
  }, [props.blogText]);

  const onEditorBlur = () => {
    const HTMLText = editorRef.current?.getInstance().getHTML();
    props.setBlogText(HTMLText as string);
  };

  return (
    <div>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="800px" // 에디터 창 높이
        initialEditType="markdown" // 초기 입력모드 설정(디폴트 markdown)
        language="ko-KR"
        ref={editorRef}
        onBlur={onEditorBlur}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        hideModeSwitch
      ></Editor>
    </div>
  );
}
