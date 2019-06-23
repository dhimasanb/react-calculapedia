import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd/lib";
import { convertToRupiah } from "../../../../utils/helpers";

const TableResult = props => {
  // Styles
  const styles = {
    tableBox: {
      marginTop: 15
    },
    amountLeft: {
      // Volcano-6
      // Reference : https://ant.design/docs/spec/colors
      color: "#fa541c"
    }
  };

  // Object desctructuring
  const { data, amountLeft } = props;

  // Result data fractions
  let dataSource = [];
  let number = 1;
  if (data && data.length > 0) {
    data.map((data, index) => {
      return dataSource.push({
        key: index,
        no: number++,
        quantity: data.quantity,
        rupiah: convertToRupiah(data.rupiah)
      });
    });
  }

  // Column table
  let column = (title, dataIndex, width, render) => {
    return {
      title,
      dataIndex,
      key: dataIndex,
      width,
      render
    };
  };

  return (
    <div style={styles.tableBox}>
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
        <div style={styles.tableBox}>
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
                <span style={styles.amountLeft}>{no}</span>
              )),
              column("Rupiah", "rupiah", 100, rupiah => (
                <span style={styles.amountLeft}>{rupiah}</span>
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
