import React, { useContext } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Layout, Card, Statistic, List, Spin, Typography, Tag } from "antd";
const { Text } = Typography;
import { capitalizeFirstSymbol } from "../../utils";
import CryptoContext from "../../context/crypto-context";
const { Sider } = Layout;
const siderStyle = {
  padding: "1rem",
};

const AppSider = () => {
  const { loading, assets } = useContext(CryptoContext);
  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalizeFirstSymbol(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            dataSource={[
              {
                title: "Totle Profit",
                value: asset.totalProfit,
                formatting: "$",
                withTag: true,
              },
              {
                title: "Asset Amount",
                value: asset.amount,
              },
            ]}
            size="small"
            renderItem={(item) => (
              <List.Item>
                <Text>{item.title}</Text>
                {item.withTag && (
                  <Tag color={asset.grow ? "green" : "red"}>
                    {asset.growPercent}%
                  </Tag>
                )}
                {item.formatting ? (
                  <Text type={asset.grow ? "success" : "danger"}>
                    {(+item.value).toFixed(2)}
                    {item.formatting}
                  </Text>
                ) : (
                  <Text>{item.value}</Text>
                )}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Sider>
  );
};

export default AppSider;
