import React from "react";
import axiosClient from "../../axios/axiosClient";
import axios from "axios";
import { saveAs } from "file-saver";

let baseURL = "http://localhost:8080/";

export const adminApi = {
  async dangNhap(data) {
    return await axiosClient.post(`dangNhap`, data);
  },

  async layDsMonHoc(data) {
    return await axiosClient.post(`dsMonHoc`, data);
  },

  async layDsLop(data) {
    return await axiosClient.post(`dsLop`, data);
  },

  async layDsLopTC(data) {
    return await axiosClient.post(`dsLopTC`, data);
  },

  async layDsGiangVien(data) {
    return await axiosClient.post(`dsGiangVien`, data);
  },

  async layDsKhoa(data) {
    return await axiosClient.post(`dsKhoa`, data);
  },

  async taoLopTC(data) {
    return await axiosClient.post(`taoLopTC`, data);
  },

  async layDsSinhVien(data) {
    return await axiosClient.post(`dsSinhVien`, data);
  },

  async layDsFilter(data) {
    return await axiosClient.post(`dsFilter`, data);
  },
  async layDsDiemSv(data) {
    return await axiosClient.post(`dsDiemSv`, data);
  },
  async layDsLopTCDK(data) {
    return await axiosClient.post(`dsLopTCDK`, data);
  },
  async layDsLopTCSVDK(data) {
    return await axiosClient.post(`dsLopTCSVDK`, data);
  },
  async dangKyLopTC(data) {
    return await axiosClient.post(`dangKyLopTC`, data);
  },
  async ghiDiemSV(data) {
    return await axiosClient.post(`ghiDiemSV`, data);
  },
  async layDsHocPhi(data) {
    return await axiosClient.post(`dsHocPhi`, data);
  },

  async laySinhVien(data) {
    return await axiosClient.post(`laySinhVien`, data);
  },

  async layCTHocPhi(data) {
    return await axiosClient.post(`layCTHocPhi`, data);
  },
  async dongHocPhi(data) {
    return await axiosClient.post(`dongHocPhi`, data);
  },

  async inDsLopTC(data) {
    return await axios
      .post(`${baseURL}taoDsLopTC`, data)
      .then(() => axios.get(`${baseURL}inDsLopTC`, { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "dsLopTC.pdf");
      });
  },

  async inDsSVDKLopTC(data) {
    return await axios
      .post(`${baseURL}taoDsSVDKLopTC`, data)
      .then(() =>
        axios.get(`${baseURL}inDsSVDKLopTC`, { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "dsSVDKLopTC.pdf");
      });
  },

  async inDiemLopTC(data) {
    return await axios
      .post(`${baseURL}taoDiemLopTC`, data)
      .then(() => axios.get(`${baseURL}inDiemLopTC`, { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "DiemLopTC.pdf");
      });
  },

  async inDiemSV(data) {
    return await axios
      .post(`${baseURL}taoDiemSV`, data)
      .then(() => axios.get(`${baseURL}inDiemSV`, { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "DiemSV.pdf");
      });
  },

  async inHocPhiLop(data) {
    return await axios
      .post(`${baseURL}taoHocPhiLop`, data)
      .then(() => axios.get(`${baseURL}inHocPhiLop`, { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "bangHocPhiLop.pdf");
      });
  },

  async inDiemTongKet(data) {
    return await axios
      .post(`${baseURL}taoDiemTongKet`, data)
      .then(() =>
        axios.get(`${baseURL}inDiemTongKet`, { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "bangDiemTongKet.pdf");
      });
  },
};
