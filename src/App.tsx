import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetail from "./Pages/BlogDetail";
import BlogEdit from "./Pages/BlogEdit";
import Blogs from "./Pages/Blogs";
import BlogWrite from "./Pages/BlogWrite";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import SignUp from "./Pages/SignUp";
import "./App.css";
import Header from "./Components/Common/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/:writer/:memberId" element={<Blogs />} />
          <Route path="/write" element={<BlogWrite />} />
          <Route path="/edit/:blogId" element={<BlogEdit />} />
          <Route
            path="/:writer/:memberId/:title/:blogId"
            element={<BlogDetail />}
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
