import "./Style/titleImageUploarder.css";

interface Props{
  titleImageUrl: string
}

// image width , height 150px
// 그 밑에 밋줄 긋기
// 만약에 Edit이 true라면 이미지 밑에 + 아이콘 들어나게 하기

export default function TitleImageUploarder() {
  return (
    <>
      <img className="Title_Image_Uploarder"/>
    </>
  );
}
