import React from "react";

import "./styles.scss";

import Logo from "../Logo";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <a className="header__link" href="/">
          Home
        </a>
        <a className="header__link" href="/">
          Check essay
        </a>
      </div>
    </header>
  );
};

export default Header;
