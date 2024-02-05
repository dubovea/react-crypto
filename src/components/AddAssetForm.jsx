import React, { useState } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
const AddAssetForm = () => {
  const { crypto } = useCrypto();
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const [submited, setSubmited] = useState(false);

  const validateMessages = {
    required: "${label} is Required!",
    types: {
      number: "${label} is not valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}!",
    },
  };

  const onFinish = (values) => {
    setSubmited(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value));
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };

  if (!coin) {
    return (
      <Select
        onSelect={handleSelect}
        style={{ width: "100%" }}
        placeholder="Select coin"
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
    );
  }

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${42} of ${coin.name} by price ${2}`}
        extra={[
          <Button type="primary" key="console">
            Close
          </Button>,
        ]}
      />
    );
  }
  return (
    <>
      {" "}
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        autoComplete="off"
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber
            placeholder="Enter coin price"
            onChange={handlePriceChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssetForm;
