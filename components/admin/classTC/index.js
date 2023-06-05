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

  // login phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);

  const handleChangePageSize = (e) => {
    setCurrentPageSize(e.target.value);
  };

  const handleClickNext = () => {
    let page = currentPage + 1;

    setCurrentPage(page);
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      let page = currentPage - 1;
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    let prevbtn = document.getElementById("classTC_prev-btn");
    if (currentPage === 1) prevbtn.disabled = true;
    else prevbtn.disabled = false;

    let nextbtn = document.getElementById("classTC_next-btn");
    if (dsLop?.length < currentPageSize) nextbtn.disabled = true;
    else nextbtn.disabled = false;
  }, [currentPage, dsLop?.length]);

  //
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
    const payload = {
      ...dbConfig,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsLopTC(payload);
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

  // lấy môn học
  const [dsMonHoc, setDsMMonHoc] = useState();
  const layDsMonHoc = async () => {
    const payload = {
      ...dbConfig,
      pageSize: 100,
      pageNumber: 1,
    };
    try {
      const res = await adminApi.layDsMonHoc(payload);
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
  }, []);

  useEffect(() => {
    layDsLop();
  }, [refreshTable, currentPage, currentPageSize]);

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
          className="table-container"
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
      {/* Phân trang  */}
      <div class="pagination-container">
        <div class="page-size">
          <label for="page-size-select">Page Size:</label>
          <select
            onChange={(e) => handleChangePageSize(e)}
            id="page-size-select"
            defaultValue={currentPageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div class="page-number">
          <button
            id="classTC_prev-btn"
            onClick={handleClickPrevious}
            className="prev-btn buttonLogic"
          >
            Quay lại
          </button>
          <span id="current-page">{currentPage}</span>
          <button
            id="classTC_next-btn"
            onClick={handleClickNext}
            className="next-btn buttonLogic"
          >
            Tiếp
          </button>
        </div>
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
