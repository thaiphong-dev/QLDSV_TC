import React from "react";
import axiosClient from "../../axios/axiosClient";

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
};
