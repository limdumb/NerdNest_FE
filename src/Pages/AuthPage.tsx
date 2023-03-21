import AuthTab from "../Components/AuthPage/AuthTab";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import "./Style/authPage.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  padding-top: 20px;
`;

export default function AuthPage() {
  return (
    <Container>
      <img
        className="Auth_Logo_Image"
        src={process.env.PUBLIC_URL + "/LoginLogo.svg"}
      />
      <div className="Auth_Tab_Container">
        <AuthTab />
      </div>
      <Outlet />
    </Container>
  );
}