import { useNavigate } from "react-router-dom";
import EventButton from "./EventButton";
import "./Style/InvalidBlog.css";

const InvalidBlog = () => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const writeBlogNavigation = () => {
    if (memberId) navigate("/write");
    else {
      alert("로그인 후 사용해주세요.");
      navigate("/auth/login");
    }
  };

  return (
    <div className="InvalidBlog_Container">
      <img
        src={process.env.PUBLIC_URL + "/invalidBlog.svg"}
        alt="emptyBlog"
        className="InvalidBlog_image"
      />
      <div className="InvalidBlog_Content_Container">
        <h1>아직 작성된 블로그가 없습니다.</h1>
        <h3>허전한 이 곳을 채워주세요!</h3>
      </div>
      <EventButton usage="글 쓰러가기" onClick={writeBlogNavigation} />
    </div>
  );
};

export default InvalidBlog;