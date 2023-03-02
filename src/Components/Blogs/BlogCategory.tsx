import { VscFolderOpened } from "react-icons/vsc";
import "./Style/blogCategory.css"

export default function BlogCategory() {
  return (
    <ul>
      <li className="Category_List">
        <VscFolderOpened className="Folder_Icon"/>
        <button className="Category_Name">전체</button>
      </li>
      {/* 추후 데이터 map예정 */}
    </ul>
  );
}
