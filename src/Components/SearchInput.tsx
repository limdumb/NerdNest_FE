import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const SearchInput = () => {
  const [searchValue, setSerachValue] = useState("");

  const handleSearchValueChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSerachValue(e.target.value);
  };
  return (
    <>
      <RiSearchLine className="Search_icon" />
      <input
        className="SearchInput"
        type="text"
        value={searchValue}
        onChange={(e) => handleSearchValueChnage(e)}
        placeholder="검색어를 입력하세요."
      />
    </>
  );
};

export default SearchInput;
