import React, { useState, useEffect } from "react";
import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";
const { Header } = Layout;
const headerStyle = {
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "black",
};

const AppHeader = () => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelected((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const { crypto } = useCrypto();
  const handleSelect = (value) => {
    console.log(value);
  };

  return (
    <Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        onClick={() => setSelected((prev) => !prev)}
        open={selected}
        style={{ width: 250 }}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>
    </Header>
  );
};

export default AppHeader;
