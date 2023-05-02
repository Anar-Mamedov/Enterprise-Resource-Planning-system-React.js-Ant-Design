import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Loader } from '../../../Components/index';
import { Row, Col, Form, Input, Drawer, Typography, Select, DatePicker, TreeSelect, Button, Tabs, Tag, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import API from '../../../API';
import dayjs from 'dayjs';
// import { WarningOutlined } from '@ant-design/icons';
import { message } from 'antd'
import TransferList from './TransferList';
import TransferListFragment from './TransferListFragment';
import PrfSelectedUpdate from './PrfSelectedUpdate';
import EtaxesModal from './EtaxesModal';
import AdditionalCosts from './AdditionalCosts';
import NewProduct from './NewProduct';
import { BillTableContext, BillUpdateContext, useContext } from '../Context/context';
const { Text } = Typography;
const { Option } = Select;
let typeVariables = {
    paymentBtn: 'contract',
    prfType: 'selected',
    account: 'pettycash'
}
let updateTArgetKeys = []
let statusColor = {
    draft: "#3b5999",
    rejected: '#f50',
    approved: 'green',
    pending: 'gold'
}
function Index() {
    const { editClose, updateId, setUpdateId, visibleEdit, loading, setLoading } = useContext(BillTableContext)
    //Permission Required && Disabled------------------------------------------------------------------------------------------------------------------------------------
    const [form] = Form.useForm();
    const [showAllDisabled, setShowAllDisabled] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [tabState, setTabState] = useState('1');
    const [collapseKey, setCollapseKey] = useState(null);
    const [costTab, setCostTab] = useState(false);
    const [fragmentedChooseData, setFragmentedChooseData] = useState([]);
    //DependenciesStates------------------------------------------------------------------------------------------------------------------------------------------------
    const [suppliers, setSuppliers] = useState([]);
    const [registrationType, setRegistrationType] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [contractList, setContarctList] = useState([]);
    const [companyDependencies, setCompanyDependencies] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [projects, setProjects] = useState([]);
    const [currencyType, setCurrencyType] = useState([]);
    const [journalsTop, setJournalsTop] = useState([]);
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [prfDataTransferState, setPrfDataTransferState] = useState([]);
    //Tabs--------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [prfSelectedProducts, setPrfSelectedProducts] = useState([]);
    const [additionalExpensesProducts, setAdditionalExpensesProducts] = useState([]);
    const [valueSelectedPrfs, setValueSelectedPrfs] = useState([]);
    const [additionValues, setAdditionValues] = useState([]);
    const [newProductTab, setNewProductTab] = useState([])
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [targetKeys, setTargetKeys] = useState([]);
    const [payment, setPayment] = useState('contract');
    const [eTaxesCheck, setEtaxesCheck] = useState('')
    const [account, setAccount] = useState('pettycash');
    const [direction_type, setDirection_type] = useState('warehouse');
    const [allPrf, setAllPrf] = useState('selected')
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    const [warehouseProductCategory, setWarehouseProductCategory] = useState([]);
    const [bankTime, setBankTime] = useState([]);
    const [taxEdv, setTaxEdv] = useState([]);
    const [itemUnit, setItemUnit] = useState([]);
    const [requiredData, setRequiredData] = useState([])
    function onFinish(value) {
        let checkReq = [...prfSelectedProducts]
        checkReq = checkReq.filter(el => el.status)
        let res = checkReq.every(filter => !filter.collapse)
        if (res && costTab) {
            value = {
                ...value,
                billed_date: dayjs(value.billed_date, "YYYY-MM-DD").format("YYYY-MM-DD"),
                accounting_date: value.accounting_date ? dayjs(value.accounting_date, "YYYY-MM-DD").format("YYYY-MM-DD") : null,
                payment_income_date: value.payment_income_date ? dayjs(value.payment_income_date, "YYYY-MM-DD").format("YYYY-MM-DD") : null,
                receiving_account_type: account,
                payment_type: payment,
                direction_type: direction_type,
                prf_type: allPrf,
                addition_expenses: value?.addition_expenses?.filter(el => el),
                prfs: value?.prfs?.filter(el => el).flat()
            };
            console.log('success', value);
            API.Finance.Bill.update(updateId, value).then(res => {
                setLoading(true)
                if (res.status === 200) {
                    setLoading(false)
                    Close()
                } else {
                    setLoading(false)
                    const messages = res.data.data;
                    for (let key in messages) setFormError(key, messages[key]);
                }
            })
        } else {
            message.error('Zəhmət olmasa boş xanaları doldurun!')
        }
    }
    const onFinishFailed = (value) => console.log('error', value);
    const Close = () => {
        editClose();
        form.resetFields();
        setAdditionValues([]);
        setAdditionalExpensesProducts([]);
        setTabState('1');
        setCollapseKey(null)
        // setPrfSelectedProducts(prfSelectedProducts.map(a => a.status === false))
        setPrfSelectedProducts([]);
        setUpdateId(null);
        setAllPrf('close');
        setNewProductTab([]);
        setFragmentedChooseData([]);
        // setContarctList([]);
        // setCompanyDependencies([]);
        setShowAllDisabled(true)
        setCostTab(false);
        typeVariables.paymentBtn = 'contract';
        typeVariables.prfType = 'selected';
    };
    const showModal = () => setOpenModal(true);
    const getShowApi = () => {
        if (updateId) {
            API.Finance.Bill.show(updateId).then(res => {
                setLoading(true)
                console.log(res.data.data)
                if (res.status === 200) {
                    setLoading(false)
                    form.setFields([{ name: 'registration_type_ids', value: res?.data?.data?.registration_types?.map(el => el.uuid), errors: null }])
                    form.setFields([{ name: 'organization_id', value: res?.data?.data?.company?.uuid, errors: null }])
                    form.setFields([{ name: 'supplier_id', value: res?.data?.data?.supplier?.uuid, errors: null }])
                    form.setFields([{ name: 'contract_id', value: res?.data?.data?.payment_contract?.contract?.uuid, errors: null }])
                    form.setFields([{ name: 'receiving_account_company_id', value: res?.data?.data?.receiving_account_company_id, errors: null }])
                    form.setFields([{ name: 'receiving_account_type_id', value: res?.data?.data?.receiving_account_type_id, errors: null }])
                    res?.data?.data?.billed_date && form.setFields([{ name: 'billed_date', value: dayjs(res?.data?.data?.billed_date), errors: null }])
                    res?.data?.data?.accounting_date && form.setFields([{ name: 'accounting_date', value: dayjs(res?.data?.data?.accounting_date), errors: null }])
                    res?.data?.data?.payment_income_date && form.setFields([{ name: 'payment_income_date', value: dayjs(res?.data?.data?.payment_income_date), errors: null }])
                    form.setFields([{ name: 'chart_of_account_id', value: res?.data?.data?.chart_account?.uuid, errors: null }])
                    form.setFields([{ name: 'number_check', value: res?.data?.data?.number_check, errors: null }])
                    form.setFields([{ name: 'number_invoice', value: res?.data?.data?.number_invoice, errors: null }])
                    form.setFields([{ name: 'direction_type_ids', value: res?.data?.data?.direction_type_ids?.map(el => el), errors: null }])
                    form.setFields([{ name: 'currency_id', value: res?.data?.data?.currency?.uuid, errors: null }])
                    typeVariables.paymentBtn = res?.data?.data?.payment_type;
                    typeVariables.prfType = res?.data?.data?.prf_type;
                    typeVariables.account = res?.data?.data?.receiving_account_type
                    updateTArgetKeys = res?.data?.data?.checked_prfs
                    setCurrentStatus(res?.data?.data?.transaction?.status_type)
                    setPayment(res?.data?.data?.payment_type)
                    setEtaxesCheck(res?.data?.data?.payment_type)
                    setAccount(res?.data?.data?.receiving_account_type)
                    setDirection_type(res?.data?.data?.direction_type)
                    setAllPrf(res?.data?.data?.prf_type)
                    setTargetKeys(res?.data?.data?.checked_prfs)
                    setFragmentedChooseData(res?.data?.data?.checked_prfs)
                    setValueSelectedPrfs(res?.data?.data?.prfs)
                    typeVariables.prfType === 'new' && setNewProductTab(res?.data?.data?.prfs?.[0]?.products)
                    setAdditionValues(res?.data?.data?.addition_expenses)
                    getTehtelKassa()
                    getPrfTransferData(updateTArgetKeys)
                    getContracts()
                }
            })
        }
    }
    //--------------------------------------------------
    const setItem = (value) => form.setFieldsValue(value);
    //API Start-----------------------------------------
    const getRegistrationTypeList = () => {
        API.Finance.Picklist.registrationTypeList().then(res => {
            setRegistrationType([...res.data.data]);
        })
    };
    const getOrganizationList = () => {
        API.Finance.Organization.list().then(res => {
            setOrganization([...res.data.data]);
        })
    };
    const getSuppliersList = () => {
        API.Procurement.Suppliers.list().then(res => {
            setSuppliers([...res.data.data])
        })
    };
    const getJournals = () => {
        API.Finance.Bill.journals().then(res => {
            if (res.status === 200) {
                setJournalsTop([...res.data.data])
            }
        })
    };
    const getCurrencyType = () => {
        API.Finance.CurrencyType.list().then(res => {
            setCurrencyType(res.data.data);
        })
    };
    const handleActivePayment = (name) => {
        setPayment(name)
        typeVariables.paymentBtn = name
        if (name === 'cash') {
            form.setFields([{ name: 'contract_id', value: [], errors: [] }])
            form.setFields([{ name: 'currency_id', value: [], errors: [] }])
        } else {
            form.setFields([{ name: 'currency_id', value: [], errors: [] }])
        }
        setTargetKeys([])
        getPrfTransferData()
        handleResetBelows()
    };
    const handleActiveCompany = (name) => {
        typeVariables.account = name;
        setAccount(name)
        setCompanyDependencies([])
        form.setFields([{ name: 'receiving_account_company_id', value: [], errors: null }])
        form.setFields([{ name: 'receiving_account_type_id', value: [], errors: null }])
    };
    const handleActiveDirection = (name) => {
        setDirection_type(name);
        form.setFields([{ name: "direction_type_ids", value: [], errors: null }]);
    };
    const getContracts = (change) => {
        // form.setFields([{ name: 'contract_id', value: [], errors: ['Zəhmət olmasa doldurun...'] }])
        const contracts = { bill_id: updateId, supplier_id: form.getFieldValue('supplier_id') || null, organization_id: form.getFieldValue('organization_id') || null }
        setLoading(true)
        API.Finance.Bill.contracts(JSON.stringify(contracts)).then(res => {
            setLoading(false)
            setContarctList(res.data.data)
        })
        if (change) {
            handleResetBelows()
            setTargetKeys([])
            setPrfSelectedProducts(prfSelectedProducts.map(a => a.status === false))
            getPrfTransferData()
        }
    };
    const getTehtelKassa = (status) => {
        const data = { type: typeVariables?.account, receiving_account_company_id: form.getFieldValue('receiving_account_company_id') || null }
        if (data.receiving_account_company_id) {
            setLoading(true)
            API.Finance.Bill.receivingAccount(JSON.stringify(data)).then(res => {
                setLoading(false)
                setCompanyDependencies([...res.data.data])
            })
        } else {
            setCompanyDependencies([])
        }
        if (status === 'show') form.setFields([{ name: 'receiving_account_type_id', value: null, errors: ['Zehmət olmasa doldurun...'] }])
    };
    const getProjects = () => {
        API.Com.Project.list().then(res => {
            setProjects([...res.data.data])
        })
    };
    const getWarehouseNames = () => {
        API.Warehouse.WarehouseNames.list().then(res => {
            setWarehouse([...res.data.data])
        })
    };
    const getPrfTransferData = (target) => {
        const data = {
            'bill_id': updateId,
            'prf_type': typeVariables.prfType,
            'payment_type': typeVariables.paymentBtn,
            'supplier_id': form.getFieldValue('supplier_id') || null,
            'organization_id': form.getFieldValue('organization_id') || null,
            'contract_id': typeVariables.paymentBtn === 'contract' ? form.getFieldValue('contract_id') : null,
        }
        setLoading(true)
        API.Finance.Bill.getPRF(JSON.stringify(data)).then(res => {
            if (res.status === 400) {
                const messages = res.data.data;
                for (let key in messages) setFormError(key, messages[key]);
                setPrfDataTransferState([])
            } else {
                setLoading(false)
                let data = res?.data?.data.map((el) => {
                    return {
                        ...el, key: el.uuid
                    }
                });
                let forSelectedProducts = res?.data?.data.map((el) => el.uuid);
                const dat = { bill_id: updateId, prf_ids: [...forSelectedProducts] }
                const dat2 = { bill_id: updateId, prfs: [...forSelectedProducts] }
                if (dat.prf_ids.length !== 0) {
                    API.Finance.Bill.prfSelectedProducts(dat).then(res => {
                        const datas = res.data.data.map((el) => {
                            const modifiedProducts = el.products.map((c) => ({ ...c, status: false }));
                            return { ...el, status: false, collapse: true, products: modifiedProducts };
                        });
                        if (typeVariables.prfType === 'selected') {
                            target && target.forEach(tar => {
                                datas.forEach(dat => {
                                    if (tar === dat?.uuid) {
                                        dat?.products?.map(v => v.status = true)
                                        dat.status = true;
                                        dat.collapse = true;
                                    }
                                })
                            })
                            setPrfSelectedProducts([...datas])
                        } else {
                            target && target.forEach(tar => {
                                datas.forEach(dat => {
                                    if (tar?.prf_id === dat?.uuid) {
                                        dat.status = true;
                                        dat.collapse = true;
                                        dat.products.forEach((d) => {
                                            if (d?.uuid === tar?.product_id) {
                                                d.status = true
                                            }
                                        })
                                    }
                                })
                            })
                            setPrfSelectedProducts([...datas])
                        }
                    })
                    API.Finance.Bill.getPRFExpenses(JSON.stringify(dat2)).then(res => {
                        const datas2 = res.data.data.map((el => {
                            return {
                                ...el, status: false, differ: true
                            }
                        }))
                        target && target.forEach(tar => {
                            datas2.forEach(dat => {
                                if (tar === dat.prf.uuid) {
                                    dat.status = true;
                                }
                            })
                        })
                        setAdditionalExpensesProducts([...datas2])
                    })
                }
                setPrfDataTransferState([...data])
            }
        })
    };
    const getWareHouseProductCategory = () => {
        API.Finance.Bill.warehouseProductCategory().then(res => {
            setWarehouseProductCategory(res.data.data)
        })
    };
    const getBankTime = () => {
        API.Finance.Picklist.time().then(res => {
            setBankTime(res.data.data)
        })
    };
    const getTaxEdv = () => {
        API.Finance.Picklist.tax().then(res => {
            setTaxEdv(res.data.data)
        })
    };
    const getItemUnit = () => {
        API.Warehouse.ItemUnit.list().then(res => {
            setItemUnit(res.data.data)
        })
    };
    const addCostSetValueHandle = (v) => {
        if (v) {
            console.log(additionalExpensesProducts);
            setAdditionValues(additionValues.filter(el => el))
            let temp = [...additionValues]
            temp = temp?.filter(el => el)
            setAdditionValues([...temp])
            additionalExpensesProducts.forEach((elem, index) => {
                setItem({ 'addition_expenses': { [index]: { 'uuid': null } } })
                setItem({ 'addition_expenses': { [index]: { 'prf_id': elem?.prf?.uuid } } })
                setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid || null } } })
                setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.addition_expenses_type?.uuid || null } } })
                setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid || null } } })
                setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount } } })
                setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number } } })
                setItem({ 'addition_expenses': { [index]: { 'chart_of_account': elem?.chart_account?.uuid } } })
                setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': elem?.tax_chart_account?.uuid } } })
                setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid || null } } })
                temp.unshift(undefined)
            })
            setAdditionValues([...temp])
            console.log(temp);
            temp.forEach((elem, index) => {
                if (elem) {
                    setItem({ 'addition_expenses': { [index]: { 'uuid': elem?.uuid } } })
                    setItem({ 'addition_expenses': { [index]: { 'prf_id': null } } })
                    setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid ?? null } } })
                    setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.type?.uuid ?? null } } })
                    setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid ?? null } } })
                    setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount ?? null } } })
                    setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number } } })
                    setItem({ 'addition_expenses': { [index]: { 'chart_of_account': elem?.chart_account?.uuid } } })
                    setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': elem?.tax_chart_account?.uuid } } })
                    setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid } } })
                }
            })
        }
    }
    //Reset Below Tabs PRF SELECTED--------------------------------
    const handleResetBelows = () => {
        prfSelectedProducts?.forEach((element, index) => {
            setItem({ 'prfs': { [index]: { 'id': element.uuid } } })
            element?.products?.forEach((_, ind) => {
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_product_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'description_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_description_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_quantity': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'quantity': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_idView': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'amount': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_amount': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accounting_account_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_unit_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_amount': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_idView': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_tax_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_accounting_account_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration_id': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accepted_commitment': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_tax_amount': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'note': null } } } } })
                setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': null } } } } })
            })
        })
        additionalExpensesProducts.forEach((elem, index) => {
            setItem({ 'addition_expenses': { [index]: { 'prf_id': null } } })
            setItem({ 'addition_expenses': { [index]: { 'supplier_id': null } } })
            setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': null } } })
            setItem({ 'addition_expenses': { [index]: { 'distribution_id': null } } })
            setItem({ 'addition_expenses': { [index]: { 'amount': null } } })
            setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': null } } })
            setItem({ 'addition_expenses': { [index]: { 'chart_of_account': null } } })
            setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': null } } })
            setItem({ 'addition_expenses': { [index]: { 'tax_id': null } } })
        })
        additionValues.forEach((el, ind) => {
            setItem({ 'addition_expenses': { [ind]: { 'prf_id': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'supplier_id': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_type_id': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'distribution_id': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'amount': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_number': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'chart_of_account': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'tax_chart_of_account_id': null } } })
            setItem({ 'addition_expenses': { [ind]: { 'tax_id': null } } })
        })
    }
    //SetError------------------------------------------
    const setFormError = (name, errors) => {
        name = name.split('.').map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
        form.setFields([{ name, errors }]);
    }
    // Custonm TreeSelect >>>
    const renderTreeNodes = (nodes) => {
        return nodes?.map((node, i) => {
            if (node.children) {
                return (
                    <TreeSelect.TreeNode disabled={node.disable === true ? true : false} value={node.uuid} title={`${node.number}. ${node.name}`} key={node.uuid}>
                        {renderTreeNodes(node.children)}
                    </TreeSelect.TreeNode>
                );
            }
            return <TreeSelect.TreeNode disabled={node.disable === true ? true : false} value={node.uuid} title={`${node.number}. ${node.name}`} key={node.uuid} />;
        });
    };
    // <<< Custonm TreeSelect
    useEffect(() => {
        getRegistrationTypeList();
        getOrganizationList();
        getSuppliersList();
        getCurrencyType();
        getJournals();
        getProjects();
        getWarehouseNames();
        getWareHouseProductCategory();
        getBankTime();
        getTaxEdv();
        getItemUnit();
    }, []);
    useEffect(() => {
        if (updateId !== null) {
            setLoading(true)
        }
        getShowApi();
    }, [updateId]);
    //API END-------------------------------------------
    const updateData = {
        setItem, setAdditionalExpensesProducts, additionalExpensesProducts, additionValues, prfSelectedProducts,
        setPrfSelectedProducts, targetKeys, setTargetKeys, prfDataTransferState, fragmentedChooseData, updateId,
        valueSelectedPrfs, form, warehouseProductCategory, bankTime, taxEdv, itemUnit, journalsTop, renderTreeNodes,
        allPrf, newProductTab, setNewProductTab, tabState, setAdditionValues, suppliers, openModal, setOpenModal,
        requiredData, collapseKey, setCollapseKey, setLoading, eTaxesCheck
    }
    return (
        <BillUpdateContext.Provider value={updateData}>
            <Drawer
                closable={false}
                className='c-drawer'

                title={
                    <Space>
                        <Tag color='red' onClick={Close} style={{ cursor: 'pointer' }}><CloseOutlined /></Tag>
                        <span>Düzəliş et</span>
                    </Space>
                }
                extra={
                    <Space>
                        <Tag style={{cursor: 'pointer'}} onClick={() => { setShowAllDisabled(prev => !prev) }} color='#28C76F'>{showAllDisabled ? 'Göstər' : 'Gizlət'}</Tag>
                        <Tag color={statusColor[currentStatus?.key]}>{currentStatus?.name}</Tag>
                    </Space>
                }
                afterOpenChange={(v) => addCostSetValueHandle(v)}
                width={('100%')}
                onClose={editClose}
                open={visibleEdit}
                bodyStyle={showAllDisabled ? { paddingBottom: 80, opacity: .5, pointerEvents: 'none', userSelect: 'none' } : { paddingBottom: 80, opacity: 1, pointerEvents: 'all' }}
            >
                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row>
                        <Col span={24} >
                            <Row style={{ marginBottom: '1rem' }}> <Text type="success">Əsas məlumatlar:</Text> </Row>
                            <Row style={{ width: '100%', height: '125px' }} gutter={12}>
                                <Col span={4}>
                                    <Form.Item className='c-form-item' label='Qeydiyyat listi:'
                                        name='registration_type_ids'
                                        rules={[{
                                            required: requiredData.Required('registration_type_ids'),
                                            message: 'Zəhmət olmasa doldurun...'
                                        }]}
                                    >
                                        <Select
                                            className='c-select' allowClear
                                            showSearch
                                            style={{ overflowY: 'scroll' }}
                                            mode="multiple"
                                            filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                            placeholder="Please select"
                                        >
                                            {registrationType?.map((a) => (
                                                <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item className='c-form-item' label='Təşkilat:' name='organization_id' rules={[{
                                        required: false,
                                        message: 'Zəhmət olmasa doldurun...'
                                    }]} >
                                        <Select
                                            allowClear showSearch
                                            className='c-select'
                                            filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                            placeholder='Seçim edin'
                                            onChange={() => { getContracts(true) }}
                                        >
                                            {organization.map((a) => (
                                                <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item className='c-form-item' label='Təchizatçı:' name='supplier_id' rules={[{
                                        required: false,
                                        message: 'Zəhmət olmasa doldurun...'
                                    }]}>
                                        <Select showSearch allowClear
                                            className='c-select'
                                            filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                            placeholder='Seçim edin'
                                            onChange={() => { getContracts(true) }}
                                        >
                                            {suppliers.map((a) => (
                                                <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label='Ödəniş:'>
                                        <Text className={`${payment === 'contract' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={() => { handleActivePayment('contract') }} >Müqavilə</Text>
                                        <Text className={`${payment === 'cash' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={() => { handleActivePayment('cash') }} >Nəğd</Text>
                                        {payment === 'contract' && <Form.Item className='c-form-item' name='contract_id' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                            <Select allowClear showSearch
                                                className='c-select'
                                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                placeholder='Seçim edin'
                                                onChange={() => {
                                                    if (form.getFieldValue('contract_id') === undefined) {
                                                        form.setFields([{ name: 'currency_id', value: [], errors: ['Zəhmət olmasa müqavilə seçin...'] }])
                                                    } else {
                                                        let currency = contractList.filter(a => a.uuid === form.getFieldValue('contract_id'))
                                                        form.setFields([{ name: 'currency_id', errors: null }])
                                                        form.setFieldValue('currency_id', currency[0].currency.uuid)
                                                    }
                                                }}
                                            >
                                                {contractList?.map((a, index) => (
                                                    <Option className='c-select-option' key={index} value={a.uuid}>{a.name}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label='Qəbul edən hesab:'>
                                        <Text className={`${account === 'pettycash' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={() => handleActiveCompany('pettycash')}>Təhtəl</Text>
                                        <Text className={`${account === 'box' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={() => handleActiveCompany('box')}>Kassa</Text>
                                        <div style={{ display: 'flex' }}>
                                            <Form.Item className='c-form-item' style={{ width: '50%' }} name='receiving_account_company_id' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                                <Select allowClear showSearch
                                                    className='c-select'
                                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                    style={{ width: '100%', height: '38px' }} placeholder='Şirkət'
                                                    onChange={() => getTehtelKassa('show')}
                                                >
                                                    {organization.map((a) => (
                                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            {account === 'pettycash' &&
                                                <Form.Item className='c-form-item' style={{ width: '50%' }} name='receiving_account_type_id' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                                    <Select className='c-select' allowClear showSearch style={{ width: '100%', height: '38px' }} filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Tehtel'>
                                                        {companyDependencies?.map(a => (
                                                            <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            }
                                            {account === 'box' &&
                                                <Form.Item className='c-form-item' style={{ width: '50%' }} name='receiving_account_type_id' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                                    <Select className='c-select' allowClear showSearch style={{ width: '100%', height: '38px' }} filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Kassa'>
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
                                    <Form.Item label='İstiqamət:'>
                                        <Text className={`${direction_type === 'warehouse' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={() => handleActiveDirection('warehouse')}>Anbar</Text>
                                        <Text className={`${direction_type === 'project' && styles.activePaymentStatus} ${styles.paymentBtn}`} onClick={() => handleActiveDirection('project')}>Layihə</Text>
                                        {direction_type === 'warehouse' &&
                                            <Form.Item className='c-form-item' name='direction_type_ids' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                                <Select className='c-select' showSearch mode='multiple' style={{ minHeight: '38px', overflowY: 'scroll' }} filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Anbar Seçim edin' >
                                                    {warehouse?.map(a => (
                                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        }
                                        {direction_type === 'project' &&
                                            <Form.Item className='c-form-item' name='direction_type_ids' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                                <Select className='c-select' showSearch mode='multiple' style={{ minHeight: '38px', overflowY: 'scroll' }} filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Layihe Seçim edin'>
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
                                    <Form.Item className='c-form-item' label='Öhdəlik yazılışı:' name='billed_date' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                        <DatePicker style={{ width: '100%', height: '38px' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label='Mühasibatlıq tarixi:' name='accounting_date' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                        <DatePicker style={{ width: '100%', height: '38px' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label='Ödənişin qəbul tarixi:' name='payment_income_date' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                        <DatePicker style={{ width: '100%', height: '38px' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item className='c-form-item' label='Jurnal:' name='chart_of_account_id' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                        <TreeSelect
                                            className='c-select'
                                            showSearch
                                            placeholder="Please select"
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
                                        <Form.Item className='c-form-item' label='İnvoys nömrəsi:' name='number_invoice' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                            <Input className='c-input' placeholder='Daxil edin' />
                                        </Form.Item>
                                    </Col>
                                }
                                {payment === 'cash' &&
                                    <Col span={4}>
                                        <Form.Item className='c-form-item' label='Çek nömrəsi:' name='number_check' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                            <Input className='c-input' placeholder='Daxil edin' />
                                        </Form.Item>
                                    </Col>
                                }
                                <Col span={2}>
                                    <Form.Item className='c-form-item' label='Valyuta:' name='currency_id' rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                        <Select className='c-select' allowClear showSearch disabled={payment === 'contract' ? true : false} filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                            {currencyType?.map((a, index) => (
                                                <Option className='c-select-option' key={index} value={a.uuid}>{a.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {payment === 'contract' && <Col span={2}>
                                    <Form.Item label={<span></span>}>
                                        <Button onClick={showModal} className={styles.etaxes}>E-Taxes</Button>
                                    </Form.Item>
                                </Col>}
                            </Row>
                            <Row style={{ border: '1px solid lightgray', borderRadius: '5px', margin: '1.5rem 0' }}>
                                <Col span={8}><Text className={`${allPrf === 'selected' && `${styles.activeTabButton} ${styles.activeArrow}`} ${styles.tabButton}`}>Seçilmiş PRF-lər</Text></Col>
                                <Col span={8}><Text className={`${allPrf === 'fragmented' && `${styles.activeTabButton} ${styles.activeArrow}`} ${styles.tabButton}`}  >Parçalanmış PRF-lər</Text></Col>
                                <Col span={8}><Text className={`${allPrf === 'new' && `${styles.activeTabButton} ${styles.activeArrow}`} ${styles.tabButton}`} >Yeni məhsullar</Text></Col>
                            </Row >
                            {allPrf === 'selected' && <Row><Col><TransferList /></Col></Row>}
                            {allPrf === 'fragmented' && <Row><Col span={24}><TransferListFragment /></Col></Row>}
                            <Row style={{ marginTop: '10px', justifySelf: 'flex-end' }}>
                                <Col style={{ width: '100%' }}>
                                    <Tabs onChange={(key) => {
                                        setTabState(key)
                                        if (key === '3') {
                                            setCostTab(true)
                                        }
                                    }} animated={true} type="card" activeKey={tabState}
                                    >
                                        <Tabs.TabPane key='1' tab={<span> {allPrf === 'new' && <span>Yeni Məhsullar</span>} {allPrf === 'selected' && <span>Seçilmiş PRF Məhsullar</span>} {allPrf === 'fragmented' && <span>Parçalanmış PRF Məhsullar</span>} </span>}>
                                            {allPrf !== 'new' && <PrfSelectedUpdate />}
                                            {allPrf === 'new' && <NewProduct />}
                                        </Tabs.TabPane>
                                        {/* <Tabs.TabPane tab={<span>Jurnal </span>} key="2"> <p>Jurnallar</p></Tabs.TabPane> */}
                                        <Tabs.TabPane tab={<span>Əlavə xərclər {!costTab && <b style={{ color: 'crimson' }}>- Boş buraxıla bilməz!</b>}</span>} key='3'> <AdditionalCosts /></Tabs.TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Col>
                        <Col><EtaxesModal /></Col>
                    </Row>
                    <Row align='end' className='fixed-submit-buttons'>
                        <Button onClick={Close} className='c-btn c-btn--danger'>Bağla</Button>
                        <Button className='c-btn c-btn--primary' type='primary' htmlType="submit">Yadda saxla</Button>
                    </Row>
                </Form >
                <Loader loading={loading} />
            </Drawer >
        </BillUpdateContext.Provider >
    )
}
export default Index;