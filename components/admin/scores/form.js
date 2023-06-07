import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function ScoreDetail(props) {
  const {
    model,
    refreshTable,
    setRefreshTable,
    setShowEditForm,
    setModelChange,
    modelChange,
    setRefreshChangeDetail,
    refreshChangeDetail,
  } = props;

  const [detail, setDetail] = useState(model?.model);
  const timeOutRef = useRef(null);
  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      MALTC: model.model?.MALTC,
      MASV: model.model?.MASV,
      HOTEN: model.model?.HOTEN,
      DIEM_CC: parseFloat(data.diemCc),
      DIEM_GK: parseFloat(data.diemGk),
      DIEM_CK: parseFloat(data.diemCk),
      DIEM_TK: parseFloat(data.diemTk),
    };
    // taoLopTC(payload);
    setModelChange(payload);
    setRefreshChangeDetail(!refreshChangeDetail);
    setShowEditForm({
      model: {},
      show: false,
      index: null,
    });
  };

  const formatValue = (num) => {
    return !isNaN(parseFloat(num))
      ? (Math.floor(parseFloat(num) * 2) / 2).toFixed(1)
      : 0;
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    let diemCc = watch("diemCc");
    if (diemCc) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setValue("diemCc", formatValue(diemCc));
      }, 1000);
    }
  }, [watch("diemCc")]);

  useEffect(() => {
    let diemGk = watch("diemGk");
    if (diemGk) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setValue("diemGk", formatValue(diemGk));
      }, 1000);
    }
  }, [watch("diemGk")]);

  useEffect(() => {
    let diemCk = watch("diemCk");
    if (diemCk) {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        setValue("diemCk", formatValue(diemCk));
      }, 1000);
    }
  }, [watch("diemCk")]);

  useEffect(() => {
    let diemCc = watch("diemCc");
    let diemGk = watch("diemGk");
    let diemCk = watch("diemCk");

    if (
      diemCc !== null &&
      diemCc > 0 &&
      diemGk !== null &&
      diemGk > 0 &&
      diemCk !== null &&
      diemCk > 0
    ) {
      setValue(
        "diemTk",
        formatValue(
          parseFloat(diemCc) * 0.1 +
            parseFloat(diemGk) * 0.3 +
            parseFloat(diemCk) * 0.6
        )
      );
    } else setValue("diemTK", 0);
  }, [watch("diemCc"), watch("diemGk"), watch("diemCk")]);

  return (
    <ReactModal
      isOpen={model.show}
      contentLabel="Điểm sinh viên"
      style={customStyles}
    >
      <div>
        <h3>{model.model?.className}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Mã lớp</label>
            <input
              disabled
              {...register("maLop")}
              style={{ width: "100%" }}
              defaultValue={model.model?.MALTC}
            ></input>
          </div>
          <div>
            <label>Mã sinh viên</label>
            <input
              disabled
              {...register("maSv")}
              style={{ width: "100%" }}
              defaultValue={model.model?.MASV}
            ></input>
          </div>
          <div>
            <label>Họ tên</label>
            <input
              disabled
              {...register("hoTen")}
              style={{ width: "100%" }}
              defaultValue={model.model?.HOTEN}
            ></input>
          </div>
          <div>
            <label>Điểm chuyên cần</label>
            <input
              type="number"
              min={0}
              max={10}
              {...register("diemCc")}
              style={{ width: "100%" }}
              defaultValue={
                (Math.floor(parseFloat(model.model?.DIEM_CC) * 2) / 2).toFixed(
                  1
                ) ?? null
              }
            ></input>
          </div>

          <div>
            <label>Điểm giữa kì</label>
            <input
              type="number"
              step=".1"
              min={0}
              max={10}
              {...register("diemGk")}
              style={{ width: "100%" }}
              defaultValue={
                (Math.floor(parseFloat(model.model?.DIEM_GK) * 2) / 2).toFixed(
                  1
                ) ?? null
              }
            ></input>
          </div>

          <div>
            <label>Điểm cuối kì</label>
            <input
              type="number"
              step=".1"
              min={0}
              max={10}
              {...register("diemCk")}
              style={{ width: "100%" }}
              defaultValue={
                (Math.floor(parseFloat(model.model?.DIEM_CK) * 2) / 2).toFixed(
                  1
                ) ?? null
              }
            ></input>
          </div>

          <div>
            <label>Điểm tổng kết</label>
            <input
              disabled
              type="number"
              step=".1"
              min={0}
              max={10}
              {...register("diemTk")}
              style={{ width: "100%" }}
              defaultValue={
                (Math.floor(parseFloat(model.model?.DIEM_TK) * 2) / 2).toFixed(
                  1
                ) ?? null
              }
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              className="buttonLogic"
              style={{ marginRight: "0.5rem" }}
              onClick={(e) => {
                setRefreshTable(!refreshTable);
              }}
            >
              Lưu
            </button>
            <button
              className="buttonLogicCancel"
              onClick={(e) => {
                e.preventDefault();
                setShowEditForm({
                  model: {},
                  show: false,
                  index: null,
                });
              }}
            >
              Thoát
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
