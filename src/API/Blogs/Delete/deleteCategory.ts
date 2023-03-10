import { baseInstance } from "../../Instance/Instance";

export default async function deleteCategory(
  categoryId: number,
  categoryName: string,
  accessToken: string | null
) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  try {
    await baseInstance.delete(`/category/${categoryId}`).then((res) => {
      if (res.status === 204)
        alert(
          `${categoryName} 카테고리가 삭제 되었습니다. 게시글은 삭제되지 않습니다 🙆🏻`
        );
    });
  } catch (err) {
    console.error(err);
  }
}
