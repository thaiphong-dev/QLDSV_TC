import moment from "moment";
import React from "react";
import Select from "react-select";

export default function StudentInfo(props) {
  const { model, refreshEditForm, setRefreshEditForm, detail } = props;
  const customInputStyle = {
    height: "60%",
    marginTop: "0.4rem",
    marginLeft: "0.3rem",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "0.01rem solid",
    color: "rgb(114, 152, 185)",
  };
  return (
    <div
      style={{
        position: "relative",
        top: "3rem",
        left: "0rem",
        zIndex: -1,
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgb(206, 199, 199)",
        }}
      >
        <label>Thông tin sinh viên</label>
      </div>
      <h3> </h3>
      <form>
        {/* masv ho ten */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Mã sinh viên </label>
            <input style={customInputStyle} defaultValue={detail?.MASV}></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginLeft: "1.5rem",
            }}
          >
            <label>Họ tên</label>
            <input
              style={{ ...customInputStyle, width: "75%" }}
              defaultValue={detail?.HOTEN}
            ></input>
          </div>
        </div>
        {/* ngày sinh , phái  */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <label>Ngày sinh</label>
            <input
              style={customInputStyle}
              defaultValue={
                detail?.NGAYSINH
                  ? moment(detail?.NGAYSINH).format("DD-MM-YYYY")
                  : null
              }
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginLeft: "2.7rem",
            }}
          >
            <label>Phái</label>
            <input
              style={customInputStyle}
              defaultValue={
                detail?.PHAI !== undefined
                  ? detail?.PHAI
                    ? "Nữ"
                    : "Nam"
                  : null
              }
            ></input>
          </div>
        </div>

        {/* Địa chỉ */}

        <div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <label>Địa chỉ</label>
            <input
              style={{
                ...customInputStyle,
                width: "90%",
                marginLeft: "0.15rem",
              }}
              defaultValue={detail?.DIACHI}
            ></input>
          </div>
        </div>

        {/* mã lớp, đã nghỉ học  */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Mã lớp</label>
            <input
              style={customInputStyle}
              defaultValue={detail?.MALOP}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: " 4rem",
            }}
          >
            <label>Đã nghỉ học</label>
            <input
              type="checkBox"
              style={customInputStyle}
              checked={detail?.DANGHIHOC ? "checked" : ""}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
