import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Filters(props) {
  const [currentCN, setCurrentCN] = useState(
    JSON.parse(localStorage.getItem("currentCN"))
  );
  const dsKhoas = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);

  const {
    filters,
    setFilters,
    filtersRef,
    setRefresh,
    modelChange,
    setModelChange,
  } = props;

  const filtersData = filters;

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const [dsKhoa, setdsKhoa] = useState();
  // lấy ds Khoa
  const layDsKhoa = async () => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
    };
    try {
      const res = await adminApi.layDsKhoa(payload);
      if (res.data) {
        const dsKhoaOptions = Array.from(new Set(res.data))?.map((x) => ({
          label: x.TENKHOA.trim(),
          value: x.MAKHOA.trim(),
        }));
        setdsKhoa(dsKhoaOptions);
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

  const [dsFilter, setdsFilter] = useState();
  // lấy ds Filter
  const layDsFilter = async () => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
    };
    try {
      const res = await adminApi.layDsFilter(payload);
      if (res.data) {
        const data = {
          nienKhoa: res.data?.nienKhoa?.map((x) => ({
            label: x.NIENKHOA.trim(),
            value: x.NIENKHOA.trim(),
          })),
          hocKy: res.data?.hocKy?.map((x) => ({
            label: x.HOCKY,
            value: x.HOCKY,
          })),
          nhom: res.data?.nhom?.map((x) => ({
            label: x.NHOM,
            value: x.NHOM,
          })),
        };

        setdsFilter(data);
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

  // lấy ds môn học
  const [dsMonHoc, setDsMonHoc] = useState();
  const layDsMonHoc = async () => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
      pageSize: 100,
      pageNumber: 1,
    };
    try {
      const res = await adminApi.layDsMonHoc(payload);
      if (res.data) {
        let data = res.data?.map((x) => ({
          label: x.TENMH,
          value: x.MAMH,
        }));
        setDsMonHoc(data);
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
    layDsKhoa();
    layDsMonHoc();
    layDsFilter();
  }, [currentCN]);

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
              <input></input>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => {
            setFilters(filtersData);
            console.log("filtersData", filtersData);
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
