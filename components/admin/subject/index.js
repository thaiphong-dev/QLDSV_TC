import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import SubjectDetail from "./form";
import { adminApi } from "../../services/adminService";

export default function Subject() {
  const dsKhoa = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);
  const [dsMonHoc, setDsMMonHoc] = useState();
  const layDsMonHoc = async () => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
    try {
      const res = await adminApi.layDsMonHoc(dbConfig);
      if (res.data) {
        setDsMMonHoc(res.data);
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
    layDsMonHoc();
  }, []);

  const [showActionButton, setShowActionButton] = useState({
    model: {},
    show: false,
    index: null,
  });

  const [showEditForm, setShowEditForm] = useState({
    model: {},
    show: false,
    index: null,
  });
  const [refreshEditForm, setRefreshEditForm] = useState(false);

  useEffect(() => {
    setShowEditForm({
      model: {},
      show: false,
      index: null,
    });
  }, [refreshEditForm]);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          <label style={{ paddingTop: "7px", paddingRight: "10px" }}>
            Khoa
          </label>
          <div style={{ width: "30%" }}>
            <Select defaultValue={dsKhoa[0]} options={dsKhoa}></Select>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr style={{ backgroundColor: "rgb(114, 152, 185)" }}>
            <td style={{ width: "4rem" }}></td>
            <td>Mã lớp</td>
            <td>Tên lớp</td>
            <td>Số tín chỉ</td>
          </tr>

          {dsMonHoc?.map((x, index) => (
            <tr key={x.classCode}>
              <td
                style={{
                  width: "4rem",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{ width: "100%" }}
                  onClick={() => {
                    setShowActionButton({
                      model: x,
                      show: true,
                      index: index,
                    });
                  }}
                  onBlur={() => {
                    setShowActionButton({
                      model: {},
                      show: false,
                      index: null,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />

                  {showActionButton?.show &&
                    showActionButton?.index === index && (
                      <div
                        style={{
                          width: "7rem",
                          position: "absolute",
                          left: "3rem",
                          zIndex: "100",
                        }}
                      >
                        <button
                          className="buttonCustom"
                          onClick={() =>
                            setShowEditForm({
                              model: x,
                              show: true,
                              index: index,
                            })
                          }
                        >
                          Chỉnh sửa
                        </button>
                        <button className="buttonCustom">DS sinh viên</button>
                        <button className="buttonCustom">xóa</button>
                      </div>
                    )}
                </div>
              </td>
              <td>{x.MAMH}</td>
              <td>{x.TENMH}</td>
              <td>{(x.SOTIET_TH + x.SOTIET_LT) / 15}</td>
            </tr>
          ))}
        </table>
      </div>
      <SubjectDetail
        setRefreshEditForm={setRefreshEditForm}
        refreshEditForm={refreshEditForm}
        model={showEditForm}
      />
    </>
  );
}
