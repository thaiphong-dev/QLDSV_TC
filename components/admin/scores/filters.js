import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Filters(props) {
  const { filters, setFilters, filtersRef, setRefresh } = props;

  const filtersData = filters;

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const [dsKhoa, setdsKhoa] = useState();
  // lấy ds Khoa
  const layDsKhoa = async () => {
    try {
      const res = await adminApi.layDsKhoa(dbConfig);
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

  // lấy ds môn học
  const [dsMonHoc, setDsMonHoc] = useState();
  const layDsMonHoc = async () => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
    const payload = {
      ...dbConfig,
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
  }, []);

  return (
    <div style={{ backgroundColor: "#c2bdbd", paddingBottom: "0.2rem" }}>
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
            <div style={{ width: "15rem" }}>
              <Select
                options={dsKhoa}
                defaultValue={{
                  label: "Khoa công nghệ thông tin",
                  value: "1",
                }}
              ></Select>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", paddingLeft: "23rem" }}>
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
              <div style={{ width: "10rem" }}>
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
              }}
            >
              <label style={{ marginRight: "2rem" }}>Nhóm</label>
              <div style={{ width: "10rem" }}>
                <Select
                  onChange={(e) => {
                    filtersRef.current.nhom = e.value;
                    filtersData.nhom = e.value;
                  }}
                  placeholder="Nhóm"
                  options={dsFilter?.nhom}
                ></Select>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "start" }}>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <label style={{ marginRight: "3.75rem" }}>Học kỳ</label>
              <div style={{ width: "10rem" }}>
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

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "3rem",
              }}
            >
              <label style={{ marginRight: "0.8rem" }}>Môn học</label>
              <div style={{ width: "18rem" }}>
                <Select
                  onChange={(e) => {
                    filtersRef.current.monHoc = e.value;
                    filtersData.monHoc = e.value?.trim();
                  }}
                  options={dsMonHoc}
                ></Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button
          onClick={() => {
            console.log("fafsafa", filters);
            setFilters(filtersData);
            setRefresh(Math.random());
          }}
          className="buttonLogic"
          style={{ float: "none", marginRight: "2rem" }}
        >
          Tìm
        </button>
      </div>
    </div>
  );
}
