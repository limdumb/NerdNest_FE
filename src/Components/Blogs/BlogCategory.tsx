import { useState } from "react";
import { VscFolderOpened } from "react-icons/vsc";
import { CategoryType } from "../../Pages/Blogs";
import createCategory from "../../API/Blogs/Post/createCategory";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsTrashFill } from "react-icons/bs";
import "./Style/blogCategory.css";

/*  
  * 카테고리 CRUD는 memberId를 기준으로 확인하기 + API 요청은 전부 Token필요 *
  1. 카테고리를 추가하는것
  1-1 추가/수정/삭제 모드로 전환이 가능한 state를 만든다 + 버튼도 만든다 O
  1-2 추가 버튼을 만든다 O
  1-3 추가 버튼을 누르면 마지막 카테고리 밑에 input과 확인버튼을 만든다 O
  1-4 확인 버튼을 누르면 추가되었습니다 라는 alert가 확인되면서 O
      input과 버튼이 사라지고 카테고리가 추가된다 O
  2. 카테고리를 삭제하는것
  3. 카테고리를 수정하는것
  4. 클릭할때 해당 카테고리에 맞는 데이터를 볼수있는 로직구현
  4-1 url 변경시켜서 쿼리로 받을 수 있게 하기
 */

interface Props extends CategoryType {
  newCategory: boolean;
  editActive: boolean;
  setNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BlogCategory({
  categoryList,
  newCategory,
  editActive,
  setNewCategory,
}: Props) {
  const [CategoryValue, setCategoryValue] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");

  const addCategoryHandler = (
    categoryId: number,
    categoryName: string,
    data: CategoryType[]
  ) => {
    setNewCategory(!newCategory);
    const newCategoryData = {
      categoryId: categoryId,
      categoryName: categoryName,
    };
    data.push(newCategoryData as any);
    setCategoryValue("");
  };

  return (
    <ul>
      {categoryList.map((el) => {
        return (
          <li className="Category_List" key={el.categoryId}>
            <div className="Category_Contents">
              <VscFolderOpened className="Folder_Icon" />
              <button className="Category_Name">{el.categoryName}</button>
              {editActive ? (
                <>
                  <BsTrashFill color="gray" className="Category_Delete_Icon" />
                  <HiDotsHorizontal />
                </>
              ) : null}
            </div>
          </li>
        );
      })}
      {editActive ? (
        newCategory ? (
          <div className="Category_Add_Container">
            <VscFolderOpened className="Add_Folder_Icon" />
            <input
              className="Category_Add_Input"
              defaultValue={CategoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            />
            <button
              className="Category_Submit_Button"
              onClick={() => {
                createCategory(CategoryValue, accessToken);
                addCategoryHandler(
                  (categoryList.length + 1) as number,
                  CategoryValue,
                  categoryList as unknown as CategoryType[]
                );
              }}
            >
              확인
            </button>
          </div>
        ) : null
      ) : null}
    </ul>
  );
}
