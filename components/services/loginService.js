import React from "react";
import axiosClient from "../../axios/axiosClient";

export const loginApi = {
  async layDsPhanManh(data) {
    return await axiosClient.get(`dsPhanManh`, { data });
  },

  async dangNhap(data) {
    return await axiosClient.post(`dangNhap`, data);
  },

  async dangNhapSV(data) {
    return await axiosClient.post(`dangNhapSV`, data);
  },
};
