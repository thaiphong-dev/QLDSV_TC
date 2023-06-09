import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function NewTuition(props) {
  const {
    model,
    setShowEditForm,
    currentDsHocPhi,
    setCurrentDsHocPhi,
    SVInfo,
    setRefreshTable,
    refreshTable,
  } = props;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let check = true;
    for (let i = 0; i < currentDsHocPhi?.length; i++) {
      if (
        currentDsHocPhi[i].HOCKY == data.HOCKY &&
        currentDsHocPhi[i].NIENKHOA == data.NIENKHOA
      ) {
        check = false;
        break;
      }
    }
    if (check) {
      let list = currentDsHocPhi;
      list.push({
        HOCKY: parseInt(data.HOCKY),
        NIENKHOA: data.NIENKHOA,
        HOCPHI: parseFloat(data.HOCPHI),
        MASV: SVInfo?.MASV,
        SOTIENCANDONG: parseFloat(data.HOCPHI),
        SOTIENDADONG: 0,
        CTHocPhi: [],
        CSDL: false,
      });
      setCurrentDsHocPhi(list);

      setShowEditForm({
        model: {},
        show: false,
        index: null,
      });
      setRefreshTable(!refreshTable);
    } else {
      toast.error("Học Phí đã tồn tại", {
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
    <ReactModal
      isOpen={model.show}
      contentLabel="Điểm sinh viên"
      style={customStyles}
    >
      <div>
        <h3>{model.model?.className}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Niên khóa</label>
            <input {...register("NIENKHOA")} style={{ width: "100%" }}></input>
          </div>
          <div>
            <label>Học Kỳ</label>
            <input
              type="number"
              min={0}
              max={10}
              {...register("HOCKY")}
              style={{ width: "100%" }}
            ></input>
          </div>
          <div>
            <label>Học phí</label>
            <input
              type="number"
              min={0}
              {...register("HOCPHI")}
              style={{ width: "100%" }}
            ></input>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <button
              type="submit"
              className="buttonLogic"
              style={{ marginRight: "0.5rem" }}
              onClick={(e) => {}}
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
