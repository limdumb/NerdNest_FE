import axios from "axios";

export default async function editCategory(categoryId: number, categoryName: string) {
  try {
    await axios.patch(
      `category/${categoryId}`,
      JSON.stringify({ categoryName: categoryName })
    );
  } catch (err) {
    console.error(err);
  }
}
