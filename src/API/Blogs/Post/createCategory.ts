import { tokenInstance } from "../../Instance/Instance";

export default async function createCategory(
  categoryName: string,
  accessToken: string | null
) {
  if (categoryName.length !== 0) {
    if(categoryName !== "전체"){
      try {
        await tokenInstance
          .post("/category", { categoryName: categoryName })
          .then((res) => {
            if (res.status === 201) alert("카테고리가 생성 되었습니다.");
          });
      } catch (err:any) {
        if(err.response.status === 409){
          alert("중복된 카테고리명 입니다.")
        }
      }
    }else{
      alert("전체 카테고리는 생성 할 수 없습니다.")
    }
  }
  else {
    alert("카테고리명을 입력해주세요!");
  }
}