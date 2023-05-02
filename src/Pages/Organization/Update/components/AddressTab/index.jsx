import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Input, Button, Switch, Space, Typography, Divider } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";

const { Option } = Select;

const Index = ({ taxEdv, form, setItem, adressTabs, setAdressTabs }) => {
  const [countryCategory, setCountryCategory] = useState([]);
  const [cityCategory, setCityCategory] = useState({});
  const [zipCategory, setZipCategory] = useState({});
  const [predmet, setpredmet] = useState({});

  const [uniqType, setUniqType] = useState([]);
  const getCountryCategory = () => {
    API.Com.Country.list().then((res) => {
      setCountryCategory(res.data.data);
    });
  };
  const getCountryHandle = (value, index) => {
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
  }, [adressTabs]);

  useEffect(() => {
    adressTabs.forEach((item, index) => {
      if (item?.address) {
        getCountryHandle(item.address[0].city.country.uuid, index);
        getCityHandle(item.address[0].city.uuid, index);
      }
    });
  }, [adressTabs]);

  return (
    <>
      {adressTabs?.map(
        (adressTab, index) =>
          adressTab && (
            <Row key={index}>
              <Col span={24}>
                <Row gutter={14}>
                  {/* ["branch", "name_id"] */}
                  <Col span={5}>
                    <Form.Item hidden name={["branch", index, "uuid"]} />
                    {/* <Form.Item hidden name={["branch", index, "address", "uuid"]} /> */}
                    <Form.Item className="c-form-item" label="Ölkə" name={["branch", index, "address", "city", "country"]} rules={[{ required: false, message: "Ölkə seçin" }]}>
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
                    <Form.Item className="c-form-item" label="Şəhər" name={["branch", index, "address", "city_id"]} rules={[{ required: false, message: "Şəhər seçin" }]}>
                      <Select onChange={(value) => getCityHandle(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {cityCategory?.[index]?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item className="c-form-item" label="Filial" name={["branch", index, "name_id"]} rules={[{ required: false, message: "Seçim edin" }]}>
                      <Select
                        placeholder={"Seçim edin"}
                        dropdownRender={(menu) => (
                          <>
                            {menu}
                            <Form>
                              <Row gutter={12}>
                                <Col span={18}>
                                  <Form.Item
                                    name="name"
                                    rules={[
                                      {
                                        required: false,
                                        message: "Please enter item",
                                      },
                                    ]}>
                                    <Input placeholder="Please enter item" />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Button htmlType="submit" block={true} icon={<PlusOutlined />} />
                                </Col>
                              </Row>
                            </Form>
                          </>
                        )}>
                        {predmet?.[index]?.map((pred, index) => (
                          <Option className="c-select-option" key={index} value={pred?.uuid}>
                            {pred?.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Ünvan" name={["branch", index, "address", "name_nat"]} rules={[{ required: false, message: "Ünvanı daxil edin" }]}>
                      <Input className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Poçt indeksi" name={["branch", index, "zip_id"]} rules={[{ required: false, message: "Indeksi seçin" }]}>
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
