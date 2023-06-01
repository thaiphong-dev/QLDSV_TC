import React from "react";
import Select from "react-select";

export default function Filters() {
  const customInputStyle = {
    height: "60%",
    marginTop: "0.4rem",
    marginLeft: "0.3rem",
  };

  return (
    <div style={{ backgroundColor: "#c2bdbd" }}>
      <div style={{ textAlign: "center" }}>
        <h3>NHẬP ĐIỂM SINH VIÊN</h3>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h4>Nhập thông tin</h4>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label style={{ paddingRight: "2rem", fontWeight: "bold" }}>
              Khoa
            </label>
            <Select
              //   options={options}
              defaultValue={{
                label: "Khoa công nghệ thông tin",
                value: "1",
              }}
            ></Select>
          </div>
        </div>

        <div style={{ position: "relative", left: "23rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginBlock: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <label style={{ marginRight: "2rem" }}>Niên khóa</label>
              <Select
                //   options={options}
                defaultValue={{
                  label: "Khoa công nghệ thông tin",
                  value: "1",
                }}
              ></Select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "3rem",
              }}
            >
              <label style={{ marginRight: "2rem" }}>Nhóm</label>
              <Select
                //   options={options}
                defaultValue={{
                  label: "Khoa công nghệ thông tin",
                  value: "1",
                }}
              ></Select>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <label style={{ marginRight: "3.75rem" }}>Học kì</label>
              <Select
                //   options={options}
                defaultValue={{
                  label: "Khoa công nghệ thông tin",
                  value: "1",
                }}
              ></Select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "3rem",
              }}
            >
              <label style={{ marginRight: "0.8rem" }}>Môn học</label>
              <Select
                //   options={options}
                defaultValue={{
                  label: "Khoa công nghệ thông tin",
                  value: "1",
                }}
              ></Select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
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
