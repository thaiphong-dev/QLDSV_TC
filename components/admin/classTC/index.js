import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ClassDetail from "./form";
import { adminApi } from "../../services/adminService";
import ClassTCDetail from "./form";
import { ToastContainer, toast } from "react-toastify";

export default function ClassTC() {
  const [dsLop, setDsLop] = useState();
  const [refreshTable, setRefreshTable] = useState(true);
  const [refres, setRefresh] = useState(true);
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
  const rowClass = "rowSelected";
  const taoLopTC = async (payload) => {
    try {
      const res = await adminApi.taoLopTC(payload);
      if (res.status === 200) {
        setShowEditForm({
          model: {},
          show: false,
          index: null,
        });
        layDsLop();
        setRefresh(!refreshTable);
        toast.success("Tạo mới thành công!", {
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
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // lấy lớp tín chỉ
  const layDsLop = async () => {
    try {
      const res = await adminApi.layDsLopTC(dbConfig);
      if (res.data) {
        setDsLop(res.data);
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
  // lấy giảng viên
  const [dsGiangVien, setDanhSachGiangVien] = useState();
  const layDsGiangVien = async () => {
    try {
      const res = await adminApi.layDsGiangVien(dbConfig);
      if (res.data) {
        setDanhSachGiangVien(res.data);
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

  const [dsKhoa, setdsKhoa] = useState();
  // lấy lớp Khoa
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

  // lấy môn học
  const [dsMonHoc, setDsMMonHoc] = useState();
  const layDsMonHoc = async () => {
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
    layDsKhoa();
    layDsLop();
  }, [refreshTable]);

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
            <Select
              key={dsKhoa?.length}
              defaultValue={dsKhoa?.[0]}
              options={dsKhoa}
            ></Select>
          </div>
        </div>
        <button
          className="buttonLogic"
          onClick={() => {
            layDsGiangVien();
            layDsMonHoc();
            setShowEditForm({
              model: {},
              show: true,
              index: null,
            });
          }}
        >
          Tạo mới
        </button>
        <table
          key={[refres, refreshTable]}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <tr
            style={{
              backgroundColor: "rgb(114, 152, 185)",
            }}
          >
            <td style={{ width: "4rem" }}></td>
            <td style={{ textAlign: "center" }}>Mã lớp tín chỉ</td>
            <td style={{ textAlign: "center" }}>Niên khóa</td>
            <td style={{ textAlign: "center" }}>Học kỳ</td>
            <td>Môn học</td>
            <td>Nhóm</td>
            <td>Giáo viên</td>
            <td>Khoa</td>
            <td style={{ textAlign: "center" }}>Số sinh viên tối thiểu</td>
            <td style={{ textAlign: "center" }}>Hủy Lớp</td>
          </tr>

          {dsLop?.map((x, index) => (
            <tr
              onClick={() => {
                console.log("index", index);
                dsLop?.forEach((e, i) => {
                  if (i !== index)
                    document
                      .getElementById(`lopTC_${i}`)
                      .classList.remove(rowClass);
                });
                document
                  .getElementById(`lopTC_${index}`)
                  .classList.add(rowClass);
              }}
              id={`lopTC_${index}`}
              key={x.classCode}
            >
              <td
                style={{
                  width: "4rem",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {x.HUYLOP ? (
                  <> </>
                ) : (
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
                )}
              </td>
              <td style={{ textAlign: "center" }}>{x.MALTC}</td>
              <td style={{ textAlign: "center" }}>{x.NIENKHOA}</td>
              <td style={{ textAlign: "center" }}>{x.HOCKY}</td>
              <td>{x.TENMH}</td>
              <td>{x.NHOM}</td>
              <td>{x.TENGV}</td>
              <td>{x.TENKHOA}</td>
              <td style={{ textAlign: "center" }}>{x.SOSVTOITHIEU}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  checked={x.HUYLOP ? "checked" : ""}
                  value={x.HUYLOP}
                  type="checkbox"
                ></input>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <ClassTCDetail
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
        dsKhoa={dsKhoa}
        dsMonHoc={dsMonHoc}
        dsGiangVien={dsGiangVien}
        setRefreshEditForm={setRefreshEditForm}
        refreshEditForm={refreshEditForm}
        model={showEditForm}
        taoLopTC={taoLopTC}
      />
      <ToastContainer />
    </>
  );
}
