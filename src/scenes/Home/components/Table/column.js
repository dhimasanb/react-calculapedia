// Column table
export const column = (title, dataIndex, width, render) => {
  return {
    title,
    dataIndex,
    key: dataIndex,
    width,
    render
  };
};
