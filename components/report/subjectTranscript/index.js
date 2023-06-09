import React, { useRef, useState } from "react";
import Filters from "./filters";
import { ToastContainer } from "react-toastify";

export default function SubjectTranscript() {
  const [modelChange, setModelChange] = useState();
  const [filters, setFilters] = useState({
    nienKhoa: null,
    hocKy: null,
    nhom: null,
    monHoc: null,
  });

  const filtersRef = useRef({
    nienKhoa: null,
    hocKy: null,
    nhom: null,
    monHoc: null,
  });

  const [refresh, setRefresh] = useState(1);

  return (
    <div>
      <Filters
        modelChange={modelChange}
        setModelChange={setModelChange}
        setRefresh={setRefresh}
        filtersRef={filtersRef}
        filters={filters}
        setFilters={setFilters}
      />

      <ToastContainer />
    </div>
  );
}
