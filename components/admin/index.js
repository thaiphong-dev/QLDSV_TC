import React, { useEffect, useState } from "react";
import MainMenu from "../menuBar";
import Class from "./class";
import Student from "./student";
import Subject from "./subject";
import ClassTC from "./classTC";
import Scores from "./scores";
import RegisterClassTC from "./registerClassTC";
import Tution from "./tuition";

export default function Admin() {
  const isSV = JSON.parse(localStorage.getItem("isSV"));

  const listMenu = [
    { label: "Lớp", value: "class" },
    { label: "Môn học", value: "subject" },
    { label: "Lớp tín chỉ", value: "classTC" },
    { label: "Sinh viên", value: "student" },
    { label: "Điểm", value: "scores" },
    { label: "Đăng kí", value: "registerClassTC" },
    { label: "Học phí", value: "tuition" },
  ];

  const listMenuSV = [
    { label: "Đăng kí Lớp tín chỉ", value: "registerClassTC" },
  ];

  const [currentMenu, setCurrentMenu] = useState(
    isSV ? "registerClassTC" : "class"
  );

  const [currentMenuValue, setCurrentMenuValue] = useState(
    JSON.parse(localStorage.getItem("menu"))
  );
  useEffect(() => {
    let startCN = JSON.parse(localStorage.getItem("startCN"));
    localStorage.setItem("currentCN", JSON.stringify(startCN));

    setCurrentMenuValue(JSON.parse(localStorage.getItem("menu")));
  }, [currentMenu]);

  return (
    <div key={currentMenuValue}>
      <MainMenu
        keyMenu="level2"
        listMenu={isSV ? listMenuSV : listMenu}
        levelMenu="menuLevel2"
        itemLevel="itemLevel2"
        activeClass="itemLevel2_active"
        setCurrentMenu={setCurrentMenu}
      />
      {currentMenuValue.secondMenu === "class" && <Class />}
      {currentMenuValue.secondMenu === "student" && <Student />}
      {currentMenuValue.secondMenu === "classTC" && <ClassTC />}
      {currentMenuValue.secondMenu === "subject" && <Subject />}
      {currentMenuValue.secondMenu === "scores" && <Scores />}
      {currentMenuValue.secondMenu === "registerClassTC" && <RegisterClassTC />}
      {currentMenuValue.secondMenu === "tuition" && <Tution />}
    </div>
  );
}
