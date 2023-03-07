import axios from "axios";

export default async function editCategory(
  categoryId: number,
  categoryName: string
) {
  try {
    await axios.patch(`category/${categoryId}`, { categoryName: categoryName });
  } catch (err) {
    console.error(err);
  }
}
