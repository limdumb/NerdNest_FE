import React, { useEffect, useRef, useState } from "react";
import { FcPlus } from "react-icons/fc";
import "./Style/imageUploader.css";

interface Props {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  imageFile: File | null;
  profileImageUrl: string;
  usage: "Title" | "Profile";
}

export default function ImageUploader(props: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    props.profileImageUrl
  );

  useEffect(() => {
    setPreviewImage(props.profileImageUrl);
  }, [props.profileImageUrl]);

  const ref = useRef<HTMLInputElement | null>(null);
  const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    //10MB제한
    if (e.target.files && e.target.files[0].size > 10485760) {
      alert("이미지 파일의 크기는 10Mb입니다!");
    }
    // image정보가 있다면
    if (selectedImage) {
      setPreviewImage(
        URL.createObjectURL(e.target.files && (e.target.files[0] as any))
      );
    }
    props.setImageFile(e.target.files && e.target.files[0]);
  };

  return (
    <>
      <div className="Plus_Container">
        <FcPlus
          className={
            props.usage === "Title"
              ? "Title_Image_Add_Icon"
              : "Profile_Image_Add_Icon"
          }
          onClick={() => ref.current?.click()}
        />
      </div>
      <input
        className="Uploard_Input"
        ref={ref}
        type={"file"}
        onChange={(e) => {
          imageUploadHandler(e);
        }}
      />
      <img
        className={
          props.usage === "Title" ? "Thumbnail_Image" : "Member_Profile_Image"
        }
        src={`${previewImage}`}
      />
    </>
  );
}
