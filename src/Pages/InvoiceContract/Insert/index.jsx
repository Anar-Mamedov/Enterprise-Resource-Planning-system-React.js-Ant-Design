import React, { useEffect, useState } from 'react';
import { Form, Drawer, Row, message, Divider, Button, Input, Col, Typography, Select, DatePicker, Tabs, Collapse, Space, Card, Switch } from 'antd';
import { Languages } from '../../../Config';
import { PlusOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import API from '../../../API';
import dayjs from 'dayjs';
import Loader from '../../../Components/Loader';
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
let valArrTotalAmount = [];
let valArrEDVAmount = [];
let sumTotalAmount;
let sumEDVAmount;
const innerText = Languages.SelectLanguage("InvoiceContract");

const Index = ({ onClose, open, loading, setLoading }) => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [tabInfoPanel, setTabInfoPanel] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalEdvAmount, setTotalEdvAmount] = useState(0);
  const [collapseKey, setCollapseKey] = useState(0);
  //*Piclist Start ---------------------------------------------------------------------------------------
  const [organization, setOrganization] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [currencyType, setCurrencyType] = useState([]);
  const [predmet, setPredmet] = useState([]);
  const [contractType, setContractType] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [bankTime, setBankTime] = useState([]);
  const [taxEdv, setTaxEdv] = useState([]);
  const [itemUnit, setItemUnit] = useState([]);
  const [banks, setBanks] = useState([]);
  const [products, setProducts] = useState([]);
  const [fromApiBtns, setFromApiBtns] = useState([]);
  //*Piclist End   ---------------------------------------------------------------------------------------
  //! SetItem Function Start------------------------------------------------------------------------------
  const setItem = (value) => form.setFields(value);
  //! SetItem Function End--------------------------------------------------------------------------------
  //*--------------
  //! Clear Cache Function Start--------------------------------------------------------------------------
  const Close = () => {
    onClose();
    setTabInfoPanel([])
    form.resetFields()
    setTotalAmount(0)
    setTotalEdvAmount(0)
  };
  //! Clear Cache Function End----------------------------------------------------------------------------
  //*--------------
  //! Store Finished Start--------------------------------------------------------------------------------
  const onFinish = (value) => {
    const isReqCollapse = tabInfoPanel?.filter(a => a)?.every(v => !v?.collapse)
    if (isReqCollapse) {
      value = {
        ...value,
        contract_date: value?.contract_date && dayjs(value?.contract_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        start_date: value?.start_date && dayjs(value?.start_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        end_date: value?.end_date && dayjs(value?.end_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        items: value?.items ? value?.items.filter(a => a) : []
      }
      value?.items?.forEach(val => {
        if (val?.product_type === undefined) {
          val.product_type = 'service'
        }
        if (val?.bank_guarantee_date) {
          val.bank_guarantee_date = dayjs(val.bank_guarantee_date, "YYYY-MM-DD").format("YYYY-MM-DD")
        }
      })
      let newValue = Object.keys(value).reduce((acc, key) => {
        if (typeof value[key] === 'undefined') {
          acc[key] = null;
        } else if (Array.isArray(value[key])) {
          acc[key] = value[key].map(obj => {
            return Object.keys(obj).reduce((oAcc, objKey) => {
              if (typeof obj[objKey] === 'undefined') {
                oAcc[objKey] = null;
              } else {
                oAcc[objKey] = obj[objKey];
              }
              return oAcc;
            }, {});
          });
        } else {
          acc[key] = value[key];
        }
        return acc;
      }, {});
      setLoading(true)
      API.Acc.FacturaContract.store(newValue).then(res => {
        if (res.status === 400) {
          setLoading(false)
          const messages = res.data.data;
          for (let key in messages) setFormError(key, messages[key]);
        } else {
          setLoading(false)
          Close()
        }
      });
    } else {
      message.error('Məlumatlar natamamdır!')
    }
  };
  //! Store Finished End----------------------------------------------------------------------------------
  //*--------------
  //! Store Finished Failed Start------------------------------------------------------------------------
  const onFinishFailed = (errorInfo) => {
    errorInfo?.errorFields?.forEach((error) => {
      setCollapseKey(0)
      tabInfoPanel[error?.name?.[1]].collapse = true;
      setTabInfoPanel([...tabInfoPanel])
    })
    message.error('Məlumatlar natamamdır!')
  };
  //! Store Finished Failed End--------------------------------------------------------------------------
  //*--------------
  //! Predmet Store Start---------------------------------------------------------------------------------
  const addSuccess = (value) => {
    setLoading(true)
    API.Acc.Picklist.FakturaContractPredment.store(value).then(res => {
      if (res.status == 201) {
        setLoading(false)
        predmet.push(res.data.data)
        setPredmet([...predmet])
        addForm.setFields([{ name: 'name', value: null, errors: null }])
      }
    })
  };
  //! Predmet Store End-----------------------------------------------------------------------------------
  //*--------------
  const handleCategoryType = (value, index) => {
    setLoading(true)
    tabInfoPanel[index].description = []
    API.Acc.FacturaContract.productCategory({ 'item_type': value }).then(res => {
      setLoading(false)
      tabInfoPanel[index].products = res.data.data;
      tabInfoPanel[index].product_type = value;
      setTabInfoPanel([...tabInfoPanel]);
    })
    setItem([{ name: ['items', index, 'product_id'], value: null, errors: null }])
    setItem([{ name: ['items', index, 'description_id'], value: null, errors: null }])
    setItem([{ name: ['items', index, 'product_type'], value: value, errors: null }])
  };
  //*--------------
  //! Piclists Api Start----------------------------------------------------------------------------------
  const getOrganizationList = () => {
    setLoading(true);
    API.Finance.Organization.list().then(res => {
      setLoading(false);
      setOrganization([...res.data.data]);
    });
  };
  const getSuppliers = () => {
    setLoading(true);
    API.Procurement.Suppliers.list().then(res => {
      setLoading(false);
      setSuppliers([...res.data.data]);
    });
  };
  const getCurrencyType = () => {
    setLoading(true);
    API.Finance.CurrencyType.list().then(res => {
      setLoading(false);
      setCurrencyType([...res.data.data]);
    })
  };
  const getPredmetType = () => {
    setLoading(true);
    API.Acc.Picklist.FakturaContractPredment.list().then(res => {
      setLoading(false);
      setPredmet([...res.data.data]);
    })
  };
  const getContractType = () => {
    setLoading(true);
    API.Procurement.Picklist.contractType().then(res => {
      setLoading(false);
      setContractType([...res.data.data]);
    })
  };
  const getFromApiBtns = () => {
    setLoading(true);
    API.Warehouse.ItemType.list().then(res => {
      setLoading(false);
      setFromApiBtns(res.data.data)
    })
  };
  const getPaymentType = () => {
    setLoading(true);
    API.Procurement.Picklist.contractPayment().then(res => {
      setLoading(false);
      setPaymentType([...res.data.data]);
    })
  };
  const getBankTime = () => {
    setLoading(true);
    API.Finance.Picklist.time().then(res => {
      setLoading(false);
      setBankTime(res.data.data)
    })
  };
  const getTaxEdv = () => {
    setLoading(true);
    API.Finance.Picklist.tax().then(res => {
      setLoading(false);
      setTaxEdv(res.data.data)
    })
  };
  const getItemUnit = () => {
    setLoading(true);
    API.Warehouse.ItemUnit.list().then(res => {
      setLoading(false);
      setItemUnit(res.data.data)
    })
  };
  const getBanks = () => {
    setLoading(true);
    API.Finance.BankGeneral.bankList().then(res => {
      setLoading(false);
      setBanks(res.data.data)
    })
  };
  const getProducts = () => {
    setLoading(true);
    API.Acc.FacturaContract.productCategory({ 'item_type': 'service' }).then(res => {
      setLoading(false);
      setProducts(res.data.data)
    })
  };
  const getTesnifatHandle = (value, index) => {
    setLoading(true);
    setItem([{ name: ['items', index, 'description_id'], value: null, errors: null }])
    const uuid = { product_id: value }
    if (value !== undefined) {
      API.Warehouse.productAtributeValue.crossCombinations(uuid).then(res => {
        if (res.status === 400) {
          setLoading(false);
          const messages = res.data.data;
          for (let key in messages) setFormError(key, messages[key]);
        } else {
          setLoading(false);
          tabInfoPanel[index].description = res.data.data;
          setTabInfoPanel([...tabInfoPanel]);
        }
      });
    } else {
      setLoading(false);
      tabInfoPanel[index].description = [];
      setTabInfoPanel([...tabInfoPanel]);
    }
  };
  //! Piclists Api End------------------------------------------------------------------------------------
  //*--------------
  //! Delete Api Start------------------------------------------------------------------------------------
  const deleteMaliyyeCollapse = (e, index) => {
    e.stopPropagation();
    delete tabInfoPanel[index];
    setTabInfoPanel([...tabInfoPanel]);
    valArrTotalAmount[index] = 0;
    valArrEDVAmount[index] = 0;
    sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalAmount(sumTotalAmount);
    setTotalEdvAmount(sumEDVAmount);
  };
  //! Delete Api End--------------------------------------------------------------------------------------
  //*--------------
  //! CalculateFunc Start---------------------------------------------------------------------------------
  const calculateFunc = (e, name, index) => {
    if (parseInt(e.target.value) < 0) {
      setItem([{ name: ['items', index, name], value: null, errors: null }])
    } else if (e.target.value.startsWith('0')) {
      setItem([{ name: ['items', index, name], value: null, errors: null }])
    }
    // //?---------------------------------------------------
    let quantity = form.getFieldValue(['items', index, 'quantity']) || 0;
    let price = form.getFieldValue(['items', index, 'amount']) || 0;
    if (quantity === 0 || price === 0) {
      setItem([{ name: ['items', index, 'amountUI'], value: 0, errors: null }])
      setItem([{ name: ['items', index, 'tax_id_value'], value: 0, errors: null }])
    }
    if (quantity || price) {
      setItem([{ name: ['items', index, 'amountUI'], value: quantity * price, errors: null }])
      if (form.getFieldValue(['items', index, 'tax_id'])) {
        let cCalcAmount = form.getFieldValue(['items', index, 'amountUI'])
        const filtered = taxEdv.filter(a => a.uuid === form.getFieldValue(['items', index, 'tax_id']) && a.name)
        let resCalc = cCalcAmount * filtered[0]?.name / 100
        setItem([{ name: ['items', index, 'tax_id_value'], value: resCalc, errors: null }])
      } else {
        setItem([{ name: ['items', index, 'tax_id_value'], value: 0, errors: null }])
      }
    }
    tabInfoPanel.forEach((val, index) => {
      if (val) {
        valArrTotalAmount[index] = form.getFieldValue(['items', index, 'amountUI'])
        valArrEDVAmount[index] = form.getFieldValue(['items', index, 'tax_id_value'])
      }
    })
    sumTotalAmount = valArrTotalAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalAmount(sumTotalAmount)
    setTotalEdvAmount(sumEDVAmount)
  };
  const handleCalcBillEDVAmount = (_, val, index) => {
    if (val === undefined) {
      setItem([{ name: ['items', index, 'tax_id_value'], value: 0, errors: null }])
    } else {
      let t = form.getFieldValue(['items', index, 'amountUI']) || 0;
      setItem([{ name: ['items', index, 'tax_id_value'], value: val.children[0] * t / 100, errors: null }])
    };
    tabInfoPanel.forEach((val, index) => {
      if (val) {
        valArrEDVAmount[index] = form.getFieldValue(['items', index, 'tax_id_value'])
      }
    });
    sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotalEdvAmount(sumEDVAmount);
  };
  //! CalculateFunc End-----------------------------------------------------------------------------------
  //*--------------
  const allowOnlyOneSpace = (e, index) => setItem([{ name: ['items', index, 'note'], value: e.target.value.trimStart().replace(/ {2}/g, ' '), errors: null }]);
  //! SetError Start--------------------------------------------------------------------------------------
  const setFormError = (name, errors) => {
    name = name.split('.').map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
    form.setFields([{ name, errors }]);
  };
  //! SetError End ---------------------------------------------------------------------------------------
  //*--------------
  //! TABPANE INLINE START--------------------------------------------------------------------------------
  const items = [
    {
      key: '1',
      label: `Maliyyə detalları`,
      children: <>
        <Collapse accordion onChange={(key) => setCollapseKey(key)} activeKey={collapseKey}>
          {tabInfoPanel?.map((tabInfo, index) => (tabInfo &&
            <Panel key={index + 1} showArrow={false} onClick={() => {
              tabInfoPanel[index].collapse = false
              setTabInfoPanel([...tabInfoPanel])
            }} header={
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button>{tabInfoPanel?.[index]?.collapse ? <b style={{ color: 'crimson' }}>Boş buraxılmış xanalar var...</b> : <span>Maliyyə detalları paneli</span>}</Button>
                <Space>
                  {/* <Button style={{ width: '300px' }} type="primary"> <span style={{ fontSize: '12px' }}>Cəmi məbləğ:</span> <span style={{ fontSize: '12px', marginLeft: '10px' }}>{valArrTotalAmount?.[index] ?? 0}</span></Button>
                  <Button style={{ width: '300px' }} type="primary"> <span style={{ fontSize: '12px' }}>Cəmi ƏDV məbləği:</span> <span style={{ fontSize: '12px', marginLeft: '10px' }}>{valArrEDVAmount?.[index] ?? 0}</span></Button> */}
                  <Button type="primary" danger onClick={(e) => deleteMaliyyeCollapse(e, index)}> - </Button>
                </Space>
              </span>}>
              <Row style={{ width: '100%', height: '125px', display: 'flex' }} gutter={14}>
                <Col span={5}>
                  <Form.Item hidden name={['items', index, 'product_type']} />
                  <Form.Item label='Kateqoriya'>
                    <Text onClick={() => handleCategoryType('service', index)} className={`${tabInfoPanel[index].product_type === 'service' && styles.activeStatus} ${styles.paymentBtn}`}>Servis</Text>
                    <Text onClick={() => handleCategoryType('product', index)} className={`${tabInfoPanel[index].product_type === 'product' && styles.activeStatus} ${styles.paymentBtn}`} >Məhsul</Text>
                    {tabInfoPanel[index].product_type === 'service' &&
                      <Form.Item className='c-form-item' name={['items', index, 'product_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                        <Select
                          onChange={(value) => getTesnifatHandle(value, index)}
                          allowClear showSearch className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Servis seçin' >
                          {tabInfoPanel?.[index]?.products?.map((ser, index) => (
                            <Option className='c-select-option' key={index} value={ser?.uuid}>{ser?.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    }
                    {tabInfoPanel[index].product_type === 'product' &&
                      <Form.Item className='c-form-item' name={['items', index, 'product_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                        <Select
                          onChange={(value) => getTesnifatHandle(value, index)}
                          allowClear showSearch className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Məhsul seçin'>
                          {tabInfoPanel?.[index]?.products?.map((ser, index) => (
                            <Option className='c-select-option' key={index} value={ser?.uuid}>{ser?.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    }
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item className='c-form-item' label='Təsnifat' name={['items', index, 'description_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Select className='c-select' allowClear showSearch
                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                      placeholder={innerText?.select_placeholder}
                    >
                      {tabInfoPanel?.[index]?.description?.map((desc, index) => (
                        <Option className='c-select-option' key={index} value={desc?.uuid}>{desc?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item className='c-form-item' label='Ölçü vahidi' name={['items', index, 'unit_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Select className='c-select' allowClear showSearch
                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                      placeholder={innerText.select_placeholder}
                    >
                      {itemUnit?.map(item => (
                        <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item className='c-form-item' label='Miqdar' name={['items', index, 'quantity']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Input type='number' onChange={(e) => calculateFunc(e, 'quantity', index)} className='c-input' placeholder={innerText.input_placeholder} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item className='c-form-item' label='Qiymət' name={['items', index, 'amount']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Input type='number' className='c-input' onChange={(e) => calculateFunc(e, 'amount', index)} placeholder={innerText.input_placeholder} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={14}>
                <Col span={5}>
                  <Form.Item className='c-form-item' label='Məbləğ' name={['items', index, 'amountUI']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Input disabled className='c-input' placeholder={innerText.input_placeholder} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={
                    <span style={{ width: '330px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>ƏDV</span>
                      <Switch onChange={(val) => {
                        valArrEDVAmount[index] = 0;
                        sumEDVAmount = valArrEDVAmount.filter(a => a).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                        setTotalEdvAmount(sumEDVAmount)
                        if (val) {
                          setItem([{ name: ['items', index, 'tax_id'], value: null, errors: null }])
                          setItem([{ name: ['items', index, 'tax_id_value'], value: null, errors: null }])
                        }
                        tabInfoPanel[index].checkEdv = val;
                        setTabInfoPanel([...tabInfoPanel])
                      }} size="small" checked={tabInfoPanel?.[index]?.checkEdv} />
                    </span>
                  }>
                    {tabInfoPanel?.[index]?.checkEdv
                      ?
                      <Space size={0}>
                        <Form.Item className='c-form-item' name={['items', index, 'tax_id']} rules={[{ required: true, message: innerText.error_insert_data }]}>
                          <Select className='c-select' allowClear
                            onChange={(e, a) => handleCalcBillEDVAmount(e, a, index)} showSearch placeholder='Seçim edin'>
                            {taxEdv?.map((item, i) => (
                              <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item className='c-form-item' name={['items', index, 'tax_id_value']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                          <Input disabled className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                        </Form.Item>
                      </Space>
                      :
                      <Space>
                        <b><i>ƏDV-dən azad!</i></b>
                        <Form.Item hidden name={['items', index, 'tax_id']} />
                        <Form.Item hidden name={['items', index, 'tax_id_value']} />
                      </Space>
                    }
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item className='c-form-item' label='Bank zəmanət məbləği' name={['items', index, 'bank_guarantee_amount']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Input type='number' onChange={(e) => calculateFunc(e, 'bank_guarantee_amount', index)} className='c-input' placeholder={innerText.input_placeholder} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item className='c-form-item' label='Zəmanət verən bank' name={['items', index, 'bank_guarantee_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <Select className='c-select' allowClear showSearch
                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                      placeholder={innerText.select_placeholder}
                    >
                      {banks?.map((bank, index) => (
                        <Option className='c-select-option' key={index} value={bank?.uuid}>{bank?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item className='c-form-item' label='Bank zəmanət tarixi' name={['items', index, 'bank_guarantee_date']} rules={[{ required: false, message: innerText.error_insert_data }]} >
                    <DatePicker style={{ width: '100%', height: '36px' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={14}>
                <Col span={5}>
                  <Form.Item label='Bank zəmanət müddəti'>
                    <Space size={0}>
                      <Form.Item className='c-form-item' name={['items', index, 'bank_guarantee_time_id']} rules={[{ required: false, message: '' }]}>
                        <Select className='c-select' allowClear
                          showSearch
                          filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                          placeholder='Seçim edin'>
                          {bankTime?.map((item, i) => (
                            <Option className='c-select-option' key={i} value={item.uuid}>{item.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item className='c-form-item' name={['items', index, 'bank_guarantee_time_quantity']} rules={[{ required: false, message: '' }]}>
                        <Input type='number' onChange={(e) => calculateFunc(e, 'bank_guarantee_time_quantity', index)} className='c-input' min='0' placeholder='Daxil edin...' />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                </Col>
                <Col span={13}>
                  <Form.Item className='c-form-item' label='Qeyd' name={['items', index, 'note']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                    <TextArea onChange={(e) => allowOnlyOneSpace(e, index)} rows={4} className='c-input' placeholder={innerText.input_placeholder} />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item label='Məbləğ' className='c-form-item' name={['items', index, 'amountUI']} rules={[{ required: false, message: '' }]}>
                    <Input disabled className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item label='ƏDV məbləği' className='c-form-item' name={['items', index, 'tax_id_value']} rules={[{ required: false, message: '' }]}>
                    <Input disabled className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          ))}
        </Collapse>
        <Space direction="vertical" className={styles.some}>
          <Row gutter={12}>
            <Col span={24} >
              <Button block onClick={() => {
                tabInfoPanel.push({ status: true, collapse: true, product_type: 'service', products: products, description: [], checkEdv: false })
                setTabInfoPanel([...tabInfoPanel])
              }} type="dashed">
                +
              </Button>
            </Col>
          </Row>
        </Space>
        {tabInfoPanel?.filter(a => a).length > 0 &&
          <Space className={styles.cardParent}>
            <Card className={styles.cardDesign} size="small">
              <span className={styles.justifyBetween}>
                <b style={{ fontSize: '12px' }}>Cəmi məbləğ:</b>
                <span>{totalAmount.toFixed(2) || 0} AZN</span>
              </span>
            </Card>
            <Card className={styles.cardDesign} size="small">
              <span className={styles.justifyBetween}>
                <b style={{ fontSize: '12px' }}>Cəmi ƏDV məbləği:</b>
                <span>{totalEdvAmount?.toFixed(2) || 0} AZN</span>
              </span>
            </Card>
            <Card className={styles.cardDesign} size="small">
              <span className={styles.justifyBetween}>
                <b style={{ fontSize: '12px' }}>Cəmi vergi daxili məbləğ:</b>
                <span>{(totalAmount + totalEdvAmount)?.toFixed(2) || 0} AZN</span>
              </span>
            </Card>
          </Space>
        }
      </>,
    }
  ];
  //! TABPANE INLINE END----------------------------------------------------------------------------------
  //*--------------
  useEffect(() => {
    getOrganizationList();
    getSuppliers();
    getCurrencyType();
    getPredmetType();
    getContractType();
    getFromApiBtns();
    getBankTime();
    getTaxEdv();
    getItemUnit();
    getPaymentType();
    getBanks();
    getProducts();
  }, []);
  return (
    <Drawer
      title='Yeni'
      width="100%"
      onClose={Close}
      open={open}
      className='c-drawer'
      bodyStyle={{ paddingBottom: 100 }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} >
        <Row>
          <Col span={24}>
            <Row style={{ marginBottom: '1rem' }}> <Col><Text type="success">Əsas məlumatlar</Text></Col></Row>
            <Row gutter={14}>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Təşkilat' name='company_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className='c-select' allowClear showSearch
                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                    placeholder={innerText.select_placeholder}
                  >
                    {organization.map((a) => (
                      <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Kontragent' name='supplier_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className='c-select' allowClear showSearch
                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                    placeholder={innerText.select_placeholder}
                  >
                    {suppliers.map((a) => (
                      <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Növ' name='contract_type_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className='c-select' allowClear showSearch
                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                    placeholder={innerText.select_placeholder}
                  >
                    {contractType?.map((contract, index) => (
                      <Option key={index} value={contract?.uuid}>{contract?.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Valyuta' name='currency_type_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className='c-select' allowClear showSearch
                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                    placeholder={innerText.select_placeholder}
                  >
                    {currencyType?.map(a => (
                      <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className='c-form-item' label='Nömrə' name='contract_no' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Input className='c-input' placeholder={innerText.input_placeholder} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={14}>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Tarix' name='contract_date' rules={[{ required: false, message: innerText.error_insert_data }]} >
                  <DatePicker style={{ width: '100%', height: '36px' }} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Predmet' name='prediment_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className='c-select' allowClear showSearch
                    placeholder={innerText.select_placeholder}
                    filterOption={(input, option) => (option?.children?.toLowerCase() ?? '')?.includes(input?.toLowerCase())}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider />
                        <Form form={addForm} onFinish={addSuccess}>
                          <Row gutter={12}>
                            <Col span={18}>
                              <Form.Item name="name" rules={[{ required: false, message: "Please enter item" }]} >
                                <Input placeholder="Please enter item" />
                              </Form.Item>
                            </Col>
                            <Col span={6}>
                              <Button htmlType='submit' block={true} icon={<PlusOutlined />} />
                            </Col>
                          </Row>
                        </Form>
                      </>
                    )}
                  >
                    {predmet?.map((pred, index) => (
                      <Option className='c-select-option' key={index} value={pred?.uuid}>{pred?.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item className='c-form-item' label='Ödəniş növü' name='payment_type_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <Select className='c-select' allowClear showSearch
                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                    placeholder={innerText.select_placeholder}
                  >
                    {paymentType?.map((contract, index) => (
                      <Option className='c-select-option' key={index} value={contract?.uuid}>{contract?.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label='Başlama tarixi' name='start_date' rules={[{ required: false, message: innerText.error_insert_data }]}>
                  <DatePicker style={{ width: '100%', height: '36px' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label='Bitmə tarixi' name='end_date' rules={[{ required: false, message: innerText.error_insert_data }]} >
                  <DatePicker style={{ width: '100%', height: '36px' }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Tabs animated={true} items={items} type="card" defaultActiveKey="1"></Tabs>
            {/* <TabPane tab='Maliyyə detalları' key="1"> </TabPane> */}
          </Col>
        </Row>
        <Row align='end' className='fixed-submit-buttons'>
          <Button className='c-btn c-btn--primary' type='primary' htmlType="submit">Yadda saxla</Button>
          <Button onClick={Close} className='c-btn c-btn--secondary'>Bağla</Button>
        </Row>
      </Form >
      <Loader loading={loading} />
    </Drawer >
  );
};

export default Index;