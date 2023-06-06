import React, { useRef, useState } from "react";
import Filters from "./filters";
import Table from "./table";
import ScoreDetail from "./form";

export default function Scores() {
  const [showEditForm, setShowEditForm] = useState({
    model: {},
    show: false,
    index: null,
  });
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
  const [refreshTable, setRefreshTable] = useState(true);
  return (
    <div>
      <Filters
        setRefresh={setRefresh}
        filtersRef={filtersRef}
        filters={filters}
        setFilters={setFilters}
      />
      <div key={refresh}>
        <Table
          refreshTable={refreshTable}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          filtersRef={filtersRef}
          filters={filters}
        />
      </div>
      <div key={showEditForm.show}>
        <ScoreDetail
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
          setShowEditForm={setShowEditForm}
          model={showEditForm}
        />
      </div>
    </div>
  );
}
