import React, { useEffect, useRef, useState } from "react";
import MainMenu from "../../components/menuBar";
import Admin from "../../components/admin";
import Report from "../../components/report";
import System from "../../components/system";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const customInputStyle = {
    height: "65%",
    marginTop: "0.4rem",
    marginLeft: "0.3rem",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    color: "rgb(114, 152, 185)",
  };
  const listMenu = [
    { label: "Quản Trị", value: "admin" },
    { label: "Báo Cáo", value: "report" },
    { label: "Cấu hình", value: "system" },
  ];

  const listMenuSV = [{ label: "Quản Trị", value: "admin" }];

  const listMenuPKT = [{ label: "Quản Trị", value: "admin" }];
  const isSV = JSON.parse(localStorage.getItem("isSV"));

  const [currentMenuValue, setCurrentMenuValue] = useState(
    JSON.parse(localStorage.getItem("menu"))
  );
  const [currentMenu, setCurrentMenu] = useState("admin");
  useEffect(() => {
    setCurrentMenuValue(JSON.parse(localStorage.getItem("menu")));
  }, [currentMenu]);

  return (
    <div>
      <div
        key={currentMenuValue}
        style={{ height: "100%", marginBottom: "8rem" }}
      >
        <MainMenu
          keyMenu="level1"
          listMenu={
            isSV
              ? listMenuSV
              : (userLogin.ROLENAME = "PKT" ? listMenuPKT : listMenu)
          }
          levelMenu="menuLevel1"
          itemLevel="itemLevel1"
          activeClass="itemLevel1_active"
          setCurrentMenu={setCurrentMenu}
        />
        {currentMenuValue?.parentMenu === "admin" && <Admin />}
        {currentMenuValue?.parentMenu === "report" && <Report />}
        {currentMenuValue?.parentMenu === "system" && <System />}
      </div>
      <footer className="footer">
        <div style={{ paddingLeft: "15rem" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <label style={{ marginRight: "2rem" }}>Mã: </label>
                <input
                  disabled
                  defaultValue={userLogin.MAGV ?? userLogin.MASV}
                  style={customInputStyle}
                ></input>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "3rem",
                }}
              >
                <label style={{ marginRight: "2rem" }}>Họ Tên: </label>
                <input
                  disabled
                  defaultValue={userLogin.HOTEN}
                  style={customInputStyle}
                ></input>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "3rem",
                }}
              >
                <label style={{ marginRight: "2rem" }}>Nhóm: </label>
                <input
                  disabled
                  defaultValue={userLogin?.MASV ? "SV" : userLogin.ROLENAME}
                  style={customInputStyle}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
