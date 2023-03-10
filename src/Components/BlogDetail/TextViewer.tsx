import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const TextViewer = ({ contents }: { contents: string }) => {
  return (
    <>
      <Viewer
        initialValue={contents}
        plugins={[[codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
      />
    </>
  );
};

export default TextViewer;
