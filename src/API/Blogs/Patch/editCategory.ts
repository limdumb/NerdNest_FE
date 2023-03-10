import { baseInstance } from "../../Instance/Instance";

export default async function editCategory(
  categoryId: number,
  categoryName: string,
  accessToken: string | null
) {
  try {
    baseInstance.defaults.headers.common["Authorization"] = accessToken;
    await baseInstance
      .patch(`category/${categoryId}`, { categoryName: categoryName })
      .then((res) => {
        if (res.data.code === 200) {
          alert("카테고리가 수정 되었습니다!");
        }
      });
  } catch (err) {
    console.error(err);
  }
}
