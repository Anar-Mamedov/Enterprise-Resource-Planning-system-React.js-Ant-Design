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

const Index = ({ onClose, open, loading, setLoading, updateID, setUpdateID }) => {
  const [form] = Form.useForm();

  const [details, setDetails] = useState([]);
  const [adressTabs, setAdressTabs] = useState([{ isChecked: false, description: [] }]);
  const [ActivitysTab, setActivitysTab] = useState([{ isChecked: false, description: [] }]);
  const [delivers, setDelivers] = useState([]);

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

  const [contactType, setContactType] = useState({});

  const getShowApi = () => {
    if (updateID) {
      API.Finance.Companies.Organization.show(updateID).then((res) => {
        const showData = res?.data?.data;
        console.log(showData);
        setItem([{ name: "uuid", value: showData?.uuid, errors: null }]);
        setItem([{ name: "name_nat", value: showData?.name_nat, errors: null }]);
        setItem([{ name: "name_eng", value: showData?.name_eng, errors: null }]);
        setItem([{ name: "abb_name", value: showData?.abb_name, errors: null }]);
        setItem([{ name: "code", value: showData?.code, errors: null }]);
        setItem([{ name: "voen", value: showData?.voen, errors: null }]);
        setItem([{ name: "method_utilization_id", value: showData?.utilization_id?.uuid, errors: null }]);
        setItem([{ name: "method_calculation_id", value: showData?.calculation_id?.uuid, errors: null }]);
        setItem([{ name: "institution_type_id", value: showData?.institution_type?.uuid, errors: null }]);
        setItem([{ name: "registr_type_id", value: showData?.registr_type?.uuid, errors: null }]);
        setItem([{ name: "destination_type_id", value: showData?.destination_type?.uuid, errors: null }]);
        setItem([{ name: "tax_free", value: showData?.tax_free, errors: null }]);
        setDetails(showData?.contact);
        setAdressTabs(showData?.branch);
        setActivitysTab(showData?.activity);
        setDelivers(showData?.banks.map((bank) => ({ isChecked: false, id: bank.account.bank.uuid, branchId: bank.account.branch.uuid, bankBranchId: [], currencyId: bank.account.currency.uuid, description: [] })));

        let ct = {};

        showData?.contact?.forEach((contact, index) => {
          setItem([{ name: ["contact", "contact_type", [index], "uuid"], value: contact?.uuid, errors: null }]);
          setItem([{ name: ["contact", "tag"], value: contact?.tag, errors: null }]);
          setItem([{ name: ["contact", "contact_type", [index], "contact_id"], value: contact?.type[0].uuid, errors: null }]);
          setItem([{ name: ["contact", "contact_type", [index], "contact_value"], value: contact?.contact_value, errors: null }]);
          ct = {
            ...ct,
            [index]: contact?.type[0].key,
          };
        });

        setContactType(ct);

        showData?.branch?.forEach((value, index) => {
          console.log(value);
          setItem([{ name: ["branch", index, "uuid"], value: value?.uuid, errors: null }]);
          setItem([{ name: ["branch", index, "address", "city", "country"], value: value?.address[0].city.country.uuid, errors: null }]);
          setItem([{ name: ["branch", index, "address", "city_id"], value: value?.address[0].city.uuid, errors: null }]);
          setItem([{ name: ["branch", index, "address", "name_nat"], value: value?.address[0].name_nat, errors: null }]);
          setItem([{ name: ["branch", index, "zip_id"], value: value?.zip[0].uuid, errors: null }]);
        });
        showData?.activity?.forEach((value, index) => {
          setItem([{ name: ["activity", index, "uuid"], value: value?.uuid, errors: null }]);
          setItem([{ name: ["activity", index, "activision_type_id"], value: value?.activity_type[0].uuid, errors: null }]);
          value?.start_date && setItem([{ name: ["activity", index, "start_date"], value: dayjs(value?.start_date), errors: null }]);
          value?.end_date && setItem([{ name: ["activity", index, "end_date"], value: dayjs(value?.end_date), errors: null }]);
        });

        showData?.banks?.forEach((value, index) => {
          setItem([{ name: ["bank", [index], "uuid"], value: value?.uuid, errors: null }]);
          setItem([{ name: ["bank", [index], "bank"], value: value?.account.bank.uuid, errors: null }]);
          setItem([{ name: ["bank", [index], "branch"], value: value?.account.branch.uuid, errors: null }]);
          setItem([{ name: ["bank", [index], "currency"], value: value?.account.currency.uuid, errors: null }]);
          setItem([{ name: ["bank", [index], "bank_corr_branch_id"], value: value?.account.bank_corr.uuid, errors: null }]);
          setItem([{ name: ["bank", [index], "iban"], value: value?.iban, errors: null }]);
        });
      });
    }
  };

  const financeDetailSwich = (val) => {
    setItem([{ name: ["finance_details", "tax_id"], value: null, errors: null }]);
    setItem([{ name: ["finance_details", "tax_id_value"], value: null, errors: null }]);
    details.isChecked = val;
    setDetails([...details]);
    // form.getFieldValue(["finance_details", [index], "tax_id"]);
  };

  const handleNameChange = (e) => {
    setItem([{ name: ["name_eng"], value: e.target.value, errors: null }]);
  };

  const setItem = (value) => form.setFields(value);
  const Close = () => {
    onClose();
    setUpdateID(null);
    form.resetFields();
  };
  //! Store Finished Start--------------------------------------------------------------------------------
  const onFinish = (value) => {
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
      // const branch = [];
      // value?.branch?.forEach((item) => {
      //   delete item.name_id;
      // });
      // const activity = value.activity.map((a) => ({
      //   ...a,
      //   start_date: a?.start_date && dayjs(a?.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
      //   end_date: a?.end_date && dayjs(a?.end_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
      // }));

      const contact = {
        ...value?.contact,
        contact_type: value?.contact?.contact_type?.filter((item) => item !== undefined && item !== null),
      };

      const address = value?.address?.filter((item) => item !== undefined && item !== null);
      const bank = value?.bank?.filter((item) => item !== undefined && item !== null);

      value = {
        ...value,
        activity,
        // branch,
        contact,
        address,
        bank,
        tax_free: value?.tax_free ? 1 : 0,
      };

      console.log(value);
      // let newValue = Object.keys(value).reduce((acc, key) => {
      //   if (typeof value[key] === "undefined") {
      //     acc[key] = null;
      //   } else if (Array.isArray(value[key])) {
      //     acc[key] = value[key].map((obj) => {
      //       return Object.keys(obj).reduce((oAcc, objKey) => {
      //         if (typeof obj[objKey] === "undefined") {
      //           oAcc[objKey] = null;
      //         } else {
      //           oAcc[objKey] = obj[objKey];
      //         }
      //         return oAcc;
      //       }, {});
      //     });
      //   } else {
      //     acc[key] = value[key];
      //   }
      //   return acc;
      // }, {});

      // const convertToNull = (obj) => {
      //   for (let i in obj) {
      //     if (typeof obj[i] !== "object") obj[i] = obj[i] === undefined ? null : obj[i];
      //     else convertToNull(obj[i]);
      //   }
      //   return obj;
      // };
      const newValue = convertToNull(value);
      // console.log(newValue);
      API.Finance.Companies.Organization.update(updateID, newValue).then((res) => {
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
  //! uuid undefain covert to null
  const convertToNull = (obj) => {
    for (let i in obj) {
      if (typeof obj[i] !== "object") obj[i] = obj[i] === undefined ? null : obj[i];
      else convertToNull(obj[i]);
    }
    return obj;
  };
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
          <ContactTab contactType={contactType} setContactType={setContactType} details={details} setDetails={setDetails} bankTime={bankTime} taxEdv={taxEdv} banks={banks} setItem={setItem} form={form} setLoading={setLoading} />
        </>
      ),
    },
    {
      key: "2",
      label: isAddressTab ? <span style={{ color: "crimson" }}>Ünvan</span> : <span>Ünvan</span>,
      children: (
        <>
          <AddressTab adressTabs={adressTabs} setAdressTabs={setAdressTabs} form={form} setItem={setItem} setLoading={setLoading} />
        </>
      ),
    },
    {
      key: "3",
      label: isActivityTab ? <span style={{ color: "crimson" }}>Fəaliyyət</span> : <span>Fəaliyyət</span>,
      children: (
        <>
          <ActivityTab ActivitysTab={ActivitysTab} setActivitysTab={setActivitysTab} taxEdv={taxEdv} form={form} setItem={setItem} setLoading={setLoading} />
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
          <BankTab delivers={delivers} setDelivers={setDelivers} bankTime={bankTime} form={form} setItem={setItem} setLoading={setLoading} />
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

  useEffect(() => {
    getShowApi();
  }, [updateID]);
  useEffect(() => {
    console.log(form.getFieldsValue());
  }, []);
  return (
    <Drawer title="Düzəliş et" width="100%" onClose={Close} open={open} className="c-drawer" bodyStyle={{ paddingBottom: 100 }}>
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
                <Form.Item hidden name="uuid" />
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
            <Tabs destroyInactiveTabPane onChange={(key) => changeTabs(key)} animated={true} items={items} type="card" defaultActiveKey="1"></Tabs>
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
