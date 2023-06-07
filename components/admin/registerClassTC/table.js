import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminApi } from "../../services/adminService";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function Table(props) {
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const {
    filters,
    setShowEditForm,
    setDsDaDk,
    dsDaDk,
    setRefreshDetail,
    setISCallData,
  } = props;
  const rowClass = "rowSelected";

  const dsKhoa = JSON.parse(localStorage.getItem("dsPhanManh")).slice(0, 2);
  // check trùng đăng kí lớp tc
  const kiemTraTrungLop = (row) => {
    console.log("data vào", row);
    console.log("data cũ", dsDaDk);
    let flag = true;
    for (let i = 0; i < dsDaDk?.length; i++) {
      if (
        dsDaDk[i]?.MALTC === row?.MALTC &&
        dsDaDk[i]?.NIENKHOA === row?.NIENKHOA &&
        dsDaDk[i]?.HOCKY === row?.HOCKY &&
        dsDaDk[i]?.NHOM === row?.NHOM
      ) {
        console.log("sai");
        toast.error("Lớp tin chỉ đã được đăng kí", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        flag = false;
        break;
      }
    }
    if (flag) {
      let list = dsDaDk;
      let data = {
        ...row,
        COTHEHUY: 1,
      };
      list.push(data);

      console.log("ds mới", list);
      setDsDaDk(list);
      setRefreshDetail(Math.random());
      setISCallData(false);
    }
  };
  // login phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [dsLopTCDK, setDsLopTCDK] = useState();

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
    let prevbtn = document.getElementById("lopTCDK_prev-btn");
    if (currentPage === 1) prevbtn.disabled = true;
    else prevbtn.disabled = false;

    let nextbtn = document.getElementById("lopTCDK_next-btn");
    if (dsLopTCDK?.length < currentPageSize) nextbtn.disabled = true;
    else nextbtn.disabled = false;
  }, [currentPage, dsLopTCDK?.length]);

  const layDsLopTCDk = async () => {
    const payload = {
      ...dbConfig,
      ...filters,
      pageSize: currentPageSize,
      pageNumber: currentPage,
    };
    try {
      const res = await adminApi.layDsLopTCDK(payload);
      if (res.data) {
        setDsLopTCDK(res.data);
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

  const [showActionButton, setShowActionButton] = useState({
    model: {},
    show: false,
    index: null,
  });

  // const [showEditForm, setShowEditForm] = useState({
  //   model: {},
  //   show: false,
  //   index: null,
  // });
  const [refreshEditForm, setRefreshEditForm] = useState(false);
  useEffect(() => {
    filters.nienKhoa !== null && filters.hocKy !== null && layDsLopTCDk();
  }, [filters, currentPage, currentPageSize]);
  useEffect(() => {
    setShowEditForm({
      model: {},
      show: false,
      index: null,
    });
  }, [refreshEditForm]);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgb(206, 199, 199)",
        }}
      >
        <label>Danh sách Lớp tín chỉ</label>
      </div>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr
            style={{
              backgroundColor: "rgb(114, 152, 185)",
            }}
          >
            <td style={{ width: "4rem" }}></td>
            <td>Mã lớp tín chỉ </td>
            <td>Tên môn học</td>
            <td>Nhóm</td>
            <td>Giảng viên</td>
            <td>Số sinh viên tối thiểu</td>
            {/* <td>Số sinh viên đã đăng ký</td> */}
          </tr>

          {dsLopTCDK?.map((x, index) => (
            <tr
              onClick={() => {
                dsLopTCDK?.forEach((e, i) => {
                  if (i !== index)
                    document
                      .getElementById(`lopTCDK_${i}`)
                      .classList.remove(rowClass);
                });
                document
                  .getElementById(`lopTCDK_${index}`)
                  .classList.add(rowClass);
                setSelectRow(index);
              }}
              id={`lopTCDK_${index}`}
              // className={selectedRow === index ? rowClass : ""}
              key={`lopTCDK_${x.MALOP}`}
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
                          onClick={() => kiemTraTrungLop(x)}
                          className="buttonCustom"
                        >
                          Đăng ký
                        </button>
                      </div>
                    )}
                </div>
              </td>
              <td>{x.MALTC}</td>
              <td>{x.TENMH}</td>
              <td>{x.NHOM}</td>
              <td>{x.TENGV}</td>
              <td>{x.SOSVTOITHIEU}</td>
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
            id="lopTCDK_prev-btn"
            onClick={handleClickPrevious}
            className="prev-btn buttonLogic"
          >
            Quay lại
          </button>
          <span id="current-page">{currentPage}</span>
          <button
            id="lopTCDK_next-btn"
            onClick={handleClickNext}
            className="next-btn buttonLogic"
          >
            Tiếp
          </button>
        </div>
      </div>
    </div>
  );
}
