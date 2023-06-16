import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Filters(props) {
  const [currentCN, setCurrentCN] = useState(
    JSON.parse(localStorage.getItem("currentCN"))
  );
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const [lop, setLop] = useState();
  const dsKhoas = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);
  // In học phí của lớp
  const inHocPhiLop = async (data, lop) => {
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
      NIENKHOA: data.nienKhoa,
      HOCKY: data.hocKy,
      MALOP: lop.value,
      TENLOP: lop.label,
      USER: userLogin.HOTEN,
    };
    try {
      const res = await adminApi.inHocPhiLop(payload);
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
    filters,
    setFilters,
    filtersRef,
    setRefresh,
    modelChange,
    setModelChange,
  } = props;

  const filtersData = filters;

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
  const [dsLop, setDsLop] = useState();

  const layDsLop = async () => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
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

  useEffect(() => {
    layDsLop();
    layDsFilter();
  }, []);

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
            <label style={{ paddingRight: "4.8rem", fontWeight: "bold" }}>
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

          <div
            key={currentCN?.value}
            style={{ position: "relative", paddingLeft: "33rem" }}
          >
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
                <div style={{ width: "18rem" }}>
                  <Select
                    onChange={(e) => {
                      filtersRef.current.nienKhoa = e.value;
                      filtersData.nienKhoa = e.value;
                    }}
                    placeholder="Niên khóa"
                    options={dsFilter?.nienKhoa}
                  ></Select>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ display: "flex", justifyContent: "start" }}>
                <label style={{ marginRight: "3.75rem" }}>Học kỳ</label>
                <div style={{ width: "18rem" }}>
                  <Select
                    onChange={(e) => {
                      filtersRef.current.hocKy = e.value;
                      filtersData.hocKy = e.value;
                    }}
                    placeholder="Học kỳ"
                    options={dsFilter?.hocKy}
                  ></Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => {
            inHocPhiLop(filtersData, lop);
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
