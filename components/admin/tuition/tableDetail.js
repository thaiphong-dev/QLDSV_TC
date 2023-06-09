import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminApi } from "../../services/adminService";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import PayTuition from "./payTuition";

export default function TableDetail(props) {
  const {
    SVInfo,
    hocPhi,
    setCurrentNopHocPhi,
    currentNopHocPhi,
    currentDsHocPhi,
    setCurrentDsHocPhi,
    refreshTableHP,
    setRefreshTableHP,
    refreshTableCT,
    setRefreshTableCT,
  } = props;

  const rowClass = "rowSelected";
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const dsKhoa = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);

  const [CTHocPhi, setCTHocPhi] = useState([]);
  // lấy ds học phí
  const layCTHocPhi = async () => {
    let flag = true;
    for (let i = 0; i < currentDsHocPhi?.length; i++) {
      if (
        currentDsHocPhi[i].NIENKHOA === hocPhi?.NIENKHOA &&
        currentDsHocPhi[i].HOCKY === hocPhi?.HOCKY &&
        currentDsHocPhi[i].CTHocPhi?.length !== 0
      ) {
        setCTHocPhi(currentDsHocPhi[i].CTHocPhi);
        flag = false;
      }
    }

    if (flag && hocPhi?.CSDL) {
      const payload = {
        ...dbConfig,
        MASV: hocPhi?.MASV,
        NIENKHOA: hocPhi?.NIENKHOA,
        HOCKY: hocPhi?.HOCKY,
        pageSize: currentPageSize,
        pageNumber: currentPage - 1,
      };
      try {
        const res = await adminApi.layCTHocPhi(payload);
        if (res.data) {
          let resList = res.data?.map((x) => ({
            ...x,
            CSDL: true,
          }));
          let currentPhi = currentDsHocPhi;
          for (let i = 0; i < currentPhi.length; i++) {
            if (
              currentPhi[i].NIENKHOA === hocPhi?.NIENKHOA &&
              currentPhi[i].HOCKY === hocPhi?.HOCKY
            ) {
              currentPhi[i].CTHocPhi = resList;
            }
          }
          setCurrentDsHocPhi(currentPhi);
          setCTHocPhi(resList);
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
    }
  };

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
    let prevbtn = document.getElementById("tuitionDetail_prev-btn");
    if (currentPage === 1) prevbtn.disabled = true;
    else prevbtn.disabled = false;

    let nextbtn = document.getElementById("tuitionDetail_next-btn");
    if (CTHocPhi?.length < currentPageSize) nextbtn.disabled = true;
    else nextbtn.disabled = false;
  }, [currentPage, CTHocPhi?.length]);

  //

  const [selectedRow, setSelectRow] = useState(0);

  useEffect(() => {
    layCTHocPhi();
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
  const [refreshTable, setRefreshTable] = useState(false);

  return (
    <>
      <div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <button
            className="buttonLogic"
            style={{ float: "none" }}
            onClick={() =>
              setShowEditForm({
                model: {},
                show: true,
                index: Math.random(),
              })
            }
          >
            Đóng học phí
          </button>
        </div>
        <div>
          <table
            key={refreshTableCT}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr
              style={{
                backgroundColor: "rgb(114, 152, 185)",
              }}
            >
              <td style={{ width: "4rem" }}></td>
              <td>Ngày đóng</td>
              <td>Số tiền đóng</td>
            </tr>

            {CTHocPhi?.map((x, index) => (
              <tr
                onClick={() => {
                  CTHocPhi?.forEach((e, i) => {
                    if (i !== index)
                      document
                        .getElementById(`tuitionDetail${i}`)
                        .classList.remove(rowClass);
                  });
                  document
                    .getElementById(`tuitionDetail${index}`)
                    .classList.add(rowClass);
                  setSelectRow(index);
                }}
                id={`tuitionDetail${index}`}
                key={`tuitionDetail${x.MALOP}`}
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
                        </div>
                      )}
                  </div>
                </td>
                <td>{moment(x.NGAYDONG).format("DD-MM-YYYY")}</td>
                <td>{x.SOTIENDONG}</td>
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
              id="tuitionDetail_prev-btn"
              onClick={handleClickPrevious}
              className="prev-btn buttonLogic"
            >
              Quay lại
            </button>
            <span id="current-page">{currentPage}</span>
            <button
              id="tuitionDetail_next-btn"
              onClick={handleClickNext}
              className="next-btn buttonLogic"
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
      <PayTuition
        setCTHocPhi={setCTHocPhi}
        CTHocPhi={CTHocPhi}
        hocPhi={hocPhi}
        refreshTableCT={refreshTableCT}
        setRefreshTableCT={setRefreshTableCT}
        refreshTableHP={refreshTableHP}
        setRefreshTableHP={setRefreshTableHP}
        SVInfo={SVInfo}
        currentDsHocPhi={currentDsHocPhi}
        setCurrentDsHocPhi={setCurrentDsHocPhi}
        setShowEditForm={setShowEditForm}
        model={showEditForm}
      />
    </>
  );
}
