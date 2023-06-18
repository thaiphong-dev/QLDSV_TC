import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ClassDetail from "./form";
import { adminApi } from "../../services/adminService";
import { toast } from "react-toastify";

export default function Class() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const [dsLop, setDsLop] = useState();
  const [currentCN, setCurrentCN] = useState(
    JSON.parse(localStorage.getItem("currentCN"))
  );

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

  const layDsLop = async () => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
    const payload = {
      chiNhanh: currentCN.value,
      password: dbConfig.password,
      user: dbConfig.user,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsLop(payload);
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

  useEffect(() => {
    layDsLop();
  }, [currentCN, currentPage, currentPageSize]);

  const dsKhoa = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);

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
              isDisabled={userLogin.ROLENAME !== "PGV" ? true : false}
              defaultValue={currentCN}
              options={dsKhoa}
              onChange={(value) => {
                localStorage.setItem("currentCN", JSON.stringify(value));
                setCurrentCN(value);
              }}
            ></Select>
          </div>
        </div>

        <table
          key={currentCN?.value}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
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
      <ClassDetail
        setRefreshEditForm={setRefreshEditForm}
        refreshEditForm={refreshEditForm}
        model={showEditForm}
      />
    </>
  );
}
