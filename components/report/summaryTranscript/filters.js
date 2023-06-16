import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Filters(props) {
  const [currentCN, setCurrentCN] = useState(
    JSON.parse(localStorage.getItem("currentCN"))
  );
  const dsKhoas = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);
  const [lop, setLop] = useState();

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const inDiemTongKet = async (lop) => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
      MALOP: lop.value,
      TENLOP: lop.label,
      USER: userLogin.HOTEN,
    };
    try {
      const res = await adminApi.inDiemTongKet(payload);
      if (res) {
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [dsLop, setDsLop] = useState();

  const layDsLop = async () => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
      pageSize: 1000,
      pageNumber: 1,
    };
    try {
      const res = await adminApi.layDsLop(payload);
      if (res.data) {
        setDsLop(
          res.data?.map((x) => ({
            label: x.TENLOP.trim(),
            value: x.MALOP.trim(),
          }))
        );
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    layDsLop();
  }, [currentCN]);

  return (
    <div style={{ backgroundColor: "#c2bdbd", paddingBottom: "0.2rem" }}>
      <div style={{ textAlign: "center" }}>
        <h3>DANH SÁCH SINH VIÊN ĐÓNG HỌC PHÍ</h3>
      </div>

      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              paddingLeft: "33rem",
            }}
          >
            <label style={{ paddingRight: "4.3rem", fontWeight: "bold" }}>
              Khoa
            </label>
            <div style={{ width: "18rem" }}>
              <Select
                defaultValue={currentCN}
                options={dsKhoas}
                onChange={(value) => {
                  localStorage.setItem("currentCN", JSON.stringify(value));
                  setCurrentCN(value);
                }}
              ></Select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "start",
              paddingLeft: "33rem",
              marginTop: "2rem",
            }}
          >
            <label style={{ paddingRight: "5rem", fontWeight: "bold" }}>
              Lớp
            </label>
            <div style={{ width: "18rem" }}>
              <Select
                options={dsLop}
                onChange={(value) => {
                  setLop(value);
                }}
              ></Select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => {
            inDiemTongKet(lop);
          }}
          className="buttonLogic"
          style={{ float: "none", marginRight: "2rem" }}
        >
          In danh sách
        </button>
      </div>
    </div>
  );
}
