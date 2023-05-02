import React, { useEffect, useState } from "react";
import { Form, Drawer, Row, message, Divider, Button, Input, Col, Typography, Select, DatePicker, Tabs, Collapse, Space, Card, Switch } from "antd";
import { Languages } from "../../../Config";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import API from "../../../API";
import dayjs from "dayjs";
import Loader from "../../../Components/Loader";
import FinancialDetailsTab from "./components/FinancialDetailsTab/";
import RequisiteTab from "./components/RequisiteTab/";
import DeliveryTab from "./components/DeliveryTab/";
import DetailsTab from "./components/DetailsTab/";
const { Option } = Select;
const { Text } = Typography;
const innerText = Languages.SelectLanguage("InvoiceContract");

const Index = ({ onClose, open, loading, setLoading }) => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  //*Piclist Start ---------------------------------------------------------------------------------------
  const [organization, setOrganization] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [currencyType, setCurrencyType] = useState([]);
  const [predmet, setPredmet] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [bankTime, setBankTime] = useState([]);
  const [taxEdv, setTaxEdv] = useState([]);
  const [banks, setBanks] = useState([]);
  const [isRekvizit, setIsRekvizit] = useState(true);
  const [isDetails, setIsDetails] = useState(true);
  const [isDelivery, setIsDelivery] = useState(true);
  //*Piclist End   ---------------------------------------------------------------------------------------
  //! SetItem Function Start------------------------------------------------------------------------------
  const setItem = (value) => form.setFields(value);
  //! SetItem Function End--------------------------------------------------------------------------------
  //! Clear Cache Function Start--------------------------------------------------------------------------
  const Close = () => {
    onClose();
    form.resetFields();
  };
  //! Clear Cache Function End----------------------------------------------------------------------------
  //! Store Finished Start--------------------------------------------------------------------------------
  const onFinish = (value) => {
    if (!isRekvizit && !isDetails && !isDelivery) {
      value = {
        ...value,
        contract_date: value?.contract_date && dayjs(value?.contract_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        start_date: value?.start_date && dayjs(value?.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        end_date: value?.end_date && dayjs(value?.end_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        contract_requisite: value?.contract_requisite?.map((item) => {
          return {
            ...item,
            companies_signature_date: item?.companies_signature_date && dayjs(item?.companies_signature_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
            contract_signature_date: item?.contract_signature_date && dayjs(item?.contract_signature_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
          };
        }),
        contract_delivery: value?.contract_delivery?.map((item) => {
          return {
            ...item,
            date: item?.date && dayjs(item?.date, "YYYY-MM-DD").format("YYYY-MM-DD"),
          };
        }),
        finance_details: {
          ...value.finance_details,
          bank_guarantee_date: value.finance_details?.bank_guarantee_date && dayjs(value.finance_details?.bank_guarantee_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        },
      };
      API.Procurement.Contracts.Contract.store(value).then((res) => {
        setLoading(true);
        if (res.status === 400) {
          setLoading(false);
          const messages = res.data.data;
          for (let key in messages) setFormError(key, messages[key]);
        } else {
          setLoading(false);
          Close();
        }
      });
    } else {
      message.error("Məlumatlar natamamdır!");
    }
  };
  //! Store Finished End----------------------------------------------------------------------------------
  //! Store Finished Failed Start------------------------------------------------------------------------
  const onFinishFailed = (errorInfo) => {
    message.error("Məlumatlar natamamdır!");
  };
  //! Store Finished Failed End--------------------------------------------------------------------------
  //! Predmet Store Start---------------------------------------------------------------------------------
  const addSuccess = (value) => {
    setLoading(true);
    API.Procurement.ContractPredment.store(value).then((res) => {
      if (res.status === 201) {
        setLoading(false);
        predmet.push(res.data.data);
        setPredmet([...predmet]);
        addForm.setFields([{ name: "name", value: null, errors: null }]);
      }
    });
  };
  //! Predmet Store End-----------------------------------------------------------------------------------
  //! Piclists Api Start----------------------------------------------------------------------------------
  const getOrganizationList = () => {
    setLoading(true);
    API.Finance.Organization.list().then((res) => {
      setLoading(false);
      setOrganization([...res.data.data]);
    });
  };
  const getSuppliers = () => {
    setLoading(true);
    API.Procurement.Suppliers.list().then((res) => {
      setLoading(false);
      setSuppliers([...res.data.data]);
    });
  };
  const getCurrencyType = () => {
    setLoading(true);
    API.Finance.CurrencyType.list().then((res) => {
      setLoading(false);
      setCurrencyType([...res.data.data]);
    });
  };
  const getPredmetType = () => {
    setLoading(true);
    API.Procurement.ContractPredment.list().then((res) => {
      setLoading(false);
      setPredmet([...res.data.data]);
    });
  };
  const getContractType = () => {
    setLoading(true);
    API.Procurement.Picklist.contractType().then((res) => {
      setLoading(false);
      setContractType([...res.data.data]);
    });
  };
  const getPaymentType = () => {
    setLoading(true);
    API.Procurement.Picklist.contractPayment().then((res) => {
      setLoading(false);
      setPaymentType([...res.data.data]);
    });
  };
  const getBankTime = () => {
    setLoading(true);
    API.Finance.Picklist.time().then((res) => {
      setLoading(false);
      setBankTime(res.data.data);
    });
  };
  const getTaxEdv = () => {
    setLoading(true);
    API.Finance.Picklist.tax().then((res) => {
      setLoading(false);
      setTaxEdv(res.data.data);
    });
  };
  const getBanks = () => {
    setLoading(true);
    API.Finance.BankGeneral.bankList().then((res) => {
      setLoading(false);
      setBanks(res.data.data);
    });
  };
  //! SetError Start--------------------------------------------------------------------------------------
  const setFormError = (name, errors) => {
    name = name.split(".").map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
    form.setFields([{ name, errors }]);
  };
  //! SetError End ---------------------------------------------------------------------------------------
  //*--------------
  const changeTabs = (key) => {
    if (key === "2") {
      setIsRekvizit(false);
    } else if (key === "3") {
      setIsDetails(false);
    } else if (key === "4") {
      setIsDelivery(false);
    }
  };
  //! TABPANE INLINE START--------------------------------------------------------------------------------
  const items = [
    {
      key: "1",
      label: `Maliyyə detalları`,
      children: (
        <>
          <FinancialDetailsTab bankTime={bankTime} taxEdv={taxEdv} banks={banks} setItem={setItem} form={form} />
        </>
      ),
    },
    {
      key: "2",
      label: isRekvizit ? <span style={{ color: "crimson" }}>Rekvizit</span> : <span>Rekvizit</span>,
      children: (
        <>
          <RequisiteTab />
        </>
      ),
    },
    {
      key: "3",
      label: isDetails ? <span style={{ color: "crimson" }}>Detallar</span> : <span>Detallar</span>,
      children: (
        <>
          <DetailsTab taxEdv={taxEdv} form={form} setItem={setItem} />
        </>
      ),
    },
    {
      key: "4",
      label: isDelivery ? <span style={{ color: "crimson" }}>Çatdırılma</span> : <span>Çatdırılma</span>,
      children: (
        <>
          <DeliveryTab bankTime={bankTime} />
        </>
      ),
    },
  ];
  //! TABPANE INLINE END----------------------------------------------------------------------------------
  //*--------------
  useEffect(() => {
    getOrganizationList();
    getSuppliers();
    getCurrencyType();
    getPredmetType();
    getContractType();
    getBankTime();
    getTaxEdv();
    getPaymentType();
    getBanks();
  }, []);
  return (
    <Drawer title="Yeni" width="100%" onClose={Close} open={open} className="c-drawer" bodyStyle={{ paddingBottom: 100 }}>
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row>
          <Col span={24}>
            <Row style={{ marginBottom: "1rem" }}>
              {" "}
              <Col>
                <Text type="success">Əsas məlumatlar</Text>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Təşkilat" name="company_id" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className="c-select" allowClear showSearch placeholder={innerText.select_placeholder} filterOption={(input, option) => (option?.children?.toLowerCase() ?? "")?.includes(input?.toLowerCase())}>
                    {organization.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Kontragent" name="supplier_id" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className="c-select" allowClear showSearch placeholder={innerText.select_placeholder} filterOption={(input, option) => (option?.children?.toLowerCase() ?? "")?.includes(input?.toLowerCase())}>
                    {suppliers.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Növ" name="type_id" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={innerText.select_placeholder}>
                    {contractType?.map((contract, index) => (
                      <Option key={index} value={contract?.uuid}>
                        {contract?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Valyuta" name="currency_id" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={innerText.select_placeholder}>
                    {currencyType?.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className="c-form-item" label="Nömrə" name="number" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Input className="c-input" placeholder={innerText.input_placeholder} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Tarix" name="contract_date" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <DatePicker style={{ width: "100%", height: "36px" }} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Predmet" name="predment_id" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select
                    className="c-select"
                    allowClear
                    showSearch
                    placeholder={innerText.select_placeholder}
                    filterOption={(input, option) => (option?.children?.toLowerCase() ?? "")?.includes(input?.toLowerCase())}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider />
                        <Form form={addForm} onFinish={addSuccess}>
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
                    {predmet?.map((pred, index) => (
                      <Option className="c-select-option" key={index} value={pred?.uuid}>
                        {pred?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className="c-form-item" label="Ödəniş növü" name="payment_type_id" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={innerText.select_placeholder}>
                    {paymentType?.map((contract, index) => (
                      <Option className="c-select-option" key={index} value={contract?.uuid}>
                        {contract?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label="Başlama tarixi" name="start_date" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <DatePicker style={{ width: "100%", height: "36px" }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Bitmə tarixi" name="end_date" rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <DatePicker style={{ width: "100%", height: "36px" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Tabs onChange={(key) => changeTabs(key)} animated={true} items={items} type="card" defaultActiveKey="1"></Tabs>
          </Col>
        </Row>
        <Row align="end" className="fixed-submit-buttons">
          <Button className="c-btn c-btn--primary" type="primary" htmlType="submit">
            Yadda saxla
          </Button>
          <Button onClick={Close} className="c-btn c-btn--secondary">
            Bağla
          </Button>
        </Row>
      </Form>
      <Loader loading={loading} />
    </Drawer>
  );
};

export default Index;
