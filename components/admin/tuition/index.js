import React, { useState } from "react";
import Filters from "./filters";
import Table from "./table";
import TableDetail from "./tableDetail";
import { ToastContainer } from "react-toastify";

export default function Tution() {
  const tuition = [];

  return (
    <div>
      <Filters />

      <ToastContainer />
    </div>
  );
}
