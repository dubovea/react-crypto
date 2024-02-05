import React, { useEffect, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Layout, Card, Statistic, List, Spin, Typography } from "antd";
import { fakeFetchAssets, fakeFetchCrypto } from "../../api";
import { percentDiff } from "../../utils";
const { Sider } = Layout;
const siderStyle = {
  padding: "1rem",
};
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const AppSider = () => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    async function preload() {
      setLoading(true);
      let assets = await fakeFetchAssets();
      const { result } = await fakeFetchCrypto();

      assets.map((asset) => {
        const coin = result.find((o) => o.id === asset.id);
        let totalAmount = asset.amount * coin.price;
        return {
          grow: asset.price < coin.price,
          growPercent: percentDiff(asset.price, coin.price),
          totalAmount: totalAmount,
          totalProfit: totalAmount - asset.amount * asset.price,
          ...asset,
        };
      });
      setAssets(assets);
      setCrypto(result);
      setLoading(false);
    }

    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id}>
          <Statistic
            title={asset.id}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
          />
          <List
            dataSource={data}
            size="small"
            renderItem={(item) => (
              <List.Item>
                <Typography />
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Sider>
  );
};

export default AppSider;
