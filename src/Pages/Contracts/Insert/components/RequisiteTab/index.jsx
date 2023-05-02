import { Col, Form, Row, Select, Input, DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import API from "../../../../../API";
const { Option } = Select;

const Index = () => {
  const [requisite, setRequisite] = useState([{}]);
  const [signerPerson, setSignerPerson] = useState([]);
  const getSignerPersonApi = () => {
    API.HumanResource.AdministrativeManagement.LaborContract.Form.list().then((res) => {
      if (res.data.status === 200) {
        res.data.data.forEach((res) => {
          const fullname = `${res?.employee?.name_eng} ${res?.employee?.surname_eng}`;
          signerPerson.push({ uuid: res?.uuid, name: fullname });
        });
        setSignerPerson(signerPerson);
      }
    });
  };
  useEffect(() => {
    getSignerPersonApi();
  }, []);
  console.log(requisite);
  return (
    <>
      {requisite?.map(
        (requis, index) =>
          requis && (
            <Row>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="İmzalayan şəxs" name={["contract_requisite", index, "signer_id"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {signerPerson.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label="Təşkilatın imza tarixi" name={["contract_requisite", index, "companies_signature_date"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <DatePicker style={{ width: "100%", height: "36px" }} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item label="Müqavilənin imza tarixi" name={["contract_requisite", index, "contract_signature_date"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <DatePicker style={{ width: "100%", height: "36px" }} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Əlaqəli Şəxs 1" name={["contract_requisite", index, "relevant_person1"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <Input className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item className="c-form-item" label="Əlaqəli Şəxs 2" name={["contract_requisite", index, "relevant_person2"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <Input className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={14}>
                  <Col span={10}>
                    <Form.Item className="c-form-item" label="Qeyd" name={["contract_requisite", index, "note"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <TextArea placeholder="Daxil edin" style={{ width: "100%", height: "80px" }} />
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
                        delete requisite[index];
                        setRequisite([...requisite]);
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
          <Button icon={<PlusOutlined />} onClick={() => setRequisite((prev) => [...prev, {}])} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
