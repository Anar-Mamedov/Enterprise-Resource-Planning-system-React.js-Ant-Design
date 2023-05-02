import { Col, Form, Row, Select, Input, DatePicker, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";
const { Option } = Select;

const Index = ({ bankTime, delivers, setDelivers }) => {
  const [condinations, setCondinations] = useState([]);
  const getCondinations = () => {
    API.Procurement.Picklist.deliveryCondination().then((res) => {
      setCondinations(res.data.data);
    });
  };
  useEffect(() => {
    getCondinations();
  }, []);
  return (
    <>
      {delivers?.map(
        (delive, index) =>
          delive && (
            <Row key={index}>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item hidden name={["contract_delivery", index, "uuid"]} />
                    <Form.Item className="c-form-item" label="Şərt" name={["contract_delivery", index, "delivery_condition_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {condinations.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label="Tarix" name={["contract_delivery", index, "date"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <DatePicker style={{ width: "100%", height: "36px" }} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label="Müddət">
                      <Space size={0}>
                        <Form.Item className="c-form-item" name={["contract_delivery", index, "time_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                          <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                            {bankTime.map((a, i) => (
                              <Option className="c-select-option" key={i} value={a.uuid}>
                                {a.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item className="c-form-item" name={["contract_delivery", index, "time"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                          <Input className="c-input" min="0" type="number" placeholder="Daxil edin..." />
                        </Form.Item>
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col
                    span={5}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: 15,
                    }}
                  >
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        delete delivers[index];
                        setDelivers([...delivers]);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )
      )}
      <Row gutter={14}>
        <Col span={24} align="middle">
          <Button icon={<PlusOutlined />} onClick={() => setDelivers((prev) => [...prev, {}])} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
