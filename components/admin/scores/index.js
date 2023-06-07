import React, { useRef, useState } from "react";
import Filters from "./filters";
import Table from "./table";
import ScoreDetail from "./form";
import { ToastContainer } from "react-toastify";

export default function Scores() {
  const [showEditForm, setShowEditForm] = useState({
    model: {},
    show: false,
    index: null,
  });
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

  const [currentDetail, setCurrentDetail] = useState([]);

  const [refresh, setRefresh] = useState(1);
  const [refreshTable, setRefreshTable] = useState(true);
  const [refreshChangeDetail, setRefreshChangeDetail] = useState(true);
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
      <div key={[refresh, refreshChangeDetail]}>
        <Table
          refreshChangeDetail={refreshChangeDetail}
          currentDetail={currentDetail}
          setCurrentDetail={setCurrentDetail}
          modelChange={modelChange}
          setModelChange={setModelChange}
          refreshTable={refreshTable}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          filtersRef={filtersRef}
          filters={filters}
        />
      </div>
      <div key={showEditForm.show}>
        <ScoreDetail
          refreshChangeDetail={refreshChangeDetail}
          setRefreshChangeDetail={setRefreshChangeDetail}
          modelChange={modelChange}
          setModelChange={setModelChange}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
          setShowEditForm={setShowEditForm}
          model={showEditForm}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
