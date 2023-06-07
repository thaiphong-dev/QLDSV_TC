import React, { useEffect, useState } from "react";
import Select from "react-select";
import Table from "./table";
import TableDetail from "./tableDetail";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Filters() {
  const customInputStyle = {
    height: "65%",
    marginTop: "0.4rem",
    marginLeft: "0.3rem",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
  };
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const [maSV, setMaSV] = useState();

  const [SVInfo, setSVInfo] = useState();
  // lấy ds học phí
  const layDsHocPhi = async () => {
    const payload = {
      ...dbConfig,
      MASV: maSV,
    };
    try {
      const res = await adminApi.laySinhVien(payload);
      if (res.data) {
        setSVInfo(res.data[0]);
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
  const [refreshFilter, setRefreshFilter] = useState(false);
  const [hocPhi, setHocPhi] = useState();
  const [refreshCtHocPhi, setRefreshCtHocPhi] = useState();
  return (
    <>
      <div style={{ backgroundColor: "#c2bdbd", position: "relative" }}>
        <div style={{ textAlign: "center" }}>
          <h3>HỌC PHÍ</h3>
        </div>

        <div style={{ paddingLeft: "15rem" }}>
          <div style={{ position: "relative" }}>
            <h4>Thông tin sinh viên</h4>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <label style={{ marginRight: "2rem" }}>Mã sinh viên</label>
                <input
                  defaultValue={SVInfo?.MASV}
                  onChange={(e) => setMaSV(e.target.value)}
                  style={customInputStyle}
                ></input>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "3rem",
                }}
              >
                <label style={{ marginRight: "2rem" }}>Tên sinh viên</label>

                <input
                  defaultValue={SVInfo?.HOTEN}
                  style={customInputStyle}
                ></input>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "3rem",
                }}
              >
                <label style={{ marginRight: "2rem" }}>Mã lớp</label>
                <input
                  defaultValue={SVInfo?.MALOP}
                  style={customInputStyle}
                ></input>
              </div>
              <button
                className="buttonLogic"
                style={{
                  float: "none",
                  marginRight: "2rem",
                  marginLeft: "2rem",
                }}
                onClick={() => {
                  setRefreshFilter(!refreshFilter);
                  layDsHocPhi();
                }}
              >
                Tìm
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "1rem 0" }}>
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
      <div key={refreshFilter}>
        <div style={{ marginBottom: "2rem" }}>
          <Table
            refreshCtHocPhi={refreshCtHocPhi}
            setRefreshCtHocPhi={setRefreshCtHocPhi}
            setHocPhi={setHocPhi}
            SVInfo={SVInfo}
          />
        </div>
        <div key={refreshCtHocPhi}>
          <TableDetail hocPhi={hocPhi} SVInfo={SVInfo} />
        </div>
      </div>
    </>
  );
}
