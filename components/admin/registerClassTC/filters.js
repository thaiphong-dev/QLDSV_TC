import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Filters(props) {
  const { filters, setFilters, filtersRef, setRefresh } = props;
  const filtersData = filters;

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const [dsFilter, setdsFilter] = useState();
  // lấy ds Filter
  const layDsFilter = async () => {
    try {
      const res = await adminApi.layDsFilter(dbConfig);
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

  useEffect(() => {
    layDsFilter();
  }, []);

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

            <button
              className="buttonLogic"
              style={{ float: "none", marginRight: "2rem", marginLeft: "2rem" }}
              onClick={() => {
                setFilters(filtersData);
                setRefresh(Math.random());
              }}
            >
              Tìm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
