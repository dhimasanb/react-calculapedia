import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd/lib";
import { convertToRupiah } from "../../../../utils/helpers";
import column from "./column";
import "./index.css";

const TableResult = props => {
  // Object desctructuring
  const { data, amountLeft } = props;

  // Result data fractions
  const dataSource = [];
  let number = 1;
  if (data && data.length > 0) {
    data.map((value, index) => {
      return dataSource.push({
        key: index,
        no: (number += 1),
        quantity: value.quantity,
        rupiah: convertToRupiah(value.rupiah)
      });
    });
  }

  return (
    <div className="table-box">
      {/* Data Table */}
      {data && data.length > 0 && (
        <div>
          <Table
            pagination={false}
            dataSource={dataSource}
            columns={[
              column("No", "no", 200),
              column("Quantity", "quantity", 200),
              column("Rupiah", "rupiah", 200)
            ]}
          />
        </div>
      )}
      {/* Amount Left Table */}
      {amountLeft > 0 && (
        <div className="table-box">
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
        </div>
      )}
    </div>
  );
};

TableResult.propTypes = {
  data: PropTypes.array,
  amountLeft: PropTypes.any
};

export default TableResult;
