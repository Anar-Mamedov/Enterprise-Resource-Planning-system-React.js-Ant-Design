import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Input, Button, Switch, Space, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";

const { Option } = Select;

const Index = ({ taxEdv, form, setItem }) => {
  const [adressTabs, setAdressTabs] = useState([{ isChecked: false, description: [] }]);

  const [countryCategory, setCountryCategory] = useState([]);
  const [cityCategory, setCityCategory] = useState({});
  const [zipCategory, setZipCategory] = useState({});

  const [uniqType, setUniqType] = useState([]);
  const getCountryCategory = () => {
    API.Com.Country.list().then((res) => {
      setCountryCategory(res.data.data);
    });
  };
  const getCountryHandle = (value, index) => {
    setItem([{ name: ["address", index, "name_id"], value: null, errors: null }]);
    setItem([{ name: ["address", index, "city_id"], value: null, errors: null }]);
    setItem([{ name: ["address", index, "zip_id"], value: null, errors: null }]);

    setCityCategory({ ...cityCategory, [index]: [] });
    setZipCategory({ ...zipCategory, [index]: [] });

    if (value) {
      API.Com.City.list({ country_id: value }).then((res) => {
        form.setFieldValue(["address", index, "name_id"], value);
        setCityCategory({ ...cityCategory, [index]: res.data.data });
      });
    } else {
      form.setFieldValue(["address", index, "name_id"], null);
      setCityCategory({ ...cityCategory, [index]: [] });
    }
  };

  const getCityHandle = (value, index) => {
    setItem([{ name: ["address", index, "city_id"], value: null, errors: null }]);
    setItem([{ name: ["address", index, "zip_id"], value: null, errors: null }]);

    setZipCategory({ ...zipCategory, [index]: [] });

    if (value) {
      API.Com.ZipCode.list({ city_id: value }).then((res) => {
        form.setFieldValue(["address", index, "city_id"], value);
        setZipCategory({ ...zipCategory, [index]: res.data.data });
      });
    } else {
      form.setFieldValue(["address", index, "city_id"], null);
      setZipCategory({ ...zipCategory, [index]: [] });
    }
  };

  // const getItemUnit = () => {
  //   API.Com.ZipCode.list().then((res) => {
  //     setUniqType(res.data.data);
  //   });
  // };
  useEffect(() => {
    getCountryCategory();
    // getItemUnit();
  }, []);
  return (
    <>
      {adressTabs?.map(
        (adressTab, index) =>
          adressTab && (
            <Row>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Ölkə" name={["address", index, "name_id"]} rules={[{ required: false, message: "Ölkə seçin" }]}>
                      <Select onChange={(value) => getCountryHandle(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {countryCategory?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Şəhər" name={["address", index, "city_id"]} rules={[{ required: false, message: "Şəhər seçin" }]}>
                      <Select onChange={(value) => getCityHandle(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {cityCategory?.[index]?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Ünvan" name={["address", index, "name_nat"]} rules={[{ required: false, message: "Ünvanı daxil edin" }]}>
                      <Input className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Poçt indeksi" name={["address", index, "zip_id"]} rules={[{ required: false, message: "Indeksi seçin" }]}>
                      <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {zipCategory?.[index]?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    span={4}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      paddingBottom: 25,
                    }}>
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        delete adressTabs[index];
                        setAdressTabs([...adressTabs]);
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
          <Button icon={<PlusOutlined />} onClick={() => setAdressTabs((prev) => [...prev, { isChecked: false, description: [] }])} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
