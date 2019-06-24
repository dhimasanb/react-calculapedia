// Column table
export default function column(title, dataIndex, width, render) {
  return {
    title,
    dataIndex,
    key: dataIndex,
    width,
    render
  };
}
