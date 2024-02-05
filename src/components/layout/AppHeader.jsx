import React from "react";
import { Layout } from "antd";
const { Header } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const AppHeader = () => {
  return <Header style={headerStyle}>Header</Header>;
};

export default AppHeader;
