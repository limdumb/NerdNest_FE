import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const SearchInput = () => {
  const [searchValue, setSerachValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSerachValue(e.target.value);
  };

  const handleSearchValueSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (e.key === "Enter") {
      searchValue === "" ? alert("검색어를 입력해주세요.") : setIsSearch(true);
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
      {isSearch || searchValue !== '' ? (
        <div className="Search_Result_Container">
          {/* 검색 결과 안내 문구 */}
        </div>
      ) : null}
    </>
  );
};

export default SearchInput;
