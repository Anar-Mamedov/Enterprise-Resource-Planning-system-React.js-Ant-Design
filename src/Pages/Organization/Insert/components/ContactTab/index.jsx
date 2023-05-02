import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Input, DatePicker, Button, Switch, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";
const { TextArea } = Input;
const { Option } = Select;

const Index = ({ bankTime, taxEdv, banks, setItem, form, loading, setLoading }) => {
  const [details, setDetails] = useState([{ isChecked: false }]);

  //*Piclist Start   ---------------------------------------------------------------------------------------
  const [contactTypes, setContactTypes] = useState([]);

  const [contactType, setContactType] = useState({});

  //*Piclist End   ---------------------------------------------------------------------------------------

  //! Piclists Api Start----------------------------------------------------------------------------------
  const getContactTypes = () => {
    setLoading(true);
    API.HumanResource.Picklist.EmployeeContactType.list().then((res) => {
      setLoading(false);
      setContactTypes([...res.data.data]);
    });
  };
  //! SetError Start--------------------------------------------------------------------------------------

  const handleContactTypeChange = (value, index) => {
    const key = contactTypes.find((type) => type.uuid === value).key;
    setContactType({ ...contactType, [index]: key });
    if (value) {
      setItem([{ name: ["contact", "contact_type", index, "contact_id"], value: value, errors: null }]);
    } else {
      setItem([{ name: ["contact", "contact_type", index, "contact_id"], value: null, errors: null }]);
    }
  };

  const handleContactValueChange = (value, index) => {
    if (value) {
      setItem([{ name: ["contact", "contact_type", index, "contact_value"], value: value, errors: null }]);
    } else {
      setItem([{ name: ["contact", "contact_type", index, "contact_value"], value: null, errors: null }]);
    }
  };

  useEffect(() => {
    getContactTypes();
  }, []);

  const getContactField = (index) => {
    if (index in contactType) {
      switch (contactType[index]) {
        case "email": {
          return (
            <Form.Item label="Email" name={["contact", "contact_type", index, "contact_value"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
              <Input className="c-input" placeholder="email" />
            </Form.Item>
          );
        }
        case "phone": {
          return (
            <Form.Item label="Telefon" name={["contact", "contact_type", index, "contact_value"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
              <Input className="c-input" placeholder="Telefon" />
            </Form.Item>
          );
        }
        case "address": {
          return (
            <Form.Item label="Address" name={["contact", "contact_type", index, "contact_value"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
              <TextArea rows={4} className="c-input" placeholder="Address" />
            </Form.Item>
          );
        }
        case "fax": {
          return (
            <Form.Item label="Fax" name={["contact", "contact_type", index, "contact_value"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
              <Input className="c-input" placeholder="Fax" />
            </Form.Item>
          );
        }
        case "landline": {
          return (
            <Form.Item label="Landline" name={["contact", "contact_type", index, "contact_value"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
              <Input className="c-input" placeholder="Landline" />
            </Form.Item>
          );
        }
        default: {
          return (
            <Form.Item label="             " name={["contact", "contact_type", index, "contact_value"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
              <Input className="c-input" placeholder="" />
            </Form.Item>
          );
        }
      }
    }
  };

  return (
    <>
      {details?.map(
        (detail, index) =>
          detail && (
            <Row>
              <Col span={24}>
                <Row gutter={14}>
                  {index === 0 ? (
                    <Col span={5}>
                      <Form.Item className="c-form-item" label="Etiket" name={["contact", "tag"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                        <Input className="c-input" placeholder="Daxil edin" />
                      </Form.Item>
                    </Col>
                  ) : (
                    <Col span={5}></Col>
                  )}
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Tip" name={["contact", "contact_type", index, "contact_id"]} rules={[{ required: false, message: "Zehmet olmasa secim edin" }]}>
                      <Select onChange={(value) => handleContactTypeChange(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {contactTypes.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>{getContactField(index)}</Col>
                  {/* Minus Button */}
                  <Col
                    span={5}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: 25,
                    }}>
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        delete details[index];
                        setDetails([...details]);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          )
      )}

      {/* Plus button */}
      <Row gutter={14}>
        <Col span={24} align="middle">
          <Button icon={<PlusOutlined />} onClick={() => setDetails((prev) => [...prev, { isChecked: false }])} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
