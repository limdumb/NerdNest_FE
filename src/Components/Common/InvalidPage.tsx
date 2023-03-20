import { useNavigate } from "react-router-dom";
import EventButton from "./EventButton";
import "./Style/InvalidPage.css";

const InvalidPage = () => {
  const navigate = useNavigate();
  return (
    <div className="InvalidPage_Wrapper">
      <div className="InvalidPage_Container">
        <img
          src={process.env.PUBLIC_URL + "/invalid.svg"}
          className="InvalidPage_Image"
        />
        <div className="InvalidPage_Content_Container">
          <h1>요청하신 페이지 주소가 없습니다.</h1>
          <p>
            방문하려는 페이지의 주소가 잘못 입력되었거나,{" "}
            <p>
              페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
              없습니다.
            </p>
          </p>
          <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
        <div className="InvalidPage_Btn_Container">
          <EventButton usage="이전으로" onClick={() => navigate(-1)} />
          <EventButton usage="홈으로" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default InvalidPage;
