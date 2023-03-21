import { tokenInstance } from "../../Instance/Instance";

export interface TitleImageUploadResponse {
  imageFileId: number;
  imageFileName: string;
  imageFileUrl: string;
}

export const titleImageUploader = async (
  file: File
): Promise<TitleImageUploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await tokenInstance.post("/s3/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      imageFileId: res.data.imageFileId,
      imageFileName: res.data.imageFileName,
      imageFileUrl: res.data.imageFileUrl,
    };
  } catch (err) {
    throw new Error("서버 에러가 발생했습니다.");
  }
};

export const profileImageUploader = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  if (file) {
    try {
      const res = await tokenInstance.post("/s3/member", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
};
