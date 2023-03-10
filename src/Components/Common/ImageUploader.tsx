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

/*  
  1. post를 통해서 버킷에 객체를 업로드 하는 방식임
  1-1 데이터의 전송에는 multipart/form-data를 사용함
  2. Post요청을 보낼때 url과 form data에 무조껀 포함시켜야 하는 key-value 의 쌍들이 포함된 fields를 제공
  3.  클라이언트는 fields의 내용을 요청에 포함 시켜야함
  4. "Content-Type": "multipart/form-data"
  - - -
  구현
  1. form을 만들어서 파일을 업로드 할 수 있게 한다 O
  2. 받은 파일을 받아서 Image를 Blob으로 처리한다
  2-1 blob은 데이터를 간접적으로 접근하기 위한 포인터 객체임
  3. formData를 생성해서 안에 append 해준다
  4. 그 이후 해당 정보를 createObjectURL메소드를 사용해 변수에 담아서 Image를 Render시킨다
  5. 사용자가 확인을 누르면 formdata를 request에 담아서 보낸다
  6. 그 이후 홈으로 보낸다.
*/
