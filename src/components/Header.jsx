import React, { useContext } from "react";
import { BsSearch, BsJustify, BsFillBellFill } from "react-icons/bs";
import { searchContext } from "../context/context";
import { ImCross } from "react-icons/im";
const Header = () => {
  const { showSearch, setShowSearch } = useContext(searchContext);
  const handleSearchClick = () => {
    setShowSearch((prevState) => !prevState); // Toggle the showSearch state
  };
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" />
      </div>
      <div className="header-left">
        {showSearch ? (
          <ImCross
            className="icon"
            style={{ cursor: "pointer", color: "red" }}
            onClick={handleSearchClick}
          />
        ) : (
          <BsSearch
            className="icon"
            style={{ cursor: "pointer" }}
            onClick={handleSearchClick}
          />
        )}
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
      </div>
    </header>
  );
};

export default Header;
