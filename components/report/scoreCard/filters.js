import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Filters(props) {
  const [currentCN, setCurrentCN] = useState(
    JSON.parse(localStorage.getItem("currentCN"))
  );
  const isSV = JSON.parse(localStorage.getItem("isSV"));

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  // In phiếu điểm sinh viên
  const inDiemSV = async (data) => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
      MASV: !isSV ? data : userLogin?.MASV,
      USER: userLogin.HOTEN,
    };
    try {
      const res = await adminApi.inDiemSV(payload);
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

  const {
    register,

    watch,

    formState: { errors },
  } = useForm();

  const { filters } = props;

  const filtersData = filters;

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  return (
    <div style={{ backgroundColor: "#c2bdbd", paddingBottom: "0.2rem" }}>
      <div style={{ textAlign: "center" }}>
        <h3>PHIẾU ĐIỂM SINH VIÊN</h3>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label style={{ paddingRight: "2rem", fontWeight: "bold" }}>
              Mã Sinh viên
            </label>
            <div style={{ width: "18rem" }}>
              <input
                disabled={isSV ? true : false}
                {...register("MASV")}
                defaultValue={userLogin?.MASV}
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => {
            inDiemSV(watch("MASV"));
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
