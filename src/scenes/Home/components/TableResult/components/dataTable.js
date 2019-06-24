import React from "react";
import { Table } from "antd";
import column from "./column";

const dataTable = dataSource => {
  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={[
        column("No", "no", 200),
        column("Quantity", "quantity", 200),
        column("Rupiah", "rupiah", 200)
      ]}
    />
  );
};

export default dataTable;
