import React, { useState } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import { adminApi } from "../../services/adminService";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function ClassTCDetail(props) {
  const {
    model,
    refreshEditForm,
    setRefreshEditForm,
    dsMonHoc,
    dsGiangVien,
    dsKhoa,
    refreshTable,
    refresh,
    setRefreshTable,
    taoLopTC,
  } = props;

  const dbConfig = JSON.parse(localStorage.getItem("currentDB"));

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const payload = {
      ...dbConfig,
      nienKhoa: data?.nienKhoa,
      hocKy: data?.hocKy,
      nhom: data?.nhom,
      svtoithieu: data?.svtoithieu,
      huyLop: data?.huyLop,
      monHoc: data?.monHoc?.value,
      giangVien: data?.giangVien?.value,
      khoa: data?.khoa?.value,
    };
    taoLopTC(payload);
  };
  const dsMonHocOptions = dsMonHoc?.map((x) => ({
    label: x.TENMH.trim(),
    value: x.MAMH.trim(),
  }));

  const dsGiangVienOptions = dsGiangVien?.map((x) => ({
    label: x.HOTEN.trim(),
    value: x.MAGV.trim(),
  }));

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

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
            <label>Niên khóa</label>
            <input
              {...register("nienKhoa")}
              style={{ width: "100%" }}
              defaultValue={model.model.classCode}
            ></input>
          </div>
          <div>
            <label>Học kỳ</label>
            <input
              type="number"
              {...register("hocKy")}
              style={{ width: "100%" }}
              defaultValue={model.model.classCode}
            ></input>
          </div>
          <div>
            <label>Môn học</label>
            <Controller
              name="monHoc"
              control={control}
              render={({ field }) => (
                <Select {...field} options={dsMonHocOptions} />
              )}
            />
          </div>
          <div>
            <label>Nhóm</label>
            <input
              type="number"
              {...register("nhom")}
              style={{ width: "100%" }}
              defaultValue={model.model.classCode}
            ></input>
          </div>
          <div>
            <label>Giáng viên</label>
            <Controller
              name="giangVien"
              control={control}
              render={({ field }) => (
                <Select {...field} options={dsGiangVienOptions} />
              )}
            />
          </div>
          <div>
            <label>Khoa</label>
            <Controller
              name="khoa"
              control={control}
              render={({ field }) => <Select {...field} options={dsKhoa} />}
            />
          </div>
          <div>
            <label>số sinh viên tối thiểu</label>
            <input
              {...register("svtoithieu")}
              type="number"
              style={{ width: "100%" }}
              defaultValue={model.model.classCode}
            ></input>
          </div>
          <div style={{ paddingLeft: "15rem" }}>
            <label>Hủy lớp</label>
            <input {...register("huyLop")} type="checkbox"></input>
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
                setRefreshEditForm(!refreshEditForm);
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
