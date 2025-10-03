import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">EVANGADI</div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">How it Works</a>
          </li>
        </ul>
      </nav>
      <button className="signin-btn">SIGN IN</button>
    </header>
  );
};

export default Header;
