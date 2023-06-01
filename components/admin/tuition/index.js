import React from "react";
import Filters from "./filters";
import Table from "./table";

export default function Tution() {
  const tuition = [];
  return (
    <div>
      <Filters />
      <div style={{ marginBottom: "2rem" }}>
        <Table detail={tuition} tableKey="tuition" />
      </div>
      <div>
        <Table detail={tuition} tableKey="detail" />
      </div>
    </div>
  );
}
