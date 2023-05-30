import React, { useEffect, useState } from "react";
import MainMenu from "../menuBar";
import Class from "./class";
import Student from "./student";
import Subject from "./subject";
import ClassTC from "./classTC";

export default function Admin() {
  const listMenu = [
    { label: "Lớp", value: "class" },
    { label: "Môn học", value: "subject" },
    { label: "Lớp tín chỉ", value: "classTC" },
    { label: "Sinh viên", value: "student" },
    { label: "Điểm", value: "scores" },
    { label: "Chuyển lớp", value: "switchClass" },
    { label: "Học phí", value: "Tuition" },
  ];

  const [currentMenu, setCurrentMenu] = useState("class");

  const [currentMenuValue, setCurrentMenuValue] = useState(
    JSON.parse(localStorage.getItem("menu"))
  );
  useEffect(() => {
    setCurrentMenuValue(JSON.parse(localStorage.getItem("menu")));
  }, [currentMenu]);

  return (
    <div key={currentMenuValue}>
      <MainMenu
        keyMenu="level2"
        listMenu={listMenu}
        levelMenu="menuLevel2"
        itemLevel="itemLevel2"
        activeClass="itemLevel2_active"
        setCurrentMenu={setCurrentMenu}
      />
      {currentMenuValue.secondMenu === "class" && <Class />}
      {currentMenuValue.secondMenu === "student" && <Student />}
      {currentMenuValue.secondMenu === "classTC" && <ClassTC />}
      {currentMenuValue.secondMenu === "subject" && <Subject />}
    </div>
  );
}
