import React, { useRef, useState } from "react";
import Filters from "./filters";
import Table from "./table";
import TableDetail from "./tableDetail";
import { ToastContainer } from "react-toastify";

export default function RegisterClassTC() {
  const [dsDaDk, setDsDaDk] = useState([]);
  const [isCallData, setISCallData] = useState(true);
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
  const [refreshDetail, setRefreshDetail] = useState(1);

  return (
    <div>
      <div>
        <Filters
          isCallData={isCallData}
          setISCallData={setISCallData}
          setRefresh={setRefresh}
          filtersRef={filtersRef}
          filters={filters}
          setFilters={setFilters}
        />
        <div key={refresh} style={{ marginBottom: "2rem" }}>
          <Table
            isCallData={isCallData}
            setISCallData={setISCallData}
            setRefreshDetail={setRefreshDetail}
            dsDaDk={dsDaDk}
            setDsDaDk={setDsDaDk}
            showEditForm={showEditForm}
            setShowEditForm={setShowEditForm}
            filtersRef={filtersRef}
            filters={filters}
            detail={tuition}
          />
          <div key={refreshDetail}>
            <TableDetail
              isCallData={isCallData}
              setISCallData={setISCallData}
              dsDaDk={dsDaDk}
              setDsDaDk={setDsDaDk}
              showEditForm={showEditForm}
              setShowEditForm={setShowEditForm}
              filtersRef={filtersRef}
              filters={filters}
              detail={tuition}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
