import React from "react";
import PropTypes from "prop-types";
import { convertToRupiah } from "../../../../utils/helpers";
import DataTable from "./components/dataTable";
import AmountLeftTable from "./components/amountLeftTable";
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
          <DataTable dataSource={dataSource} />
        </div>
      )}
      {/* Amount Left Table */}
      {amountLeft > 0 && (
        <div className="table-box">
          <AmountLeftTable amountLeft={amountLeft} />
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
