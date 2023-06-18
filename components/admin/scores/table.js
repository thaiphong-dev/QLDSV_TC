import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { adminApi } from "../../services/adminService";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function Table(props) {
  const {
    filters,
    filtersRefs,
    setShowEditForm,
    refreshTable,
    modelChange,
    setModelChange,
    currentDetail,
    setCurrentDetail,
    refreshChangeDetail,
  } = props;
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
  const [currentCN, setCurrentCN] = useState(
    JSON.parse(localStorage.getItem("currentCN"))
  );
  const rowClass = "rowSelected";
  const [detail, setDetail] = useState([]);
  const detailRef = useRef();
  // lay ds điểm sv
  const layDsDiemSv = async () => {
    const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
    const payload = {
      user: dbConfig.user,
      password: dbConfig.password,
      chiNhanh: currentCN.value,
      ...filters,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsDiemSv(payload);
      if (res.data) {
        setCurrentDetail(res.data);
        setDetail(res.data);
        detailRef.current(res.data);
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
    let prevbtn = document.getElementById("scores_prev-btn");
    if (currentPage === 1) prevbtn.disabled = true;
    else prevbtn.disabled = false;

    let nextbtn = document.getElementById("scores_next-btn");
    if (currentDetail?.length < currentPageSize) nextbtn.disabled = true;
    else nextbtn.disabled = false;
  }, [refreshTable, currentPage, detail?.length, currentDetail?.length]);

  //

  const [selectedRow, setSelectRow] = useState(0);
  const [refreshData, setRefreshData] = useState(false);
  const [showActionButton, setShowActionButton] = useState({
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
  useEffect(() => {
    {
      !modelChange &&
        filters.nienKhoa !== null &&
        filters.hocKy !== null &&
        filters.nhom !== null &&
        filters.monHoc !== null &&
        layDsDiemSv();
    }
  }, [filters, currentPage, currentPageSize, refreshData]);

  useEffect(() => {
    let data = currentDetail;

    if (modelChange) {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].MALTC == modelChange.MALTC &&
          data[i].MASV == modelChange.MASV
        ) {
          data[i].DIEM_CC = modelChange.DIEM_CC;
          data[i].DIEM_GK = modelChange.DIEM_GK;
          data[i].DIEM_CK = modelChange.DIEM_CK;
          data[i].DIEM_TK = modelChange.DIEM_TK;
          setCurrentDetail(data);
        }
      }
    }
  }, [modelChange, currentDetail]);

  const ghiDiemSV = async (list) => {
    const payload = {
      ...dbConfig,
      dsDiem: list ?? [],
    };
    try {
      const res = await adminApi.ghiDiemSV(payload);
      if (res.data) {
        setRefreshData(!refreshData);
        setModelChange(undefined);
        toast.success("Đã lưu điểm vào CSDL", {
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

  return (
    <div>
      <div>
        <table
          key={refreshChangeDetail}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <tr
            style={{
              backgroundColor: "rgb(114, 152, 185)",
            }}
          >
            <td style={{ width: "4rem" }}></td>
            <td>Mã lớp tín chỉ</td>
            <td>Mã sinh viên</td>
            <td>Họ tên</td>
            <td>Điểm chuyên cần</td>
            <td>Điểm giữa kì</td>
            <td>Điểm cuối kì</td>
            <td>Điểm tổng kết</td>
          </tr>

          {currentDetail?.map((x, index) => (
            <tr
              onClick={() => {
                currentDetail?.forEach((e, i) => {
                  if (i !== index)
                    document
                      .getElementById(`diemSv_${i}`)
                      .classList.remove(rowClass);
                });
                document
                  .getElementById(`diemSv_${index}`)
                  .classList.add(rowClass);
                setSelectRow(index);
              }}
              id={`diemSv_${index}`}
              className={selectedRow === index ? rowClass : ""}
              key={`diemSv_${x.MALOP}`}
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
                          Nhập điểm
                        </button>
                      </div>
                    )}
                </div>
              </td>
              <td>{x.MALTC}</td>
              <td>{x.MASV}</td>
              <td>{x.HOTEN}</td>
              <td>
                {x.DIEM_CC
                  ? (Math.round(parseFloat(x.DIEM_CC) * 2) / 2).toFixed(1)
                  : null}
              </td>
              <td>
                {x.DIEM_GK
                  ? (Math.floor(parseFloat(x.DIEM_GK) * 2) / 2).toFixed(1)
                  : null}
              </td>
              <td>
                {x.DIEM_CK
                  ? (Math.floor(parseFloat(x.DIEM_CK) * 2) / 2).toFixed(1)
                  : null}
              </td>
              <td>
                {x.DIEM_TK
                  ? (Math.floor(parseFloat(x.DIEM_TK) * 2) / 2).toFixed(1)
                  : null}
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
            id="scores_prev-btn"
            onClick={handleClickPrevious}
            className="prev-btn buttonLogic"
          >
            Quay lại
          </button>
          <span id="current-page">{currentPage}</span>
          <button
            id="scores_next-btn"
            onClick={handleClickNext}
            className="next-btn buttonLogic"
          >
            Tiếp
          </button>
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button
          className="buttonLogic"
          style={{ float: "none" }}
          onClick={() => {
            ghiDiemSV(currentDetail);
            console.log("current", currentDetail);
          }}
        >
          Ghi thông tin về CSDL
        </button>
      </div>
    </div>
  );
}
