import React from "react";
import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";
const { Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

const AppContent = () => {
  const { assets, crypto } = useCrypto(),
    totalAmount = assets
      .reduce((acc, val) => {
        const coin = crypto.find((c) => c.id === val.id);
        acc += val.amount * coin.price;
        return acc;
      }, 0)
      .toFixed(2);
  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Portfolio: {totalAmount}$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Content>
  );
};

export default AppContent;
