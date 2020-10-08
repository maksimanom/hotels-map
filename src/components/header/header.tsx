import React from "react";
import "./header-styles.css";

import limehomeLogo from "../../icons/limehome-logo.svg";
import markerDefault from "../../icons/burger-icon.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={limehomeLogo} className="header-logo" alt="" />
      <img src={markerDefault} className="burger-menu" alt="" />
    </div>
  );
};

export default Header;
