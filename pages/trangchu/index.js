import React, { useEffect, useRef, useState } from "react";
import MainMenu from "../../components/menuBar";
import Admin from "../../components/admin";
import Report from "../../components/report";
import System from "../../components/system";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const listMenu = [
    { label: "Quản Trị", value: "admin" },
    { label: "Báo Cáo", value: "report" },
    { label: "Cấu hình", value: "system" },
  ];

  const [currentMenuValue, setCurrentMenuValue] = useState(
    JSON.parse(localStorage.getItem("menu"))
  );
  const [currentMenu, setCurrentMenu] = useState("admin");
  useEffect(() => {
    setCurrentMenuValue(JSON.parse(localStorage.getItem("menu")));
  }, [currentMenu]);

  return (
    <div key={currentMenuValue}>
      <MainMenu
        keyMenu="level1"
        listMenu={listMenu}
        levelMenu="menuLevel1"
        itemLevel="itemLevel1"
        activeClass="itemLevel1_active"
        setCurrentMenu={setCurrentMenu}
      />
      {currentMenuValue?.parentMenu === "admin" && <Admin />}
      {currentMenuValue?.parentMenu === "report" && <Report />}
      {currentMenuValue?.parentMenu === "system" && <System />}
    </div>
  );
}
