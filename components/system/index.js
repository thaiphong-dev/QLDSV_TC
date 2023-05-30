import React, { useState } from "react";
import MainMenu from "../menuBar";

export default function System() {
  const listMenu = [
    { label: "Tạo tài khoản", value: "createAccount" },
    { label: "Đăng xuất", value: "logout" },
  ];
  const [currentMenu, setCurrentMenu] = useState("");

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
