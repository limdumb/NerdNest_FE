import axios from "axios";

interface CategoryType {
  categoryId: number;
  categoryName: string;
}

export default function getCategory() {
  return new Promise((resolve, reject) => {
    try {
      let result: Array<CategoryType> = [];
      for (let i = 1; i < 10; i++) {
        result.push({
          categoryId: i,
          categoryName: "리액트" + i,
        });
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
