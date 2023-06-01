import React from "react";
import Select from "react-select";

export default function Filters() {
  return (
    <div style={{ backgroundColor: "#c2bdbd", position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <h3>ĐĂNG KÍ LỚP TÍN CHỈ</h3>
      </div>

      <div style={{ paddingLeft: "15rem", paddingBottom: "1rem" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              width: "80%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <label style={{ marginRight: "2rem" }}>Niên khóa</label>

              <div style={{ width: "60%" }}>
                <Select></Select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "3rem",
                width: "80%",
              }}
            >
              <label style={{ marginRight: "2rem" }}>Học kỳ</label>
              <div style={{ width: "70%" }}>
                <Select></Select>
              </div>
            </div>

            <button
              className="buttonLogic"
              style={{ float: "none", marginRight: "2rem", marginLeft: "2rem" }}
            >
              Tìm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
