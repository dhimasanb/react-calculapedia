import React from "react";
import { Table } from "antd";
import { convertToRupiah } from "../../../../../utils/helpers";
import column from "./column";

const amountLeftTable = amountLeft => {
  return (
    <Table
      showHeader={false}
      pagination={false}
      dataSource={[
        {
          key: amountLeft,
          no: "Amount Left",
          rupiah: convertToRupiah(amountLeft)
        }
      ]}
      columns={[
        column("No", "no", 200, no => (
          <span className="amount-left">{no}</span>
        )),
        column("Rupiah", "rupiah", 100, rupiah => (
          <span className="amount-left">{rupiah}</span>
        ))
      ]}
    />
  );
};

export default amountLeftTable;
