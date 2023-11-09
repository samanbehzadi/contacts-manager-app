import React from "react";
import "./Header.css";

import Tobpar from "../Topbar/Tobbar";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";

function Header() {
  return (
    <header className="header">
      <Tobpar />
      <Navbar />
      <Landing />
    </header>
  );
}

export default Header;
