import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";

export default function AssetsTable() {
  const { assets } = useCrypto();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Price, $",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  const data = assets.map((o) => ({
    key: o.id,
    name: o.name,
    price: o.price,
    amount: o.amount,
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={false}
    />
  );
}
