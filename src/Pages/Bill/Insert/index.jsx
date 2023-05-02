import React, { useEffect, useState, useRef } from 'react';
import styles from './style.module.scss';
import NewProduct from './NewProduct';
import PrfProduct from './PrfProduct';
// import Journal from './Journal';
import TransferList from './TransferList';
import AdditionalCosts from './AdditionalCost';
import { Loader } from '../../../Components/index';
import {
  Popconfirm, Row, Col, Button, Form, Input, Drawer,
  Typography, Select, DatePicker, TreeSelect,
  Tabs, Card, InputNumber, Empty
} from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import API from '../../../API';
import dayjs from 'dayjs';
import { message } from 'antd';
import { BillInsertContext, BillTableContext, useContext } from '../Context/context';
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("Bill")
const { Text } = Typography;
const { Option } = Select;

let scrollTop = 0;
let originalData = [];
let selectedPRF = [];
let organization = [];
let currencyType = [];
let registrationType = [];
let contracts = {};
let targetKeys = []
let typeVariables = {
  paymentBtn: 'contract',
  prfType: 'selected'
}
function Index() {
  const { setLoading, onClose, open, loading } = useContext(BillTableContext);
  const [form] = Form.useForm();
  const scrollRef = useRef(null);
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [costTab, setCostTab] = useState(true);
  const [isRequired, setIsRequired] = useState([]);
  //DependenciesStates-----------------------------------------------------------------------
  const [contractsPiclist, setContractsPiclist] = useState([]);
  const [companyDependencies, setCompanyDependencies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [journalsTop, setJournalsTop] = useState([]);
  const [warehouseProductCategory, setWarehouseProductCategory] = useState([]);
  const [bankTime, setBankTime] = useState([]);
  const [taxEdv, setTaxEdv] = useState([]);
  const [itemUnit, setItemUnit] = useState([]);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [prfData, setPrfData] = useState([]);
  const [storePrfView, setStorePrfView] = useState([]);
  const [payment, setPayment] = useState('contract');
  const [account, setAccount] = useState('pettycash');
  const [direction_type, setDirection_type] = useState('warehouse');
  const [allPrf, setAllPrf] = useState('selected');
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [checkbox, setCheckbox] = useState([]);
  const [newProductTab, setNewProductTab] = useState([{}]);
  const [prfTab, setPrfTab] = useState([]);
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [distribution, setDistribution] = useState([])
  const [novState, setNovState] = useState([])
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const onFinish = (value) => {
    if (!costTab && isRequired) {
      console.log(value)
      value = {
        ...value,
        billed_date: dayjs(value.billed_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        receiving_account_type: account,
        payment_type: payment,
        direction_type: direction_type,
        prf_type: allPrf,
        prfs: value.prfs && value?.prfs?.filter(el => el) || [],
        addition_expenses: value?.addition_expenses?.filter(el => el) ?? []
      }
      console.log(value)
      setLoading(true)
      API.Finance.Bill.store(value).then(res => {
        if (res.status === 400) {
          setLoading(false)
          const messages = res.data.data;
          for (let key in messages) setFormError(key, messages[key]);
        } else {
          setLoading(false)
          Close()
        }
      })
    } else {
      message.error('Zəhmət olmasa boş xanaları doldurun!')
    }
  };
  const onFinishFailed = (value) => {
    message.error('Zəhmət olmasa boş xanaları doldurun!')
    if (allPrf !== 'new') {
      value?.errorFields?.forEach((element) => {
        if (element.name.length > 1 && element.name[0] === 'addition_expenses') {
          setCostTab(true)
        }
      });
    }
  };
  const resetBelowTabs = () => {
    prfTab.map((element, index) => {
      element.products.map((_, ind) => {
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'description_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'quantity': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'amount': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_amount': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_tax_amount': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accounting_account_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_quantity': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_unit_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_amount': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_tax_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_accounting_account_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration_id': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accepted_commitment': null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_remainder_quantity': null } } } } })
      })
    })
    checkbox.map((_, ind) => {
      setItem({ 'addition_expenses': { [ind]: { 'prf_id': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'supplier_id': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_type_id': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'distribution_id': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'amount': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_number': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'tax_id': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'chart_of_account': null } } })
      setItem({ 'addition_expenses': { [ind]: { 'tax_chart_of_account_id': null } } })
    })
    setPrfTab([])
    setCheckbox([])
  };
  const resetNewPart = () => {
    setItem({ 'prfs': { 0: { 'products': { 0: { 'product_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'description_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'accounting_account_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'unit_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'quantity': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'amount': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'total_amount': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'tax_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'total_tax_amount': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'tax_accounting_account_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'bank_duration_id': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'bank_duration': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'accepted_commitment': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'product_remainder_quantity': null } } } } })
    setItem({ 'prfs': { 0: { 'products': { 0: { 'note': null } } } } })
  };
  const Close = () => {
    onClose();
    form.resetFields();
    setPrfTab([]);
    setPrfData([]);
    setCheckbox([]);
    targetKeys = [];
    setSelectedKeys([]);
    setContractsPiclist([]);
    setCompanyDependencies([]);
    typeVariables.paymentBtn = 'contract';
    typeVariables.prfType = 'selected';
    setPayment('contract');
    setAccount('pettycash');
    setDirection_type('warehouse');
    setAllPrf('selected');
    setStorePrfView([]);
  };
  const getPRFFunc = () => {
    const data = {
      'prf_type': typeVariables.prfType,
      'payment_type': typeVariables.paymentBtn,
      'supplier_id': form.getFieldValue('supplier_id') || null,
      'organization_id': form.getFieldValue('organization_id') || null,
      'contract_id': payment === 'contract' ? form.getFieldValue('contract_id') : null,
    }
    setLoading(true)
    API.Finance.Bill.getPRF(JSON.stringify(data)).then(res => {
      if (res.status === 400) {
        const messages = res.data.data;
        setLoading(false)
        for (let key in messages) setFormError(key, messages[key]);
        setPrfData([])
      } else {
        setLoading(false)
        let temp = res.data.data.map((el => el.uuid))
        const data = { prfs: temp }
        API.Finance.Bill.getPRFExpenses(JSON.stringify(data)).then(res => {
          if (res.status === 200) {
            let modifyData = res.data.data.map(el => {
              return {
                ...el, status: false
              }
            })
            getDistributionFunc()
            getNovFunc()
            modifyData?.map((val, ind) => {
              setItem({ 'addition_expenses': { [ind]: { 'prf_id': val?.prf?.uuid } } })
              setItem({ 'addition_expenses': { [ind]: { 'supplier_id': val?.supplier?.uuid } } })
              setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_type_id': val?.addition_expenses_type?.uuid } } })
              setItem({ 'addition_expenses': { [ind]: { 'distribution_id': val?.distribution?.uuid } } })
              setItem({ 'addition_expenses': { [ind]: { 'amount': val?.amount } } })
              setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_number': val?.addition_expenses_number } } })
              setItem({ 'addition_expenses': { [ind]: { 'tax_id': val?.tax?.uuid } } })
            })
            setCheckbox([...modifyData])
          }
        })
        setPrfData(res.data.data.map(dat => {
          return {
            ...dat, key: dat.uuid
          }
        }))
        setStorePrfView(res.data.data.map(el => {
          return {
            ...el, status: false, collapse: true, products: [], costs: []
          }
        }))
      }
    })
  };
  const handleTrickeryStatus = () => {
    setCompanyDependencies([])
    setAccount('pettycash')
    form.setFields([{ name: 'receiving_account_company_id', value: [], errors: null }])
    form.setFields([{ name: 'receiving_account_type_id', value: [], errors: null }])
  };
  const handleCheckoutStatus = () => {
    setCompanyDependencies([])
    setAccount('box')
    form.setFields([{ name: 'receiving_account_company_id', value: [], errors: null }])
    form.setFields([{ name: 'receiving_account_type_id', value: [], errors: null }])
  };
  const cancel = () => {
    message.error('Ləğv edildi...');
  };
  const handleChoosenPRFStatus = (e) => {
    resetBelowTabs()
    targetKeys = []
    setSelectedKeys([])
    setStorePrfView([])
    setAllPrf('selected')
    typeVariables.prfType = 'selected'
    setNewProductTab([{}])
    resetNewPart()
    getPRFFunc()
  };
  const handleFragmentedPRFStatus = () => {
    setCostTab(false)
    resetBelowTabs()
    targetKeys = []
    setSelectedKeys([])
    setStorePrfView([])
    setNewProductTab([{}])
    resetNewPart()
    setAllPrf('fragmented')
    typeVariables.prfType = 'fragmented'
    getPRFFunc()
  };
  const handleFromNewStatus = () => {
    setCostTab(false)
    resetBelowTabs()
    resetNewPart()
    setNewProductTab([{}])
    targetKeys = []
    setSelectedKeys([])
    setStorePrfView([])
    setAllPrf('new')
  };
  const setItem = (value) => form.setFieldsValue(value);
  const handleCashStatus = () => {
    resetBelowTabs()
    setPrfTab([])
    targetKeys = []
    setPayment('cash')
    typeVariables.paymentBtn = 'cash'
    form.setFields([{ name: "number_invoice", value: [], errors: null }]);
    form.setFields([{ name: 'currency_id', value: [], errors: null }])
    form.setFields([{ name: 'contract_id', value: null, errors: null }])
    getPRFFunc()
  };
  const handleBillStatus = () => {
    resetBelowTabs()
    setPrfTab([])
    targetKeys = []
    setPayment('contract')
    typeVariables.paymentBtn = 'contract'
    form.setFields([{ name: "number_check", value: [], errors: null }]);
    getPRFFunc()
  };
  const handleWarehouseStatusStatus = () => {
    setDirection_type('warehouse')
    form.setFields([{ name: "direction_type_ids", value: [], errors: null }]);
  };
  const handleProjectStatusStatus = () => {
    setDirection_type('project')
    form.setFields([{ name: "direction_type_ids", value: [], errors: null }]);
  };
  //SetError------------------------------------------------------------------------
  const getItemUnit = () => {
    API.Warehouse.ItemUnit.list().then(res => {
      setItemUnit(res.data.data)
    })
  };
  const getTaxEdv = () => {
    API.Finance.Picklist.tax().then(res => {
      setTaxEdv(res.data.data)
    })
  };
  const getBankTime = () => {
    API.Finance.Picklist.time().then(res => {
      setBankTime(res.data.data)
    })
  };
  const getWareHouseProductCategory = () => {
    API.Finance.Bill.warehouseProductCategory().then(res => {
      setWarehouseProductCategory(res.data.data)
    })
  };
  const getRegistrationTypeList = (data) => {
    setLoading(true)
    API.Finance.Picklist.registrationTypeList().then(res => {
      setLoading(false)
      registrationType = [...res.data.data];
    })
  };
  const getOrganizationList = () => {
    setLoading(true)
    API.Finance.Organization.list().then(res => {
      setLoading(false)
      organization = [...res.data.data];
    })
  };
  const getSuppliersList = () => {
    setLoading(true)
    API.Procurement.Suppliers.list().then(res => {
      setLoading(false)
      setSuppliers([...res.data.data])
    })
  };
  const getCurrencyType = () => {
    setLoading(true)
    API.Finance.CurrencyType.list().then(res => {
      setLoading(false)
      currencyType = res.data.data;
    })
  };
  const getContracts = () => {
    setLoading(true)
    API.Finance.Bill.contracts(JSON.stringify(contracts)).then(res => {
      setLoading(false)
      setContractsPiclist([...res.data.data])
    })
  };
  const getTehtelKassa = () => {
    const data = { type: account, receiving_account_company_id: form.getFieldValue('receiving_account_company_id') || null }
    if (data.receiving_account_company_id) {
      setLoading(true)
      API.Finance.Bill.receivingAccount(JSON.stringify(data)).then(res => {
        setLoading(false)
        setCompanyDependencies([...res.data.data])
      })
    } else {
      setCompanyDependencies([])
    }
    form.setFields([{ name: 'receiving_account_type_id', value: null, errors: ['Zehmət olmasa doldurun...'] }])
  };
  const getProjects = () => {
    setLoading(true)
    API.Com.Project.list().then(res => {
      setLoading(false)
      setProjects([...res.data.data])
    })
  };
  const getWarehouseNames = () => {
    setLoading(true)
    API.Warehouse.WarehouseNames.list().then(res => {
      setLoading(false)
      setWarehouse([...res.data.data])
    })
  };
  const getJournals = () => {
    setLoading(true)
    API.Finance.Bill.journals().then(res => {
      if (res.status === 200) {
        setLoading(false)
        setJournalsTop([...res.data.data])
      }
    })
  };
  const renderTreeNodes = (nodes) => {
    return nodes?.map((node, i) => {
      if (node.children) {
        return (
          <TreeSelect.TreeNode className='c-select-option' disabled={node.disable === true ? true : false} value={node.uuid} title={`${node.number}. ${node.name}`} key={node.uuid}>
            {renderTreeNodes(node.children)}
          </TreeSelect.TreeNode>
        );
      }
      return <TreeSelect.TreeNode className='c-select-option' disabled={node.disable === true ? true : false} value={node.uuid} title={`${node.number}. ${node.name}`} key={node.uuid} />;
    });
  };
  //SetError------------------------------------------------------------------------
  const setFormError = (name, errors) => {
    name = name.split('.').map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
    form.setFields([{ name, errors }]);
  };
  //TransferList -------------------------------------------------------------------
  const onChangeTransferList = (nextTargetKeys, direction, moveKeys) => {
    selectedPRF = []
    targetKeys = nextTargetKeys
    targetKeys?.forEach(element => {
      prfData.filter(el => {
        if (el.key === element) {
          selectedPRF.push(el)
        }
      })
    })
    let copyStoreView = [...storePrfView]
    let copyCheckbox = [...checkbox]
    if (direction === 'right') {
      moveKeys.forEach(rightKey => {
        copyCheckbox = copyCheckbox?.map((r) => r?.prf?.uuid !== rightKey ? r : {
          ...r,
          status: true,
        })
        let isChechIncludes = storePrfView.find(obj => obj.uuid === rightKey)
        if (isChechIncludes) {
          copyStoreView = copyStoreView.map((r, i) => r.uuid !== rightKey ? r : {
            ...r,
            status: true,
            collapse: storePrfView[i].collapse
          })
        } else {
          setStorePrfView([...storePrfView, { uuid: rightKey, status: true, collapse: true }])
        }
      })
      setCheckbox([...copyCheckbox])
      setStorePrfView([...copyStoreView])
    } else if (direction === 'left') {
      moveKeys.forEach(leftKey => {
        copyStoreView = copyStoreView.map((l, i) => l?.uuid !== leftKey ? l : { ...l, uuid: leftKey, status: false, collapse: storePrfView[i].collapse })
        copyCheckbox = copyCheckbox.map(l => l?.prf?.uuid !== leftKey ? l : { ...l, status: false })
      })
      setCheckbox([...copyCheckbox])
      setStorePrfView([...copyStoreView])
    }
    prfSelectedProductsFunc(selectedPRF)
  };
  const prfSelectedProductsFunc = (selectedData) => {
    selectedData = selectedData.map(uuid => uuid.uuid)
    const data = { prf_ids: selectedData }
    if (data.prf_ids.length !== 0) {
      API.Finance.Bill.prfSelectedProducts(data).then(res => {
        setPrfTab(res.data.data)
      })
    } else {
      setPrfTab([])
    }
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  // Transferlist End ---------------------------------------------------------------
  // TransferList Count Start -------------------------------------------------------
  const changeCountLeft = (value, ind, i) => {
    if (+value > originalData[ind].product[i].quantity || value === NaN) {
      value = originalData[ind].product[i].quantity;
    }
    leftData[ind].product[i].quantity = parseInt(value);
    setLeftData([...leftData]);
    rightData[ind].product[i].quantity = originalData[ind].product[i].quantity - leftData[ind].product[i].quantity;
    setRightData([...rightData]);
    console.log('original', originalData[ind].product[i].quantity)
    console.log('left', leftData[ind].product[i].quantity)
    console.log('right', rightData[ind].product[i].quantity)
  };
  const handleResetQuantity = () => {
    const updatedData = prfData?.map((item) => {
      const updatedProduct = item?.product?.map((product) => {
        return {
          ...product,
          quantity: 0
        };
      });
      return {
        ...item,
        product: updatedProduct
      };
    });
    setRightData(updatedData);
  };
  const showFragmentedProducts = () => {
    let data = rightData.map(data => data.product.map(dat => {
      return {
        prf_id: data.uuid,
        product_id: dat.uuid,
        quantity: dat.quantity
      }
    }))
    data = data.flat().filter(a => a.quantity !== 0)
    if (data.length !== 0) {
      storePrfView.map((el) => {
        el.products = []
        el.status = false
      })
      API.Finance.Bill.prfFragmentedProducts({ 'request': data }).then(res => {
        let prfTabFragment = res.data.data;
        storePrfView.forEach((storePrf) => {
          prfTabFragment?.forEach((prf) => {
            if (storePrf.uuid === prf.uuid) {
              storePrf.status = true
              storePrf.products = prf.products
            }
          })
        })
        setStorePrfView([...storePrfView])
        setPrfTab(res.data.data)
      })
    } else {
      setPrfTab([])
      storePrfView?.map((el) => {
        el.status = false;
        el.products = []
      })
    }
    setStorePrfView([...storePrfView])
  };
  const getDistributionFunc = () => {
    API.Procurement.Picklist.distribution().then(res => {
      if (res.status === 200) {
        setDistribution(res.data.data)
      }
    })
  }
  const getNovFunc = () => {
    API.Procurement.Picklist.list().then(res => {
      if (res.status === 200) {
        setNovState(res.data.data)
      }
    })
  }
  // const handleSetValueAdditional = () => {
  //   getDistributionFunc()
  //   getNovFunc()
  //   checkbox?.map((val, ind) => {
  //     setItem({ 'addition_expenses': { [ind]: { 'prf_id': val?.prf?.uuid } } })
  //     setItem({ 'addition_expenses': { [ind]: { 'supplier_id': val?.supplier?.uuid } } })
  //     setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_type_id': val?.addition_expenses_type?.uuid } } })
  //     setItem({ 'addition_expenses': { [ind]: { 'distribution_id': val?.distribution?.uuid } } })
  //     setItem({ 'addition_expenses': { [ind]: { 'amount': val?.amount } } })
  //     setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_number': val?.addition_expenses_number } } })
  //     setItem({ 'addition_expenses': { [ind]: { 'tax_id': val?.tax?.uuid } } })
  //   })
  // }
  useEffect(() => {
    let filterCollapse = storePrfView.filter(el => el.status)
    let res = filterCollapse.every(filter => !filter.collapse)
    setIsRequired(res)
  }, [storePrfView]);
  useEffect(() => {
    originalData = [...prfData];
    const initialLeftData = prfData?.map(item => ({
      ...item,
      product: item?.product?.map(product => ({ ...product }))
    }));
    setLeftData(initialLeftData)
    handleResetQuantity()
  }, [prfData]);
  // TransferList Count End ----------------------------------------------------------
  useEffect(() => {
    getRegistrationTypeList();
    getOrganizationList();
    getSuppliersList();
    getCurrencyType();
    getProjects();
    getWarehouseNames();
    getJournals();
    getWareHouseProductCategory();
    getBankTime();
    getTaxEdv();
    getItemUnit();
  }, []);
  // console.log('cb', checkbox)
  //API END---------------------------------------------------------------------------
  const insertData = {
    prfData, onSelectChange, onChangeTransferList, selectedKeys, targetKeys, novState, distribution,
    allPrf, setStorePrfView, storePrfView, itemUnit, taxEdv, bankTime, warehouseProductCategory, setItem, form, journalsTop, renderTreeNodes,
    setNewProductTab, newProductTab, suppliers, setCostTab, suppliers, checkbox, setCheckbox
  }
  return (
    <BillInsertContext.Provider value={insertData}>
      <Drawer
        title={innerText?.modalAllHeaderText}
        width={('100%')}
        className='c-drawer'
        onClose={Close}
        open={open}
        bodyStyle={{ paddingBottom: 100 }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row>
            <Col span={24} >
              <Row style={{ marginBottom: '1rem' }}>
                <Col><Text type="success">{innerText?.modalAddUpdateSimiliarHeaderText}</Text></Col>
              </Row>
              <Row style={{ width: '100%', height: '125px' }} gutter={12}>
                <Col span={4}>
                  <Form.Item className='c-form-item' label={innerText?.qeydiyyatLıstı} name='registration_type_ids' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                    <Select
                      className='c-select'
                      allowClear
                      showSearch
                      style={{ overflowY: 'scroll' }}
                      mode="multiple"
                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                      placeholder={innerText?.selectPlaceholder}
                    >
                      {registrationType?.map((a) => (
                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item className='c-form-item' label={innerText?.təşkilat} name='organization_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]} >
                    <Select allowClear showSearch
                      className='c-select'
                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                      onChange={() => {
                        setPrfTab([])
                        targetKeys = []
                        form.setFieldValue('contract_id', null)
                        form.setFieldValue('currency_id', [])
                        contracts = { supplier_id: form.getFieldValue('supplier_id') || null, organization_id: form.getFieldValue('organization_id') || null }
                        getContracts()
                        getPRFFunc()
                      }} placeholder={innerText?.selectPlaceholder}>
                      {organization.map((a) => (
                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item className='c-form-item' label={innerText?.təchizatçı} name='supplier_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                    <Select showSearch allowClear
                      className='c-select'
                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                      onChange={() => {
                        setPrfTab([])
                        targetKeys = []
                        form.setFieldValue('contract_id', null)
                        form.setFieldValue('currency_id', [])
                        contracts = { supplier_id: form.getFieldValue('supplier_id') || null, organization_id: form.getFieldValue('organization_id') || null }
                        getContracts()
                        getPRFFunc()
                      }} placeholder={innerText?.selectPlaceholder}>
                      {suppliers.map((a) => (
                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={innerText?.odəniş}>
                    <Text className={`${payment === 'contract' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={handleBillStatus}>{innerText?.Müqavilə}</Text>
                    <Text className={`${payment === 'cash' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={handleCashStatus} >{innerText?.Nəğd}</Text>
                    {payment === 'contract' && <Form.Item className='c-form-item' name='contract_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                      <Select allowClear showSearch
                        className='c-select'
                        filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                        onChange={() => {
                          if (form.getFieldValue('contract_id') === undefined) {
                            form.setFields([{ name: 'currency_id', value: [], errors: [innerText?.formRequiredMessage] }])
                          } else {
                            let currency = contractsPiclist.filter(a => a.uuid === form.getFieldValue('contract_id'))
                            form.setFields([{ name: 'currency_id', errors: null }])
                            form.setFieldValue('currency_id', currency[0].currency.uuid)
                            getPRFFunc()
                          }
                        }} placeholder={innerText?.selectPlaceholder}>
                        {contractsPiclist?.map(a => (
                          <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label={innerText?.Qəbuledənhesab}>
                    <Text className={`${account === 'pettycash' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={handleTrickeryStatus}>{innerText?.Təhtəl}</Text>
                    <Text className={`${account === 'box' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={handleCheckoutStatus} >{innerText?.Kassa}</Text>
                    <div style={{ display: 'flex' }}>
                      <Form.Item className='c-form-item' style={{ width: '50%' }} name='receiving_account_company_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                        <Select allowClear showSearch
                          className='c-select'
                          filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                          onChange={getTehtelKassa} placeholder={innerText?.Şirkət}>
                          {organization.map((a) => (
                            <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      {account === 'pettycash' &&
                        <Form.Item className='c-form-item' style={{ width: '50%' }} name='receiving_account_type_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                          <Select className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder={innerText?.Təhtəl}>
                            {companyDependencies?.map(a => (
                              <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      }
                      {account === 'box' &&
                        <Form.Item className='c-form-item' style={{ width: '50%' }} name='receiving_account_type_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                          <Select className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder={innerText?.Kassa}>
                            {companyDependencies?.map(a => (
                              <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      }
                    </div>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={innerText?.Istiqamət}>
                    <Text className={`${direction_type === 'warehouse' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={handleWarehouseStatusStatus}>{innerText?.Anbar}</Text>
                    <Text className={`${direction_type === 'project' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={handleProjectStatusStatus} >{innerText?.Layıhə}</Text>
                    {direction_type === 'warehouse' &&
                      <Form.Item className='c-form-item' name='direction_type_ids' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                        <Select className='c-select' showSearch mode='multiple' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder={innerText?.Anbar + ' ' + innerText?.selectPlaceholder} >
                          {warehouse?.map(a => (
                            <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    }
                    {direction_type === 'project' &&
                      <Form.Item className='c-form-item' name='direction_type_ids' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                        <Select className='c-select' showSearch mode='multiple' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder={innerText?.Layıhə + ' ' + innerText?.selectPlaceholder}>
                          {projects?.map(a => (
                            <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    }
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ width: '100%', height: '75px', display: 'flex' }} gutter={12}>
                <Col span={4}>
                  <Form.Item label={innerText?.Öhdəlikyazılışı} name='billed_date' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                    <DatePicker style={{ width: '100%', height: '38px' }} placeholder={innerText?.selectPlaceholder} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item className='c-form-item' label={innerText?.Jurnal} name='chart_of_account_id' rules={[{ required: false, message: innerText?.formRequiredMessage }]}>
                    <TreeSelect
                      className='c-select'
                      showSearch
                      placeholder={innerText?.selectPlaceholder}
                      allowClear
                      treeDefaultExpandAll
                      filterTreeNode={(input, option) => option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {renderTreeNodes(journalsTop)}
                    </TreeSelect>
                  </Form.Item>
                </Col>
                {payment === 'contract' &&
                  <Col span={4}>
                    <Form.Item className='c-form-item' label={innerText?.İnvoysnömrəsi} name='number_invoice' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                      <Input className='c-input' placeholder={innerText?.inputPlaceholder} />
                    </Form.Item>
                  </Col>
                }
                {payment === 'cash' &&
                  <Col span={4}>
                    <Form.Item className='c-form-item' label={innerText?.Çeknömrəsi} name='number_check' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                      <Input className='c-input' placeholder={innerText?.inputPlaceholder} />
                    </Form.Item>
                  </Col>
                }
                <Col span={4}>
                  <Form.Item className='c-form-item' label={innerText?.Valyuta} name='currency_id' rules={[{ required: true, message: innerText?.formRequiredMessage }]}>
                    <Select className='c-select' allowClear showSearch disabled={payment === 'contract' ? true : false} filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder={innerText?.selectPlaceholder}>
                      {currencyType?.map(a => (
                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* Buradan baslayacam language qosmaga */}
          <Row style={{ border: '1px solid lightgray', borderRadius: '5px', margin: '1.5rem 0' }}>
            <Popconfirm
              icon={<WarningOutlined />}
              title="Seçilmiş PRF-lər"
              description={<p>Qeyd edilən seçimləriniz silinəcək. <b>Əminsinizmi?</b></p>}
              onConfirm={handleChoosenPRFStatus}
              onCancel={cancel}
              okText="Bəli"
              cancelText="Xeyr"
            >
              <Col span={8}><Text className={`${allPrf === 'selected' && `${styles.activeTabButton} ${styles.activeArrow}`} ${styles.tabButton}`}>Seçilmiş PRF-lər</Text></Col>
            </Popconfirm>
            <Popconfirm
              icon={<WarningOutlined />}
              title="Parçalanmış PRF-lər"
              description={<p>Qeyd edilən seçimləriniz silinəcək. <b>Əminsinizmi?</b></p>}
              onConfirm={handleFragmentedPRFStatus}
              onCancel={cancel}
              okText="Bəli"
              cancelText="Xeyr"
            >
              <Col span={8}><Text className={`${allPrf === 'fragmented' && `${styles.activeTabButton} ${styles.activeArrow}`} ${styles.tabButton}`}  >Parçalanmış PRF-lər</Text></Col>
            </Popconfirm>
            <Popconfirm
              icon={<WarningOutlined />}
              title="Yeni məhsullar"
              description={<p>Qeyd edilən seçimləriniz silinəcək. <b>Əminsinizmi?</b></p>}
              onConfirm={handleFromNewStatus}
              onCancel={cancel}
              okText="Bəli"
              cancelText="Xeyr"
            >
              <Col span={8}><Text className={`${allPrf === 'new' && `${styles.activeTabButton} ${styles.activeArrow}`} ${styles.tabButton}`} >Yeni məhsullar</Text></Col>
            </Popconfirm>
          </Row >
          {/* Trasfer List Start */}
          <Row>
            {allPrf === 'selected' &&
              <Col span={24}>
                <TransferList />
              </Col>
            }
            {allPrf === 'fragmented' &&
              <Col
                span={24}
                direction="vertical"
                size="middle"
                style={{
                  display: 'flex',
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <Row gutter={24} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Col style={{ width: '50%' }}>
                    <Card title={<p><span>Avtomatik tamamlama:</span></p>} >
                      <Row>
                        <Col span={24} className={styles.seperateCol} onScroll={(e) => {
                          scrollTop = e.target.scrollTop
                          scrollRef.current.scrollTop = scrollTop
                        }}>
                          {leftData?.length === 0
                            ?
                            <span style={{ width: '100%', height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </span>
                            :
                            leftData?.map((data, index) => (
                              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {
                                  data?.product?.map((dat, ind) => (
                                    <InputNumber
                                      style={{ width: '100%', margin: '.3rem  0' }}
                                      addonBefore={<span style={{ display: 'inline-block', width: '420px' }}>{data.name} - {dat?.description?.name}</span>}
                                      addonAfter={<span style={{ display: 'inline-block', width: '100px' }}>Cəmi: {originalData?.[index]?.product?.[ind]?.quantity}</span>}
                                      type='number'
                                      min={0}
                                      defaultValue={dat?.quantity}
                                      value={dat?.quantity}
                                      onChange={(value) => changeCountLeft(value, index, ind)} />
                                  ))
                                }
                              </div>
                            ))}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col style={{ width: '50%' }}>
                    <Card title={
                      <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Seçildi:</span>
                        <Text onClick={showFragmentedProducts} className={styles.transferBtn}>Göstər</Text>
                      </p>
                    }>
                      <Row>
                        <Col ref={scrollRef} span={24} className={styles.seperateCol} onScroll={(e) => {
                          e.target.scrollTop = scrollTop
                        }}>
                          {rightData?.length === 0
                            ?
                            <span style={{ width: '100%', height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </span>
                            :
                            rightData?.map((data, index) => (
                              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {
                                  data?.product?.map((dat, ind) => (
                                    <InputNumber
                                      disabled
                                      style={{ width: '100%', margin: '.3rem  0' }}
                                      addonBefore={<span style={{ display: 'inline-block', width: '420px' }}>{data.name} - {dat?.description?.name}</span>}
                                      addonAfter={<span style={{ display: 'inline-block', width: '100px' }}>Cəmi: {originalData?.[index]?.product?.[ind]?.quantity}</span>}
                                      type='number'
                                      min={0}
                                      defaultValue={dat?.quantity}
                                      value={dat?.quantity}
                                    />
                                  ))
                                }
                              </div>
                            ))}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Col >
            }
          </Row>
          {/* Trasfer List End */}
          <Row style={{ marginTop: '10px', justifySelf: 'flex-end' }}>
            <Col style={{ width: '100%' }}>
              <Tabs animated={true} type="card" defaultActiveKey="1" onChange={(key) => { if (key === '3') { setCostTab(false) } }} >
                <Tabs.TabPane tab={<span> {allPrf === 'new' && <span>Yeni Məhsullar</span>} {allPrf === 'selected' && <span>Seçilmiş PRF Məhsullar</span>} {allPrf === 'fragmented' && <span>Parçalanmış PRF Məhsullar</span>} </span>} key="1">
                  {allPrf !== 'new' && <PrfProduct />} {allPrf === 'new' && <NewProduct />}
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Əlavə xərclər <b style={{ color: 'crimson' }}>{costTab && ': Boşdur'}</b> </span>} key="3">
                  <AdditionalCosts />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
          <Row>
            <Col style={{ display: 'flex' }}>
              <Col style={{ marginRight: '2rem' }}><Text style={{ marginRight: '.3rem' }} disabled>Vergi daxili məbləğ:</Text><Text>100AZN</Text></Col>
              <Col style={{ marginRight: '2rem' }}><Text style={{ marginRight: '.3rem' }} disabled>Ümümi vergi məbləği:</Text><Text>100AZN</Text></Col>
              <Col style={{ marginRight: '2rem' }}><Text style={{ marginRight: '.3rem' }} disabled>Toplam məbləğ:</Text><Text>100AZN</Text></Col>
            </Col>
          </Row>
          <Row align='end' className='fixed-submit-buttons'>
            <Button className='c-btn c-btn--primary' type='primary' htmlType="submit">Yadda saxla</Button>
            <Button onClick={Close} className='c-btn c-btn--secondary'>Bağla</Button>
          </Row>
        </Form >
        <Loader loading={loading} />
      </Drawer >
    </BillInsertContext.Provider>
  )
}
export default Index;