import React, { useState } from "react";
import MainMenu from "../menuBar";

export default function Report() {
  const listMenu = [
    { label: "Danh sách sinh viên", value: "listStudent" },
    { label: "Danh sách thi hết môn", value: "listStudentDoExam" },
    { label: "Bảng điểm môn học", value: "subjectTranscript" },
    { label: "Phiếu điểm", value: "scoreCard" },
    { label: "Danh sách đóng học phí của lớp", value: "listFeePayment" },
    { label: "Bảng điểm tổng kết", value: "summaryTranscript" },
  ];
  const [currentMenu, setCurrentMenu] = useState("listStudent");

  return (
    <div>
      <MainMenu
        keyMenu="level2"
        listMenu={listMenu}
        levelMenu="menuLevel2"
        itemLevel="itemLevel2"
        activeClass="itemLevel2_active"
        setCurrentMenu={setCurrentMenu}
      />
    </div>
  );
}
