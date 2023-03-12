import { baseInstance } from "../../Instance/Instance";

export const titleImageUploader = async (
  file: File,
  accessToken: string | null
) => {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  const formData = new FormData();
  formData.append("image", file);
  if (file) {
    try {
      await baseInstance.post("/s3/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const profileImageUploader = async (
  file: File,
  accessToken: string | null
) => {
  baseInstance.defaults.headers.common["Authorization"] = accessToken;
  const formData = new FormData();
  formData.append("image", file);
  if (file) {
    try {
      const res = await baseInstance.post("/s3/member", formData, {
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
