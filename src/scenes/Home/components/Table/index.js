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
      color: "#fa541c" // volcano-6
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

  return (
    <div style={styles.tableBox}>
      {/* Data Table */}
      {data && data.length > 0 && (
        <div>
          <Table
            pagination={false}
            dataSource={dataSource}
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                key: "no",
                width: 200
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                width: 200
              },
              {
                title: "Rupiah",
                dataIndex: "rupiah",
                key: "rupiah",
                width: 200
              }
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
              {
                title: "No.",
                dataIndex: "no",
                key: "no",
                width: 200,
                render: no => <span style={styles.amountLeft}>{no}</span>
              },
              {
                title: "Rupiah",
                dataIndex: "rupiah",
                key: "rupiah",
                width: 100,
                render: rupiah => (
                  <span style={styles.amountLeft}>{rupiah}</span>
                )
              }
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
