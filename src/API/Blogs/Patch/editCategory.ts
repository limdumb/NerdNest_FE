import { tokenInstance } from "../../Instance/Instance";

export default async function editCategory(
  categoryId: number,
  categoryName: string
) {
  try {
    await tokenInstance
      .patch(`category/${categoryId}`, { categoryName: categoryName })
      .then((res) => {
        if (res.status === 200) {
          alert("카테고리가 수정 되었습니다!");
        }
      });
  } catch (err) {
    console.error(err);
  }
}