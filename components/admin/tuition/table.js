import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminApi } from "../../services/adminService";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import NewTuition from "./newTuition";

export default function Table(props) {
  const {
    SVInfo,
    setHocPhi,
    setRefreshCtHocPhi,
    refreshCtHocPhi,
    setCurrentDsHocPhi,
    currentDsHocPhi,
    refreshTableHP,
    setRefreshTableHP,
  } = props;
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
  const [dsHocPhi, setDsHocPhi] = useState([]);

  // lấy ds học phí
  const layDsHocPhi = async () => {
    const payload = {
      ...dbConfig,
      MASV: SVInfo?.MASV,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsHocPhi(payload);
      if (res.data) {
        let list = res.data?.map((x) => ({
          ...x,
          CSDL: true,
          CTHocPhi: [],
        }));
        setDsHocPhi(list);
        setCurrentDsHocPhi(list);
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
    layDsHocPhi();
  }, [SVInfo?.MASV, currentPage, currentPageSize]);

  useEffect(() => {
    let prevbtn = document.getElementById("tuition_prev-btn");
    if (currentPage === 1) prevbtn.disabled = true;
    else prevbtn.disabled = false;

    let nextbtn = document.getElementById("tuition_next-btn");
    if (currentDsHocPhi?.length < currentPageSize) nextbtn.disabled = true;
    else nextbtn.disabled = false;
  }, [currentPage, dsHocPhi?.length, currentDsHocPhi?.length]);

  //
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const [selectedRow, setSelectRow] = useState();

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
            Tạo mới học phí
          </button>
        </div>
        <div>
          <table
            key={refreshTableHP}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <tr
              style={{
                backgroundColor: "rgb(114, 152, 185)",
              }}
            >
              <td style={{ width: "4rem" }}></td>
              <td>Niên khóa </td>
              <td>Học kỳ</td>
              <td>Học phí</td>
              <td>Số tiền đã đóng</td>
              <td>Số tiền cần đóng</td>
            </tr>

            {currentDsHocPhi?.map((x, index) => (
              <tr
                onClick={() => {
                  currentDsHocPhi?.forEach((e, i) => {
                    if (i !== index)
                      document
                        .getElementById(`tuition${i}`)
                        .classList.remove(rowClass);
                  });
                  document
                    .getElementById(`tuition${index}`)
                    .classList.add(rowClass);
                  setHocPhi(x);
                  setRefreshCtHocPhi(!refreshCtHocPhi);
                  setSelectRow(index);
                  // layDsSinhVien(x.MALOP);
                }}
                id={`tuition${index}`}
                className={selectedRow === index ? rowClass : ""}
                key={`tuition${x.MALOP}`}
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
                <td>{x.NIENKHOA}</td>
                <td>{x.HOCKY}</td>
                <td>{x.HOCPHI}</td>
                <td>{x.SOTIENDADONG}</td>
                <td>{x.SOTIENCANDONG}</td>
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
              id="tuition_prev-btn"
              onClick={handleClickPrevious}
              className="prev-btn buttonLogic"
            >
              Quay lại
            </button>
            <span id="current-page">{currentPage}</span>
            <button
              id="tuition_next-btn"
              onClick={handleClickNext}
              className="next-btn buttonLogic"
            >
              Tiếp
            </button>
          </div>
        </div>
      </div>
      <NewTuition
        refreshTable={refreshTableHP}
        setRefreshTable={setRefreshTableHP}
        SVInfo={SVInfo}
        currentDsHocPhi={currentDsHocPhi}
        setCurrentDsHocPhi={setCurrentDsHocPhi}
        setShowEditForm={setShowEditForm}
        model={showEditForm}
      />
    </>
  );
}
