import { useEffect, useState } from "react";
import { VscFolderOpened } from "react-icons/vsc";
import { CategoryType } from "../../Pages/Blogs";
import createCategory from "../../API/Blogs/Post/createCategory";
import deleteCategory from "../../API/Blogs/Delete/deleteCategory";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsTrashFill } from "react-icons/bs";
import "./Style/blogCategory.css";
import editCategory from "../../API/Blogs/Patch/editCategory";
import { Params, useNavigate } from "react-router-dom";

interface Props extends CategoryType {
  newCategory: boolean;
  editActive: boolean;
  setNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setRenderState: React.Dispatch<React.SetStateAction<boolean>>;
  renderState: boolean;
  params: Readonly<Params<string>>;
}

export default function BlogCategory({
  categoryList,
  newCategory,
  editActive,
  setNewCategory,
  setRenderState,
  renderState,
  params,
}: Props) {
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [nameEditCheck, setNameEditCheck] = useState<boolean>(false);
  const [categoryIndex, setCategoryIndex] = useState(1);
  const accessToken = localStorage.getItem("accessToken");
  const lastCategoryId = categoryList[categoryList.length - 1].categoryId + 1;
  const navigate = useNavigate();
  const addCategoryHandler = (categoryId: number) => {
    if (categoryValue !== "전체") {
      setNewCategory(!newCategory);
      const newCategoryData = {
        categoryId: categoryId,
        categoryName: categoryValue,
      };
      categoryList.push(newCategoryData);
      setCategoryValue("");
    }
  };

  const deleteCategoryHandler = (index: number) => {
    categoryList.splice(index, 1);
    setRenderState(!renderState);
  };

  const editCategoryHandler = (categoryId: number, index: number) => {
    setNameEditCheck(false);
    categoryList.splice(index, 1, {
      categoryId: categoryId,
      categoryName: categoryValue,
    });
  };

  return (
    <ul>
      {categoryList.map((el, index) => {
        return (
          <li className="Category_List" key={el.categoryId}>
            <div className="Category_Contents">
              <VscFolderOpened className="Folder_Icon" />
              {nameEditCheck ? (
                categoryIndex === index ? (
                  <>
                    <input
                      className="Category_Add_Input"
                      defaultValue={el.categoryName}
                      onChange={(e) => setCategoryValue(e.target.value)}
                    />
                    <button
                      className="Category_Submit_Button"
                      onClick={() => {
                        if (
                          el.categoryName !== categoryValue &&
                          categoryValue.length !== 0
                        ) {
                          editCategory(
                            el.categoryId,
                            categoryValue,
                            accessToken
                          );
                          editCategoryHandler(el.categoryId, index);
                        } else {
                          alert(
                            "기존 이름과 동일하거나 입력을 하지 않았습니다 변경을 원하지 않으시면 수정버튼을 다시 눌러주세요"
                          );
                        }
                      }}
                    >
                      확인
                    </button>
                  </>
                ) : (
                  <button
                    className="Category_Name"
                    onClick={() => navigate(`?=${el.categoryName}`)}
                  >
                    {el.categoryName}
                  </button>
                )
              ) : (
                <button
                  className="Category_Name"
                  onClick={() => navigate(`?=${el.categoryName}`)}
                >
                  {el.categoryName}
                </button>
              )}
              {editActive ? (
                el.categoryName !== "전체" ? (
                  <>
                    <BsTrashFill
                      color="gray"
                      className="Category_Delete_Icon"
                      onClick={() => {
                        deleteCategoryHandler(index);
                        deleteCategory(
                          el.categoryId,
                          el.categoryName,
                          accessToken
                        );
                      }}
                    />
                    <HiDotsHorizontal
                      onClick={(e) => {
                        console.log(index);
                        setNameEditCheck(!nameEditCheck);
                        setCategoryIndex(index);
                      }}
                    />
                  </>
                ) : null
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
              defaultValue={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            />
            <button
              className="Category_Submit_Button"
              onClick={() => {
                createCategory(categoryValue, accessToken);
                addCategoryHandler(lastCategoryId);
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
