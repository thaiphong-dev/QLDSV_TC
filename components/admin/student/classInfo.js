import React from "react";
import Select from "react-select";

export default function ClassInfo(props) {
  const { model, refreshEditForm, setRefreshEditForm } = props;

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
        left: "2rem",
        zIndex: -1,
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgb(206, 199, 199)",
        }}
      >
        <label>Thông tin lớp</label>
      </div>
      <h3>{model?.model.className}</h3>
      <form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={{ paddingRight: "2.8rem" }}>Khoa</label>
          <Select
            options={options}
            defaultValue={{
              label: "Khoa công nghệ thông tin",
              value: "1",
            }}
          ></Select>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Mã lớp</label>
          <input
            style={{ width: "70%" }}
            defaultValue={model?.model.classCode}
          ></input>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>Tên lớp</label>
          <input
            style={{ width: "70%" }}
            defaultValue={model?.model.className}
          ></input>
        </div>
      </form>
    </div>
  );
}
