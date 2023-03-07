import axios from "axios";

export default function deleteCategory(
  categoryId: number,
  categoryName: string
) {
  try {
    axios.delete(`/category/${categoryId}`).then((res) => {
      if (res.status === 200)
        alert(
          `${categoryName} 카테고리가 삭제 되었습니다. 게시글은 삭제되지 않습니다 🙆🏻`
        );
    });
  } catch (err) {
    console.error(err);
  }
}
