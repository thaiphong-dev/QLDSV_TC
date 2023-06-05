import React, { useRef, useState } from "react";
import Filters from "./filters";
import Table from "./table";
import TableDetail from "./tableDetail";

export default function RegisterClassTC() {
  const tuition = [];
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

  return (
    <div>
      <div>
        <Filters
          setRefresh={setRefresh}
          filtersRef={filtersRef}
          filters={filters}
          setFilters={setFilters}
        />
        <div key={refresh} style={{ marginBottom: "2rem" }}>
          <Table
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
            filtersRef={filtersRef}
            filters={filters}
            detail={tuition}
          />
          <TableDetail
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
            filtersRef={filtersRef}
            filters={filters}
            detail={tuition}
          />
        </div>
      </div>
    </div>
  );
}
