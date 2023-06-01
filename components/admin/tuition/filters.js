import React from "react";
import Select from "react-select";

export default function Filters() {
  const customInputStyle = {
    height: "65%",
    marginTop: "0.4rem",
    marginLeft: "0.3rem",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
  };

  return (
    <div style={{ backgroundColor: "#c2bdbd", position: "relative" }}>
      <div style={{ textAlign: "center" }}>
        <h3>HỌC PHÍ</h3>
      </div>

      <div style={{ paddingLeft: "15rem" }}>
        <div style={{ position: "relative" }}>
          <h4>Thông tin sinh viên</h4>
        </div>

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
              <label style={{ marginRight: "2rem" }}>Mã sinh viên</label>
              <input style={customInputStyle}></input>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "3rem",
              }}
            >
              <label style={{ marginRight: "2rem" }}>Tên sinh viên</label>
              <input style={customInputStyle}></input>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "3rem",
              }}
            >
              <label style={{ marginRight: "2rem" }}>Mã lớp</label>
              <input style={customInputStyle}></input>
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

      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <button
          className="buttonLogic"
          style={{ float: "none", marginRight: "2rem" }}
        >
          cập nhật
        </button>
        <button
          className="buttonLogic"
          style={{ float: "none", margin: "0 auto" }}
        >
          xóa
        </button>
      </div>
    </div>
  );
}
