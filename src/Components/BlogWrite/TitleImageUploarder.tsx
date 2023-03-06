import "./Style/titleImageUploarder.css";

interface Props{
  titleImageUrl: string
}
//props 추후 내려올 예정
export default function TitleImageUploarder() {
  return (
    <>
      <img className="Title_Image_Uploader"/>
    </>
  );
}
