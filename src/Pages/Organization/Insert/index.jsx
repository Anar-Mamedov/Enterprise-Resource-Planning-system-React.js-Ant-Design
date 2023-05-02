import React, { useEffect, useState } from "react";
import { Form, Drawer, Row, message, Divider, Button, Input, Col, Typography, Select, DatePicker, Tabs, Switch } from "antd";
import API from "../../../API";
import dayjs from "dayjs";
import Loader from "../../../Components/Loader";
import ContactTab from "./components/ContactTab";
import AddressTab from "./components/AddressTab";
import ActivityTab from "./components/ActivityTab";
import ManagementTab from "./components/ManagementTab";
import BankTab from "./components/BankTab";
import DocumentTab from "./components/DocumentTab";
const { Option } = Select;
const { Text } = Typography;

// change form.item lable position for switch end

const Index = ({ onClose, open, loading, setLoading }) => {
  const [form] = Form.useForm();

  const [bankTime, setBankTime] = useState([]);
  const [taxEdv, setTaxEdv] = useState([]);
  const [banks, setBanks] = useState([]);
  const [isAddressTab, setIsAddressTab] = useState(true);
  const [isActivityTab, setIsActivityTab] = useState(true);
  const [isManagementTab, setIsManagementTab] = useState(true);
  const [isBankTab, setIsBankTab] = useState(true);
  const [isDocumentTab, setIsDocumentTab] = useState(true);
  //*Piclist End   ---------------------------------------------------------------------------------------
  const [compMethodUtilization, setcompMethodUtilization] = useState([]);
  const [companiesMethodCalculations, setcompaniesMethodCalculations] = useState([]);
  const [institutionType, setinstitutionType] = useState([]);
  const [registryType, setregistryType] = useState([]);
  const [destinationType, setdestinationType] = useState([]);
  const [nameEng, setNameEng] = useState("");

  const [details, setDetails] = useState([{ isChecked: true }]);
  const financeDetailSwich = (val) => {
    setItem([{ name: ["finance_details", "tax_id"], value: null, errors: null }]);
    setItem([{ name: ["finance_details", "tax_id_value"], value: null, errors: null }]);
    details.isChecked = val;
    setDetails([...details]);
    // form.getFieldValue(["finance_details", index, "tax_id"]);
  };

  const handleNameChange = (e) => {
    setItem([{ name: ["name_eng"], value: e.target.value, errors: null }]);
  };

  const setItem = (value) => form.setFields(value);
  const Close = () => {
    onClose();
    form.resetFields();
  };
  //! Store Finished Start--------------------------------------------------------------------------------
  const onFinish = (value) => {
    console.log(value);
    if (!isAddressTab && !isActivityTab && !isManagementTab && !isBankTab && !isDocumentTab) {
      const activity = [];
      value?.activity?.forEach((item) => {
        if (item !== undefined) {
          activity.push({
            ...item,
            start_date: item?.start_date && dayjs(item?.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
            end_date: item?.end_date && dayjs(item?.end_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
          });
        }
      });

      const contact = {
        ...value?.contact,
        contact_type: value?.contact?.contact_type?.filter((item) => item !== undefined && item !== null),
      };

      const address = value?.address?.filter((item) => item !== undefined && item !== null);
      const bank = value?.bank?.filter((item) => item !== undefined && item !== null);

      value = {
        ...value,
        activity,
        contact,
        address,
        bank,
        tax_free: value?.tax_free ? 1 : 0,
        // finance_details: value?.finance_details?.map((item) => {
        //   return {
        //     ...item,
        //     bank_guarantee_date: item?.bank_guarantee_date && dayjs(item?.bank_guarantee_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        //   };
        // }),
      };
      console.log(value);
      API.Finance.Companies.Organization.store(value).then((res) => {
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

  //! SetError Start--------------------------------------------------------------------------------------
  const setFormError = (name, errors) => {
    name = name.split(".").map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
    form.setFields([{ name, errors }]);
  };
  //! SetError End ---------------------------------------------------------------------------------------

  const changeTabs = (key) => {
    if (key === "2") {
      setIsAddressTab(false);
    } else if (key === "3") {
      setIsActivityTab(false);
    } else if (key === "4") {
      setIsManagementTab(false);
    } else if (key === "5") {
      setIsBankTab(false);
    } else if (key === "6") {
      setIsDocumentTab(false);
    }
  };
  //! TABPANE INLINE START--------------------------------------------------------------------------------
  const items = [
    {
      key: "1",
      label: `Əlaqə`,
      children: (
        <>
          <ContactTab bankTime={bankTime} taxEdv={taxEdv} banks={banks} setItem={setItem} form={form} setLoading={setLoading} />
        </>
      ),
    },
    {
      key: "2",
      label: isAddressTab ? <span style={{ color: "crimson" }}>Ünvan</span> : <span>Ünvan</span>,
      children: (
        <>
          <AddressTab form={form} setItem={setItem} setLoading={setLoading} />
        </>
      ),
    },
    {
      key: "3",
      label: isActivityTab ? <span style={{ color: "crimson" }}>Fəaliyyət</span> : <span>Fəaliyyət</span>,
      children: (
        <>
          <ActivityTab taxEdv={taxEdv} form={form} setItem={setItem} setLoading={setLoading} />
        </>
      ),
    },
    {
      key: "4",
      label: isManagementTab ? <span style={{ color: "crimson" }}>Rəhbərlik</span> : <span>Rəhbərlik</span>,
      children: <>{/* <ManagementTab bankTime={bankTime} /> */}</>,
    },
    {
      key: "5",
      label: isBankTab ? <span style={{ color: "crimson" }}>Bank</span> : <span>Bank</span>,
      children: (
        <>
          <BankTab bankTime={bankTime} form={form} setItem={setItem} setLoading={setLoading} />
        </>
      ),
    },
    {
      key: "6",
      label: isDocumentTab ? <span style={{ color: "crimson" }}>Sənəd</span> : <span>Sənəd</span>,
      children: (
        <>
          <DocumentTab bankTime={bankTime} />
        </>
      ),
    },
  ];
  //! TABPANE INLINE END----------------------------------------------------------------------------------

  //! Piclists Api Start----------------------------------------------------------------------------------
  const getcompMethodUtilization = () => {
    setLoading(true);
    API.Finance.Picklist.CompaniesMethodUtilization.list().then((res) => {
      setLoading(false);
      setcompMethodUtilization([...res.data.data]);
    });
  };
  const getcompaniesMethodCalculations = () => {
    setLoading(true);
    API.Finance.Picklist.CompaniesMethodCalculations.list().then((res) => {
      setLoading(false);
      setcompaniesMethodCalculations([...res.data.data]);
    });
  };
  const getinstitutionType = () => {
    setLoading(true);
    API.Finance.Picklist.institutionType.list().then((res) => {
      setLoading(false);
      setinstitutionType([...res.data.data]);
    });
  };
  const getregistryType = () => {
    setLoading(true);
    API.Finance.Picklist.registryType.list().then((res) => {
      setLoading(false);
      setregistryType([...res.data.data]);
    });
  };
  const getdestinationType = () => {
    setLoading(true);
    API.Finance.Picklist.destinationType.list().then((res) => {
      setLoading(false);
      setdestinationType([...res.data.data]);
    });
  };
  //! SetError Start--------------------------------------------------------------------------------------

  //*--------------
  useEffect(() => {
    getcompMethodUtilization();
    getcompaniesMethodCalculations();
    getinstitutionType();
    getregistryType();
    getdestinationType();
  }, []);
  return (
    <Drawer title="Yeni" width="100%" onClose={Close} open={open} className="c-drawer" bodyStyle={{ paddingBottom: 100 }}>
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row>
          <Col span={24}>
            <Row style={{ marginBottom: "1rem" }}>
              <Col>
                <Text type="success">Əsas məlumatlar</Text>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={4}>
                <Form.Item label="Adı" name="name_nat" rules={[{ required: true, message: "Adı daxil edin!" }]}>
                  <Input onChange={(e) => handleNameChange(e)} className="c-input" placeholder={"Daxil edin"} />
                </Form.Item>
                <Form.Item hidden label="Adı eng" name="name_eng" rules={[{ required: false, message: "Adı daxil edin!" }]}>
                  <Input className="c-input" placeholder={"Daxil edin"} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Qısa adı" name="abb_name" rules={[{ required: true, message: "Qısa adı daxil edin!" }]}>
                  <Input className="c-input" placeholder={"Daxil edin"} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Kod" name="code" rules={[{ required: true, message: "Kodu daxil edin!" }]}>
                  <Input type="number" className="c-input" placeholder={"Daxil edin"} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Vöen" name="voen" rules={[{ required: true, message: "Vöen daxil edin!" }]}>
                  <Input type="number" className="c-input" placeholder={"Daxil edin"} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className="c-form-item" label="Mal-material silinmə metodu" name="method_utilization_id" rules={[{ required: false, message: "Seçim edin" }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={"Seçim edin"}>
                    {compMethodUtilization?.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className="c-form-item" label="Hesablama metodu" name="method_calculation_id" rules={[{ required: false, message: "Seçim edin" }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={"Seçim edin"}>
                    {companiesMethodCalculations?.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={4}>
                <Form.Item className="c-form-item" label="Müəssisə növü" name="institution_type_id" rules={[{ required: false, message: "Seçim edin" }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={"Seçim edin"}>
                    {institutionType?.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className="c-form-item" label="Müəssisə tipi" name="registr_type_id" rules={[{ required: false, message: "Seçim edin" }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={"Seçim edin"}>
                    {registryType?.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className="c-form-item" label="Təyinat" name="destination_type_id" rules={[{ required: false, message: "Seçim edin" }]}>
                  <Select className="c-select" allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? "").includes(input.toLowerCase())} placeholder={"Seçim edin"}>
                    {destinationType?.map((a) => (
                      <Option className="c-select-option" key={a.uuid} value={a.uuid}>
                        {a.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={4}>
                <span>ƏDV haqqında məlumat:</span>
                <Form.Item className="c-form-item" valuePropName="checked" label="ƏDV-dən azad:" name="tax_free" rules={[{ required: false, message: "Seçim edin" }]}>
                  <Switch style={{ position: "absolute", marginTop: "-42px", marginLeft: "111px" }} size="small" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
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
