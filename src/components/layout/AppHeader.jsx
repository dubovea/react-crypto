import React, { useState, useEffect } from "react";
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import CryptoDialog from "../CryptoDialog";
import AddAssetForm from "../AddAssetForm";
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
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelected((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value));
    setModalOpen(true);
    console.log(value);
  };

  return (
    <Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        onClick={() => setSelected((prev) => !prev)}
        open={isSelected}
        style={{ width: 250 }}
        value="press / to open"
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
      <Button type="primary" onClick={() => setDrawerOpen(true)}>
        Add Asset
      </Button>
      <Drawer
        title="Add Asset"
        width={600}
        onClose={() => setDrawerOpen(false)}
        open={isDrawerOpen}
        destroyOnClose={true}
      >
        <AddAssetForm />
      </Drawer>

      <Modal
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <CryptoDialog coin={coin} />
      </Modal>
    </Header>
  );
};

export default AppHeader;
