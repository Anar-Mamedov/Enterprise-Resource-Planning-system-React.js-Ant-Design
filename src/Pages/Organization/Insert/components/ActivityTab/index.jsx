import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Button, DatePicker } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";
const { Option } = Select;

const Index = ({ taxEdv, form, setItem, loading, setLoading }) => {
  const [totalEdvAmount, setTotalEdvAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [ActivitysTab, setActivitysTab] = useState([{ isChecked: false, description: [] }]);

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
      ActivitysTab[index].description = res.data.data;
      setActivitysTab([...ActivitysTab]);
    });
  };
  const getItemUnit = () => {
    API.Warehouse.ItemUnit.list().then((res) => {
      setUniqType(res.data.data);
    });
  };
  //*Piclist Start   ---------------------------------------------------------------------------------------
  const [activeType, setactiveType] = useState([]);

  //*Piclist End   ---------------------------------------------------------------------------------------

  //! Piclists Api Start----------------------------------------------------------------------------------
  const getactiveType = () => {
    setLoading(true);
    API.Finance.Picklist.activeType.list().then((res) => {
      setLoading(false);
      setactiveType([...res.data.data]);
    });
  };
  //! SetError Start--------------------------------------------------------------------------------------

  useEffect(() => {
    getProductCategory();
    getItemUnit();
    getactiveType();
  }, []);
  return (
    <>
      {ActivitysTab?.map(
        (ActivityTab, index) =>
          ActivityTab && (
            <Row>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Fəaliyyət növü" name={["activity", index, "activision_type_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select onChange={(value) => getTesnifatHandle(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {activeType?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Fəaliyyətin başlama tarixi" name={["activity", index, "start_date"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <DatePicker style={{ width: "100%", height: "36px" }} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Fəaliyyətin bitmə tarixi" name={["activity", index, "end_date"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <DatePicker style={{ width: "100%", height: "36px" }} />
                    </Form.Item>
                  </Col>
                  <Col
                    span={5}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: "25px",
                    }}
                  >
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        delete ActivitysTab[index];
                        setActivitysTab([...ActivitysTab]);
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
          <Button icon={<PlusOutlined />} onClick={() => setActivitysTab((prev) => [...prev, { isChecked: false, description: [] }])} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
