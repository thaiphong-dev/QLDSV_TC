import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import StudentDetail from "./form";
import StudentInfo from "./studentInfo";
import StudentList from "./studentList";
import { toast } from "react-toastify";
import { adminApi } from "../../services/adminService";

export default function Student() {
  const rowClass = "rowSelected";

  const dsKhoa = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);
  const [dsLop, setDsLop] = useState();
  const [svSelected, setSvSelected] = useState();

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
    let prevbtn = document.getElementById("classSV_prev-btn");
    if (currentPage === 1) prevbtn.disabled = true;
    else prevbtn.disabled = false;

    let nextbtn = document.getElementById("classSV_next-btn");
    if (dsLop?.length < currentPageSize) nextbtn.disabled = true;
    else nextbtn.disabled = false;
  }, [currentPage, dsLop?.length]);

  //
  const layDsLop = async () => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
    const payload = {
      ...dbConfig,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsLop(payload);
      if (res.data) {
        setDsLop(res.data);
        layDsSinhVien(res.data?.[0].MALOP);
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
  const [dsSinhVien, setDsSinhVien] = useState();

  const layDsSinhVien = async (maLop) => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
    const payload = {
      ...dbConfig,
      maLop: maLop,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsSinhVien(payload);
      if (res.data) {
        setDsSinhVien(res.data);
        setSvSelected(res.data[0]);
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
  const [selectedRow, setSelectRow] = useState(0);

  const [keyFirst, setKeyFirst] = useState(true);

  useEffect(() => {
    layDsLop();
  }, [currentPage, currentPageSize]);

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
            <Select options={dsKhoa}></Select>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr
            style={{
              backgroundColor: "rgb(114, 152, 185)",
            }}
          >
            <td style={{ width: "4rem" }}></td>
            <td>Mã lớp</td>
            <td>Tên lớp</td>
            <td>Khóa học</td>
            <td>Khoa</td>
          </tr>

          {dsLop?.map((x, index) => (
            <tr
              onClick={() => {
                dsLop?.forEach((e, i) => {
                  if (i !== index)
                    document
                      .getElementById(`lop_${i}`)
                      .classList.remove(rowClass);
                });
                document.getElementById(`lop_${index}`).classList.add(rowClass);
                setSelectRow(index);
                layDsSinhVien(x.MALOP);
              }}
              id={`lop_${index}`}
              className={selectedRow === index ? rowClass : ""}
              key={`lop_${x.MALOP}`}
            >
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
              <td>{x.MALOP}</td>
              <td>{x.TENLOP}</td>
              <td>{x.KHOAHOC}</td>
              <td>{x.KHOA}</td>
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
            id="classSV_prev-btn"
            onClick={handleClickPrevious}
            className="prev-btn buttonLogic"
          >
            Quay lại
          </button>
          <span id="current-page">{currentPage}</span>
          <button
            id="classSV_next-btn"
            onClick={handleClickNext}
            className="next-btn buttonLogic"
          >
            Tiếp
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "34%" }}>
          <StudentInfo detail={svSelected} />
        </div>
        <div
          style={{
            width: "65%",
            paddingTop: "3rem",
          }}
        >
          {dsSinhVien && (
            <StudentList
              svSelected={svSelected}
              setSvSelected={setSvSelected}
              dsSinhVien={dsSinhVien}
            />
          )}
        </div>
      </div>

      <StudentDetail
        setRefreshEditForm={setRefreshEditForm}
        refreshEditForm={refreshEditForm}
        model={showEditForm}
      />
    </>
  );
}
