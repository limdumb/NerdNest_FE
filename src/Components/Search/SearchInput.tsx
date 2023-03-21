import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchValue, setSerachValue] = useState("");
  const navigate = useNavigate();

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSerachValue(e.target.value);
  };

  const handleSearchValueSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (searchValue === "") {
        alert("검색어를 입력해주세요.");
      } else {
        navigate(`/search?keyword=${searchValue}`);
      }
    }
  };
  return (
    <>
      <div className="Search_Input_Container">
        <RiSearchLine className="Search_icon" />
        <input
          className="Search_Input"
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchValueChange(e)}
          onKeyUp={(e) => handleSearchValueSubmit(e)}
          placeholder="검색어를 입력하세요."
        />
      </div>
    </>
  );
};

export default SearchInput;