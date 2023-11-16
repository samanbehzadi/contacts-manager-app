import React, { useEffect, useState } from "react";
import "./Header.css";

import Tobpar from "../Topbar/Tobbar";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";

function Header() {
    const [indexInfo, setIndexInfo] = useState({})
    useEffect(()=>{
        fetch(`http://localhost:4000/v1/infos/index`)
        .then(respJSON => respJSON.json())
        .then(allInfos => {
            setIndexInfo(allInfos)})
    },[])
    return (
        <header className="header">
            <Tobpar info={indexInfo}/>
            <Navbar />
            <Landing info={indexInfo}/>
        </header>
    );
}

export default Header;
