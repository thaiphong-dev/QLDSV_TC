import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";

export default function PayTuition(props) {
  const {
    model,
    setShowEditForm,
    currentDsHocPhi,
    setCurrentDsHocPhi,
    SVInfo,
    setRefreshTableCT,
    refreshTableCT,
    setRefreshTableHP,
    refreshTableHP,
    hocPhi,
    CTHocPhi,
    setCTHocPhi,
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

    if (check) {
      let list = CTHocPhi;
      let tien = parseFloat(data.SOTIENCANDONG);
      list.push({
        NGAYDONG: new Date(),
        SOTIENDONG: tien,
        CSDL: false,
      });

      let currentPhi = currentDsHocPhi;
      for (let i = 0; i < currentPhi.length; i++) {
        if (
          currentPhi[i].NIENKHOA === hocPhi.NIENKHOA &&
          currentPhi[i].HOCKY === hocPhi.HOCKY
        ) {
          currentPhi[i].CTHocPhi = list;
          currentPhi[i].SOTIENDADONG += tien;
          currentPhi[i].SOTIENCANDONG -= tien;
        }
      }
      setCurrentDsHocPhi(currentPhi);

      setCTHocPhi(list);

      setShowEditForm({
        model: {},
        show: false,
        index: null,
      });
      setRefreshTableCT(!refreshTableCT);
      setRefreshTableHP(!refreshTableHP);
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
            <input
              disabled
              {...register("NIENKHOA")}
              style={{ width: "100%" }}
              defaultValue={hocPhi?.NIENKHOA ?? null}
            ></input>
          </div>
          <div>
            <label>Học Kỳ</label>
            <input
              disabled
              type="number"
              min={0}
              max={10}
              {...register("HOCKY")}
              style={{ width: "100%" }}
              defaultValue={hocPhi?.HOCKY ?? null}
            ></input>
          </div>
          <div>
            <label>Học phí</label>
            <input
              disabled
              type="number"
              min={0}
              {...register("HOCPHI")}
              style={{ width: "100%" }}
              defaultValue={hocPhi?.HOCPHI}
            ></input>
          </div>

          <div>
            <label>Số tiền đã đóng</label>
            <input
              disabled
              type="number"
              min={0}
              {...register("SOTIENDADONG")}
              style={{ width: "100%" }}
              defaultValue={hocPhi?.SOTIENDADONG}
            ></input>
          </div>

          <div>
            <label>Số tiền cần đóng</label>
            <input
              placeholder={`Còn nợ ${hocPhi?.HOCPHI - hocPhi?.SOTIENDADONG}`}
              type="number"
              min={0}
              {...register("SOTIENCANDONG")}
              style={{ width: "100%" }}
              defaultValue={hocPhi?.SOTIENCANDONG}
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
