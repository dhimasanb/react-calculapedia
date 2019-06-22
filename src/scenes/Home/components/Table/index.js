import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd/lib";

function TableResult(props) {

  const { data, amountLeft } = props;

  const amountLeftStyles = {
    color: '#fa541c' // volcano-6
  };

  const columns = [
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
  ];

  let dataSource = [];
  let number = 1;
  if (data && data.length > 0) {
    data.map((data, index) => {
      return dataSource.push({
        key: index,
        no: number++,
        quantity: data.total,
        rupiah: "Rp " + data.money
      });
    });
  }

  return (
    <div style={{ marginTop: 15 }}>
      {data && data.length > 0 && (
        <div>
          <Table pagination={false} dataSource={dataSource} columns={columns} />
        </div>
      )}
      {amountLeft > 0 && (
        <div style={{ marginTop: 15 }}>
          <Table
            showHeader={false}
            pagination={false}
            dataSource={[
              {
                key: amountLeft,
                no: "Amount Left",
                rupiah: "Rp " + amountLeft
              }
            ]}
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                key: "no",
                width: 200,
                render: no => <span style={amountLeftStyles}>{no}</span>
              },
              {
                title: "Rupiah",
                dataIndex: "rupiah",
                key: "rupiah",
                width: 100,
                render: rupiah => <span style={amountLeftStyles}>{rupiah}</span>
              }
            ]}
          />
        </div>
      )}
    </div>
  );
}

TableResult.propTypes = {
  data: PropTypes.array,
  amountLeft: PropTypes.any
};

export default TableResult;
