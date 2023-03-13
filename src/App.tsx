import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetail from "./Pages/BlogDetail";
import BlogEdit from "./Pages/BlogEdit";
import Blogs from "./Pages/Blogs";
import BlogWrite from "./Pages/BlogWrite";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import SignUp from "./Pages/SignUp";
import styled from "styled-components";
import AuthPage from "./Pages/AuthPage";
import Header from "./Components/Header/Header";
import "./App.css";

const RootContainer = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RootContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />}>
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="/:nickName/:memberId"
              element={<Blogs />}
            />
            <Route path="/write" element={<BlogWrite />} />
            <Route path="/edit/:blogId" element={<BlogEdit />} />
            <Route
              path="/:writer/:memberId/:title/:blogId"
              element={<BlogDetail />}
            />
            <Route path="/search" element={<Search />} />
          </Routes>
        </RootContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
