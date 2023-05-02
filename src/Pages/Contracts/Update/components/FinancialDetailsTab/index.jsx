import React, { useState } from "react";
import { Col, Form, Row, Select, Input, DatePicker, Button, Switch, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const { Option } = Select;

const Index = ({ bankTime, taxEdv, banks, setItem, form, details, setDetails }) => {
  const financeDetailSwich = (val, index) => {
    setItem([{ name: ["finance_details", index, "tax_id"], value: null, errors: null }]);
    setItem([{ name: ["finance_details", index, "tax_id_value"], value: null, errors: null }]);
    details[index].is_checked = val;
    setDetails([...details]);
  };
  const calculateHandle = (e, index, name) => {
    if (Number(e.target.value) < 0) {
      setItem([{ name: ["finance_details", index, name], value: 0, errors: null }]);
      return;
    }
    if (e.target.value.startsWith("0")) {
      setItem([{ name: ["finance_details", index, name], value: null, errors: null }]);
      return;
    }
    const filtered = taxEdv.filter((a) => a.uuid === form.getFieldValue(["finance_details", index, "tax_id"]) && a.name);
    setItem([{ name: ["finance_details", index, "tax_id_value"], value: (e.target.value * (filtered?.[0]?.name ?? 0)) / 100, errors: null }]);
  };
  const handleCalcBillEdv = (e, val, index) => {
    if (val === undefined) {
      setItem([{ name: ["finance_details", index, "tax_id_value"], value: 0, errors: null }]);
    } else {
      let amount = form.getFieldValue(["finance_details", index, "amount"]) || 0;
      setItem([{ name: ["finance_details", index, "tax_id_value"], value: (amount * val.children[0]) / 100, errors: null }]);
    }
  };
  return (
    <>
      {details?.map(
        (detail, index) =>
          detail && (
            <Row key={index}>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item hidden name={["finance_details", index, "uuid"]} />
                    <Form.Item className="c-form-item" label="Məbləğ" name={["finance_details", index, "amount"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <Input type="number" onChange={(e) => calculateHandle(e, index, "amount")} className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label={
                        <span style={{ width: "330px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span>ƏDV</span>
                          <Switch
                            onChange={(val) => {
                              financeDetailSwich(val, index);
                            }}
                            size="small"
                            checked={details?.[index]?.is_checked}
                          />
                        </span>
                      }
                    >
                      {details?.[index]?.is_checked ? (
                        <Space size={0}>
                          <Form.Item
                            className="c-form-item"
                            name={["finance_details", index, "tax_id"]}
                            rules={[
                              {
                                required: true,
                                message: "ƏDV-dən azad!",
                              },
                            ]}
                          >
                            <Select onChange={(e, value) => handleCalcBillEdv(e, value, index)} className="c-select" allowClear showSearch placeholder="Seçim edin">
                              {taxEdv?.map((item, i) => (
                                <Option className="c-select-option" key={item.uuid} value={item.uuid}>
                                  {item.name} %
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            className="c-form-item"
                            name={["finance_details", index, "tax_id_value"]}
                            rules={[
                              {
                                required: false,
                                message: "ƏDV-dən azad!",
                              },
                            ]}
                          >
                            <Input disabled className="c-input" min="0" type="number" placeholder="Daxil edin..." />
                          </Form.Item>
                        </Space>
                      ) : (
                        <Space>
                          <b>
                            <i>ƏDV-dən azad!</i>
                          </b>
                          <Form.Item hidden name={["finance_details", index, "tax_id"]} />
                          <Form.Item hidden name={["finance_details", index, "tax_id_value"]} />
                        </Space>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      className="c-form-item"
                      label="Bank zəmanət məbləği"
                      name={["finance_details", index, "bank_guarantee_amount"]}
                      rules={[
                        {
                          required: false,
                          message: "Zəhmət olmasa daxil edin",
                        },
                      ]}
                    >
                      <Input className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      className="c-form-item"
                      label="Zəmanət verən bank"
                      name={["finance_details", index, "bank_guarantee_id"]}
                      rules={[
                        {
                          required: false,
                          message: "Zehmet olmasa secim edin",
                        },
                      ]}
                    >
                      <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {banks.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label="Bank zəmanətənən tarixi"
                      name={["finance_details", index, "bank_guarantee_date"]}
                      rules={[
                        {
                          required: false,
                          message: "Zehmet olmasa secim edin",
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%", height: "36px" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item label="Bank zəmanət müddəti">
                      <Space size={0}>
                        <Form.Item
                          className="c-form-item"
                          name={["finance_details", index, "duration_time_id"]}
                          rules={[
                            {
                              required: false,
                              message: "Zəhmət olmasa daxil edin",
                            },
                          ]}
                        >
                          <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                            {bankTime.map((a, i) => (
                              <Option className="c-select-option" key={i} value={a.uuid}>
                                {" "}
                                {a.name}{" "}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          className="c-form-item"
                          name={["finance_details", index, "bank_guarantee_date_duration"]}
                          rules={[
                            {
                              required: false,
                              message: "Zəhmət olmasa daxil edin",
                            },
                          ]}
                        >
                          <Input className="c-input" min="0" type="number" placeholder="Daxil edin..." />
                        </Form.Item>
                      </Space>
                    </Form.Item>
                  </Col>
                  {/* <Col
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
                        delete details[index];
                        setDetails([...details]);
                      }}
                    />
                  </Col> */}
                </Row>
              </Col>
            </Row>
          )
      )}
      {/* <Row gutter={14}>
        <Col span={24} align="middle">
          <Button icon={<PlusOutlined />} onClick={() => setDetails((prev) => [...prev, { is_checked: false }])} />
        </Col>
      </Row> */}
    </>
  );
};

export default Index;
