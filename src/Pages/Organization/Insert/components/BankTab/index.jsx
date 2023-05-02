import { Col, Form, Row, Select, Input, DatePicker, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import API from "../../../../../API";
const { Option } = Select;

const Index = ({ bankTime, setItem, form }) => {
  const [delivers, setDelivers] = useState([{ isChecked: false, bankBranchId: [], description: [] }]);
  const [bankList, setBankList] = useState([]);
  // const [branchList, setBrancList] = useState([]);
  // const [branchApi, setBranchApi] = useState([]);
  const [currencyApi, setCurrencyApi] = useState([]);
  const getBankList = (bankId = null, branchId = null, currencyId = null, index) => {
    form.setFieldValue(["bank", index, "bank_corr_branch_id"], null);
    let data = { bank: bankId, branch: branchId, currency: currencyId };
    API.Finance.BankGeneral.bankList(JSON.stringify(data)).then((res) => {
      // console.log(data);
      if (bankId !== null && branchId === null && currencyId === null) {
        delivers[index].description = res.data.data;
        setDelivers([...delivers]);
      } else if (bankId !== null && branchId !== null && currencyId !== null) {
        delivers[index].bankBranchId = res.data.data;
        setDelivers([...delivers]);
        console.log(res.data.data);
        form.setFieldValue(["bank", index, "bank_corr_branch_id"], res.data.data[0]?.bank_account_id);
      } else if (bankId === null && branchId === null && currencyId === null) {
        form.setFieldValue(["bank", index, "branch"], null);
        setBankList(res.data.data);
        delivers[index].description = [];
        setDelivers([...delivers]);
      }
    });
  };
  const getBankHandle = (value, index) => {
    form.setFieldValue(["bank", index, "branch"], null);

    // console.log(value, index);
    getBankList(value, null, null, index);
  };

  const selectCurrency = (value, index) => {
    let bankId = form.getFieldValue(["bank", index, "bank"]);
    let branchId = form.getFieldValue(["bank", index, "branch"]);
    // console.log(value, index);
    // console.log(bankId);
    getBankList(bankId, branchId, value, index);
  };
  const selectBranch = (value, index) => {
    let bankId = form.getFieldValue(["bank", index, "bank"]);
    let currencyId = form.getFieldValue(["bank", index, "currency"]);
    // console.log(value, index);
    // console.log(bankId);
    getBankList(bankId, value, currencyId, index);
  };

  // const getBankHandle = (value, index) => {
  //   setItem([{ name: ["bank", index, "branch"], value: null, errors: null }]);
  //   if (value) {
  //     API.Finance.BankGeneral.bankList({ bank: value }).then((res) => {
  //       delivers[index].description = res.data.data;
  //       setDelivers([...delivers]);
  //     });
  //   } else {
  //     delivers[index].description = [];
  //     setDelivers([...delivers]);
  //   }
  // };

  // const getBranchApi = () => {
  //   API.Finance.BankGeneral.bankList().then((res) => {
  //     setBranchApi(res.data.data);
  //   });
  // };

  console.log(delivers);
  const getCurrencyApi = () => {
    API.Finance.Picklist.getCurrencyList().then((res) => {
      setCurrencyApi(res.data.data);
    });
  };
  useEffect(() => {
    getBankList();
    // getBranchApi();
    getCurrencyApi();
  }, []);
  // console.log(branchList);
  return (
    <>
      {delivers?.map(
        (delive, index) =>
          delive && (
            <Row>
              <Col span={24}>
                <Row gutter={14}>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Bank" name={["bank", index, "bank"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select onChange={(value) => getBankHandle(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {bankList?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="Filial" name={["bank", index, "branch"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select onChange={(value) => selectBranch(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {/* {delivers?.[index].description.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))} */}
                        {/* {console.log(branchList?.[index])} */}
                        {delivers?.[index].description.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item className="c-form-item" label="Valyuta" name={["bank", index, "currency"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Select onChange={(value) => selectCurrency(value, index)} className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder="Secim edin">
                        {currencyApi?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.uuid}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item className="c-form-item" label="Bank müxbir hesabı" name={["bank", index, "bank_corr_branch_id"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      {/* <Input disabled className="c-input" placeholder="Daxil edin" /> */}
                      <Select disabled className="c-select" allowClear showSearch>
                        {delivers?.[index]?.bankBranchId?.map((a, i) => (
                          <Option className="c-select-option" key={i} value={a.bank_account_id}>
                            {a.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item className="c-form-item" label="IBAN" name={["bank", index, "iban"]} rules={[{ required: false, message: "Zehmet olmasa daxil edin" }]}>
                      <Input className="c-input" placeholder="Daxil edin" />
                    </Form.Item>
                  </Col>
                  <Col span={3} style={{ display: "flex", alignItems: "flex-end", paddingBottom: 25 }}>
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
          <Button icon={<PlusOutlined />} onClick={() => setDelivers((prev) => [...prev, { isChecked: false, bankBranchId: [], description: [] }])} />
        </Col>
      </Row>
    </>
  );
};

export default Index;
