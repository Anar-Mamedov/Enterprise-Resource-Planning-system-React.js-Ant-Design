import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Input, Button, Switch, Space, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";
let valArrTotalAmount = [];
let valArrEDVAmount = [];
let sumTotalAmount;
let sumEDVAmount;
const { Option } = Select;
const { Text } = Typography;

const Index = ({ taxEdv, form, setItem }) => {
  const [totalEdvAmount, setTotalEdvAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [detailstab, setDetailstab] = useState([{ isChecked: false, description: [] }]);

  const [productCategory, setProductCategory] = useState([]);
  const [uniqType, setUniqType] = useState([]);
  const getProductCategory = () => {
    API.Warehouse.productAttribute.list().then((res) => {
      setProductCategory(res.data.data);
    });
  };
  const getTesnifatHandle = (value, index) => {
    setItem([{ name: ["contract_details", index, "description_id"], value: null, errors: null }]);
    API.Warehouse.productAtributeValue.crossCombinations({ product_id: value }).then((res) => {
      detailstab[index].description = res.data.data;
      setDetailstab([...detailstab]);
    });
  };

  //! CalculateFunc Start---------------------------------------------------------------------------------
  const calculateFunc = (e, name, index) => {
    if (parseInt(e.target.value) < 0) {
      setItem([{ name: ["contract_details", index, name], value: null, errors: null }]);
    } else if (e.target.value.startsWith("0")) {
      setItem([{ name: ["contract_details", index, name], value: null, errors: null }]);
    }
    // //?---------------------------------------------------
    let quantity = form.getFieldValue(["contract_details", index, "quantity"]) || 0;
    let price = form.getFieldValue(["contract_details", index, "amount"]) || 0;
    if (quantity === 0 || price === 0) {
      setItem([{ name: ["contract_details", index, "amountUI"], value: 0, errors: null }]);
      setItem([{ name: ["contract_details", index, "tax_id_value"], value: 0, errors: null }]);
    }
    if (quantity || price) {
      setItem([{ name: ["contract_details", index, "amountUI"], value: quantity * price, errors: null }]);
      if (form.getFieldValue(["contract_details", index, "tax_id"])) {
        let cCalcAmount = form.getFieldValue(["contract_details", index, "amountUI"]);
        const filtered = taxEdv.filter((a) => a.uuid === form.getFieldValue(["contract_details", index, "tax_id"]) && a.name);
        let resCalc = (cCalcAmount * filtered[0]?.name) / 100;
        setItem([{ name: ["contract_details", index, "tax_id_value"], value: resCalc, errors: null }]);
      } else {
        setItem([{ name: ["contract_details", index, "tax_id_value"], value: 0, errors: null }]);
      }
    }
    detailstab.forEach((val, index) => {
      if (val) {
        valArrTotalAmount[index] = form.getFieldValue(["contract_details", index, "amountUI"]);
        valArrEDVAmount[index] = form.getFieldValue(["contract_details", index, "tax_id_value"]);
      }
    });
    sumTotalAmount = valArrTotalAmount.filter((a) => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    sumEDVAmount = valArrEDVAmount.filter((a) => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalAmount(sumTotalAmount);
    setTotalEdvAmount(sumEDVAmount);
  };
  const handleCalcBillEDVAmount = (_, val, index) => {
    if (val === undefined) {
      setItem([{ name: ["contract_details", index, "tax_id_value"], value: 0, errors: null }]);
    } else {
      let t = form.getFieldValue(["contract_details", index, "amountUI"]) || 0;
      setItem([
        {
          name: ["contract_details", index, "tax_id_value"],
          value: (val.children[0] * t) / 100,
          errors: null,
        },
      ]);
    }
    detailstab.forEach((val, index) => {
      if (val) {
        valArrEDVAmount[index] = form.getFieldValue(["contract_details", index, "tax_id_value"]);
      }
    });
    sumEDVAmount = valArrEDVAmount.filter((a) => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalEdvAmount(sumEDVAmount);
  };
  const getItemUnit = () => {
    API.Warehouse.ItemUnit.list().then((res) => {
      setUniqType(res.data.data);
    });
  };
  //! CalculateFunc End-----------------------------------------------------------------------------------
  useEffect(() => {
    getProductCategory();
    getItemUnit();
  }, []);
  return (
    <>
      {detailstab?.map(
        (detailtab, index) =>
          detailtab && (
            <Row>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Məhsul" name={["contract_details", index, "product_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select onChange={(value) => getTesnifatHandle(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {productCategory?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Təsnifat" name={["contract_details", index, "description_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {detailstab?.[index].description.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Ölçü vahidi" name={["contract_details", index, "unit_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {uniqType?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Miqdar" name={["contract_details", index, "quantity"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Input type="number" onChange={(e) => calculateFunc(e, "quantity", index)} className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item className="c-form-item" label="Qiymet" name={["contract_details", index, "amount"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Input type="number" onChange={(e) => calculateFunc(e, "amount", index)} className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Məblağ" name={["contract_details", index, "amountUI"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Input disabled className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item
                      label={
                        <span
                          style={{
                            width: "330px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}>
                          <span>ƏDV</span>
                          <Switch
                            onChange={(val) => {
                              sumEDVAmount = valArrEDVAmount.filter((a) => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                              setTotalEdvAmount(sumEDVAmount);
                              if (val) {
                                setItem([
                                  {
                                    name: ["contract_details", index, "tax_id"],
                                    value: null,
                                    errors: null,
                                  },
                                ]);
                                setItem([
                                  {
                                    name: ["contract_details", index, "tax_id_value"],
                                    value: null,
                                    errors: null,
                                  },
                                ]);
                              }
                              detailstab[index].isChecked = val;
                              setDetailstab([...detailstab]);
                            }}
                            size="small"
                            checked={detailstab?.[index]?.isChecked}
                          />
                        </span>
                      }>
                      {detailstab?.[index]?.isChecked ? (
                        <Space size={0}>
                          <Form.Item className="c-form-item" name={["contract_details", index, "tax_id"]} rules={[{ required: true, message: "ƏDV-dən azad!" }]}>
                            <Select className="c-select" allowClear onChange={(e, a) => handleCalcBillEDVAmount(e, a, index)} showSearch placeholder="Seçim edin">
                              {taxEdv?.map((item, i) => (
                                <Option className="c-select-option" key={item.uuid} value={item.uuid}>
                                  {item.name} %
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item className="c-form-item" name={["contract_details", index, "tax_id_value"]} rules={[{ required: false, message: "ƏDV-dən azad!" }]}>
                            <Input disabled className="c-input" min="0" type="number" placeholder="Daxil edin..." />
                          </Form.Item>
                        </Space>
                      ) : (
                        <Space>
                          <b>
                            {" "}
                            <i>ƏDV-dən azad!</i>{" "}
                          </b>
                          <Form.Item hidden name={["contract_details", index, "tax_id"]} />
                          <Form.Item hidden name={["contract_details", index, "tax_id_value"]} />
                        </Space>
                      )}
                    </Form.Item>
                  </Col>
                  <Col
                    span={5}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: 15,
                    }}>
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        delete detailstab[index];
                        setDetailstab([...detailstab]);
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
          <Button icon={<PlusOutlined />} onClick={() => setDetailstab((prev) => [...prev, { isChecked: false, description: [] }])} />
        </Col>
      </Row>
      <Space>
        <Text>Toplam Məbləğ: {totalAmount.toFixed(2)}</Text>
        <Text style={{ margin: "0 2rem" }}>Toplam ƏDV Məbləği: {totalEdvAmount.toFixed(2)}</Text>
        <Text>Toplam Vergi Daxili Məbləğ: {(totalAmount + totalEdvAmount).toFixed(2)}</Text>
      </Space>
    </>
  );
};

export default Index;
