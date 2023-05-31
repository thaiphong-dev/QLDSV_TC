import React from "react";
import Select from "react-select";

export default function StudentInfo(props) {
  const { model, refreshEditForm, setRefreshEditForm } = props;
  const customInputStyle = {
    height: "60%",
    marginTop: "0.4rem",
    marginLeft: "0.3rem",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "0.01rem solid",
  };
  const options = [
    {
      label: "Khoa công nghệ thông tin",
      value: "1",
    },
    {
      label: "Khoa Viễn Thông",
      value: "2",
    },
  ];

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
      <h3>{model?.model.className}</h3>
      <form>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={{ paddingRight: "2.8rem" }}>Khoa</label>
          <Select
            options={options}
            defaultValue={{
              label: "Khoa công nghệ thông tin",
              value: "1",
            }}
          ></Select>
        </div> */}
        {/* masv ho ten */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Mã sinh viên </label>
            <input
              style={customInputStyle}
              defaultValue={model?.model.classCode}
            ></input>
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
              defaultValue={model?.model.className}
            ></input>
          </div>
        </div>
        {/* ngày sinh , phái  */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <label>Ngày sinh</label>
            <input
              style={customInputStyle}
              defaultValue={model?.model.classCode}
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
              defaultValue={model?.model.className}
            ></input>
          </div>
        </div>

        {/* ngày sinh */}

        <div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <label>Địa chỉ</label>
            <input
              style={{
                ...customInputStyle,
                width: "90%",
                marginLeft: "0.15rem",
              }}
              defaultValue={model?.model.classCode}
            ></input>
          </div>
        </div>

        {/* mã lớp, đã nghỉ học  */}
        <div style={{ display: "flex", justifyContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>Mã lớp</label>
            <input
              style={customInputStyle}
              defaultValue={model?.model.classCode}
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
              defaultValue={model?.model.className}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
