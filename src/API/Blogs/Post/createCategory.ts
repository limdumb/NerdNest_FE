import { baseInstance } from "../../Instance/Instance";

export default async function createCategory(
  categoryName: string,
  accessToken: string | null
) {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  if (categoryName.length !== 0) {
    try {
      await baseInstance
        .post("/category", { categoryName: categoryName })
        .then((res) => {
          if (res.status === 201) alert("카테고리가 생성 되었습니다.");
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("카테고리명을 입력해주세요!");
  }
}
