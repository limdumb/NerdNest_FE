import axios from "axios";

export default function editCategory(categoryId: number, categoryName: string) {
  try {
    axios.patch(
      `category/${categoryId}`,
      JSON.stringify({ categoryName: categoryName })
    );
  } catch (err) {
    console.error(err);
  }
}
