import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import StudentDetail from "./form";
import moment from "moment/moment";

export default function StudentList(props) {
  const { dsSinhVien, svSelected, setSvSelected } = props;
  const rowClass = "rowSelected";
  const [selectedRow, setSelectRow] = useState(0);

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
            textAlign: "center",
            backgroundColor: "rgb(206, 199, 199)",
          }}
        >
          <label>Danh sách sinh viên</label>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr
            style={{
              backgroundColor: "rgb(114, 152, 185)",
              textAlign: "center",
            }}
          >
            <td style={{ width: "4rem" }}></td>
            <td>Mã sinh viên</td>
            <td>Tên</td>
            <td>Mã lớp</td>
            <td>Phái</td>
            <td>Ngày sinh</td>
            <td>Địa chỉ</td>
            <td>Nghỉ học</td>
          </tr>

          {dsSinhVien?.map((x, index) => (
            <tr
              onClick={() => {
                dsSinhVien?.forEach((e, i) => {
                  if (i !== index)
                    document
                      .getElementById(`SV_${i}`)
                      .classList.remove(rowClass);
                });
                document.getElementById(`SV_${index}`).classList.add(rowClass);
                setSvSelected(x);
                setSelectRow(index);
              }}
              id={`SV_${index}`}
              className={selectedRow === index ? rowClass : ""}
              key={x.MASV}
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
                          left: "27.5rem",
                          zIndex: 100,
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
                        <button className="buttonCustom">xóa</button>
                      </div>
                    )}
                </div>
              </td>
              <td style={{ textAlign: "center" }}>{x.MASV}</td>
              <td>{x.HOTEN}</td>
              <td style={{ textAlign: "center" }}>{x.MALOP}</td>
              <td style={{ textAlign: "center" }}>{x.PHAI ? "Nữ" : "Nam"}</td>
              <td style={{ textAlign: "center" }}>
                {moment(x.NGAYSINH).format("DD-MM-YYYY")}
              </td>
              <td>{x.DIACHI}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  checked={x.DANGHIHOC ? "checked" : ""}
                  value={x.DANGHIHOC}
                  type="checkbox"
                ></input>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <StudentDetail
        setRefreshEditForm={setRefreshEditForm}
        refreshEditForm={refreshEditForm}
        model={showEditForm}
      />
    </>
  );
}
