import React, { useRef, useState } from "react";
import { FcPlus } from "react-icons/fc";
import "./Style/imageUploader.css";

interface Props {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  imageFile: File | null;
  profileImageUrl: string;
}

export default function ImageUploader(props: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    props.profileImageUrl
  );

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
          className="Profile_Image_Edit_Icon"
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
      <img className="Member_Profile_Image" src={`${previewImage}`} />
    </>
  );
}