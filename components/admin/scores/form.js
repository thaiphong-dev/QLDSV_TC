import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function ScoreDetail(props) {
  console.log("sadsada", props);
  const {
    model,

    refreshTable,
    setRefreshTable,
    setShowEditForm,
  } = props;

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
      ...dbConfig,
      maLop: model.model.MALTC,
      maSv: model.model.MASV,
      diemCc: parseFloat(data.diemCc),
      diemGk: parseFloat(data.diemGk),
      diemCk: parseFloat(data.diemCk),
    };
    // taoLopTC(payload);
    console.log("payload", payload);
  };

  const formatValue = (num) => {
    console.log("call", num);
    return (Math.floor(parseFloat(num) * 2) / 2).toFixed(1);
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

  // useEffect(() => {
  //   let diemCc = watch("diemCc");
  //   console.log("diemcc", diemCc);
  //   setTimeout(() => {
  //     setValue("diemCc", formatValue(diemCc));
  //   }, 1000);
  // }, [watch("diemCc")]);

  return (
    <ReactModal
      isOpen={model.show}
      contentLabel="Thông tin lớp"
      style={customStyles}
    >
      <div>
        <h3>{model.model.className}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Mã lớp</label>
            <input
              disabled
              {...register("maLop")}
              style={{ width: "100%" }}
              defaultValue={model.model.MALTC}
            ></input>
          </div>
          <div>
            <label>Mã sinh viên</label>
            <input
              disabled
              {...register("maSv")}
              style={{ width: "100%" }}
              defaultValue={model.model.MASV}
            ></input>
          </div>
          <div>
            <label>Họ tên</label>
            <input
              disabled
              {...register("hoTen")}
              style={{ width: "100%" }}
              defaultValue={model.model.HOTEN}
            ></input>
          </div>
          <div>
            <label>Điểm chuyên cần</label>
            <input
              type="number"
              step=".1"
              min={0}
              max={10}
              // onChange={(e) => {
              //   console.log("change", e.target.value);
              //   setValue("diemCc", formatValue(e.target.value));
              // }}
              {...register("diemCc")}
              style={{ width: "100%" }}
              defaultValue={
                (Math.floor(parseFloat(model.model.DIEM_CK) * 2) / 2).toFixed(
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
                (Math.floor(parseFloat(model.model.DIEM_GK) * 2) / 2).toFixed(
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
                (Math.floor(parseFloat(model.model.DIEM_CK) * 2) / 2).toFixed(
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
                (Math.floor(parseFloat(model.model.DIEM_TK) * 2) / 2).toFixed(
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
