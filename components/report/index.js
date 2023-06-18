import React, { useEffect, useState } from "react";
import MainMenu from "../menuBar";
import ListStudent from "./listStudent";
import ListClassTC from "./listClassTC";
import SubjectTranscript from "./subjectTranscript";
import ScoreCard from "./scoreCard";
import ListFeePayment from "./listFeePayment";
import SummaryTranscript from "./summaryTranscript";

export default function Report() {
  const isSV = JSON.parse(localStorage.getItem("isSV"));
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const listMenu = [
    { label: "Danh sách sinh viên lớp Tín chỉ", value: "listStudent" },
    { label: "Danh sách lớp Tín chỉ", value: "listClassTC" },
    { label: "Bảng điểm môn học", value: "subjectTranscript" },
    { label: "Phiếu điểm sinh viên", value: "scoreCard" },
    { label: "Danh sách đóng học phí của lớp", value: "listFeePayment" },
    { label: "Bảng điểm tổng kết", value: "summaryTranscript" },
  ];

  const listMenuSV = [{ label: "Phiếu điểm sinh viên", value: "scoreCard" }];

  const listMenuPKT = [
    { label: "Danh sách đóng học phí của lớp", value: "listFeePayment" },
  ];

  const [currentMenu, setCurrentMenu] = useState(
    isSV ? "scoreCard" : "listStudent"
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
        listMenu={
          isSV
            ? listMenuSV
            : userLogin.ROLENAME === "PKT"
            ? listMenuPKT
            : listMenu
        }
        levelMenu="menuLevel2"
        itemLevel="itemLevel2"
        activeClass="itemLevel2_active"
        setCurrentMenu={setCurrentMenu}
      />
      {currentMenuValue.secondMenu === "listStudent" && <ListStudent />}
      {currentMenuValue.secondMenu === "listClassTC" && <ListClassTC />}
      {currentMenuValue.secondMenu === "subjectTranscript" && (
        <SubjectTranscript />
      )}
      {currentMenuValue.secondMenu === "scoreCard" && <ScoreCard />}
      {currentMenuValue.secondMenu === "listFeePayment" && <ListFeePayment />}
      {currentMenuValue.secondMenu === "summaryTranscript" && (
        <SummaryTranscript />
      )}
      {/*{currentMenuValue.secondMenu === "subject" && <Subject />}
      {currentMenuValue.secondMenu === "scores" && <Scores />}
      {currentMenuValue.secondMenu === "registerClassTC" && <RegisterClassTC />}
      {currentMenuValue.secondMenu === "tuition" && <Tution />} */}
    </div>
  );
}
