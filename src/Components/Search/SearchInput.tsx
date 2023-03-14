import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ keyword }: { keyword: string | null }) => {
  const [searchValue, setSerachValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
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
        setIsSearch(true);
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
      {isSearch || searchValue !== "" ? (
        <div className="Search_Result_Container">
          "{keyword}"에 대한 몇개의 검색 결과입니다.
        </div>
      ) : null}
    </>
  );
};

export default SearchInput;
