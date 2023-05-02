import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Row, Col, Button, Form, Input, Select, TreeSelect, Space, Typography } from 'antd';
import API from '../../../../API'
import styles from './style.module.scss'
import { BillUpdateContext, useContext } from '../../Context/context';
const { Option } = Select;
const { Title } = Typography;
const Index = () => {
    const {
        allPrf, additionValues, setAdditionValues, setAdditionalExpensesProducts,
        additionalExpensesProducts, suppliers, taxEdv, renderTreeNodes, journalsTop, setItem,
        // tabState, setItem,
    } = useContext(BillUpdateContext);
    const [distribution, setDistribution] = useState([]);
    const [novState, setNovState] = useState([]);
    const getDistributionFunc = () => {
        API.Procurement.Picklist.distribution().then(res => {
            if (res.status === 200) {
                setDistribution(res.data.data)
            }
        })
    };
    const getNovFunc = () => {
        API.Procurement.Picklist.list().then(res => {
            if (res.status === 200) {
                setNovState(res.data.data)
            }
        })
    };
    const handleDeleteAdditionExpenses = (val, i) => {
        console.log(val);
        let data = {
            "bill_expenses_id": null,
            "prf_expenses_id": val?.uuid
        }
        API.Finance.Bill.additionExpensesDelete(data).then(res => {
            console.log(res);
            delete additionalExpensesProducts[i]
            setAdditionalExpensesProducts([...additionalExpensesProducts])
        })
    };
    const handleDeleteAddition = (val, i) => {
        console.log(val.uuid);
        if (val?.uuid) {
            let data = {
                "bill_expenses_id": val?.uuid,
                "prf_expenses_id": null
            }
            API.Finance.Bill.additionExpensesDelete(data).then(res => {
                console.log(res);
                delete additionValues[i]
                setAdditionValues([...additionValues])
            })
        } else {
            delete additionValues[i]
            setAdditionValues([...additionValues])
        }
    };
    useEffect(() => {
        getDistributionFunc()
        getNovFunc()
    }, [])
    // useEffect(() => {
    //     setAdditionValues(additionValues.filter(el => el))
    //     if (tabState === '3') {
    //         let temp = [...additionValues]
    //         temp = temp?.filter(el => el)
    //         setAdditionValues([...temp])
    //         additionalExpensesProducts.forEach((elem, index) => {
    //             setItem({ 'addition_expenses': { [index]: { 'uuid': null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'prf_id': elem?.prf?.uuid } } })
    //             setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.addition_expenses_type?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid || null } } })
    //             setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount } } })
    //             setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number } } })
    //             setItem({ 'addition_expenses': { [index]: { 'chart_of_account': elem?.chart_account?.uuid } } })
    //             setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': elem?.tax_chart_account?.uuid } } })
    //             setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid || null } } })
    //             temp.unshift(undefined)
    //         })
    //         setAdditionValues([...temp])
    //         temp.forEach((elem, index) => {
    //             if (elem) {
    //                 setItem({ 'addition_expenses': { [index]: { 'uuid': elem?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'prf_id': null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'supplier_id': elem?.supplier?.uuid ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'addition_expenses_type_id': elem?.type?.uuid ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'distribution_id': elem?.distribution?.uuid ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'amount': elem?.amount ?? null } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'addition_expenses_number': elem?.addition_expenses_number } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'chart_of_account': elem?.chart_account?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'tax_chart_of_account_id': elem?.tax_chart_account?.uuid } } })
    //                 setItem({ 'addition_expenses': { [index]: { 'tax_id': elem?.tax?.uuid } } })
    //             }
    //         })
    //     }
    // }, [tabState])
    return (
        <Row style={{ width: '100%' }}>
            {allPrf === 'selected' && additionalExpensesProducts.map((val, i) => (
                val && val.status &&
                <Col key={i} className={styles.costParent}>
                    <Title className={styles.costTitle}>{val?.prf?.name ?? 'Yeni Əlavə Xərc'}</Title>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item name={['addition_expenses', i, 'uuid']} hidden></Form.Item>
                            <Form.Item name={['addition_expenses', i, 'prf_id']} hidden></Form.Item>
                            <Form.Item className='c-form-item' label='Kontragent:' name={['addition_expenses', i, 'supplier_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Select className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {suppliers.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Növ:' name={['addition_expenses', i, 'addition_expenses_type_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {novState.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='ƏX Bölünmə:' name={['addition_expenses', i, 'distribution_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {distribution.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Məbləğ:' name={['addition_expenses', i, 'amount']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Əlavə xərc nömrəsi:' name={['addition_expenses', i, 'addition_expenses_number']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Uçot hesabı:' name={['addition_expenses', i, 'chart_of_account']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
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
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Ədv vergi uçotu:' name={['addition_expenses', i, 'tax_chart_of_account_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
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
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Öhdəlik ƏDV dərəcəsi:' name={['addition_expenses', i, 'tax_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {taxEdv?.map(item => (
                                        <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label={<span></span>}>
                                <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => handleDeleteAdditionExpenses(val, i)} style={{ flex: '1' }} danger type='dashed'>Sil</Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            ))}
            <hr />
            {additionValues.map((val, i) => (
                val &&
                <Col key={i} className={styles.costParent}>
                    <Title className={styles.costTitle}>{val?.prf?.name ? 'Öhdəlik Əlavə Xərc' : 'Yeni Əlavə Xərc'}</Title>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item name={['addition_expenses', i, 'uuid']} hidden></Form.Item>
                            <Form.Item name={['addition_expenses', i, 'prf_id']} hidden></Form.Item>
                            <Form.Item className='c-form-item' label='Kontragent:' name={['addition_expenses', i, 'supplier_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Select className='c-select' allowClear showSearch filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {suppliers.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Növ:' name={['addition_expenses', i, 'addition_expenses_type_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {novState.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='ƏX Bölünmə:' name={['addition_expenses', i, 'distribution_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {distribution.map((a) => (
                                        <Option className='c-select-option' key={a.uuid} value={a.uuid}>{a.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Məbləğ:' name={['addition_expenses', i, 'amount']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input onChange={(e) => {
                                    if (e.target.value < 0) {
                                        setItem({ 'addition_expenses': { [i]: { 'amount': null } } })
                                    } else if (e.target.value.startsWith('0')) {
                                        setItem({ 'addition_expenses': { [i]: { 'amount': null } } })
                                    }
                                }} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Əlavə xərc nömrəsi:' name={['addition_expenses', i, 'addition_expenses_number']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input onChange={(e) => {
                                    if (e.target.value < 0) {
                                        setItem({ 'addition_expenses': { [i]: { 'addition_expenses_number': null } } })
                                    } else if (e.target.value.startsWith('0')) {
                                        setItem({ 'addition_expenses': { [i]: { 'addition_expenses_number': null } } })
                                    }
                                }} type='number' className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Uçot hesabı:' name={['addition_expenses', i, 'chart_of_account']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
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
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Ədv vergi uçotu:' name={['addition_expenses', i, 'tax_chart_of_account_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
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
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Öhdəlik ƏDV dərəcəsi:' name={['addition_expenses', i, 'tax_id']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]} >
                                <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                    {taxEdv?.map(item => (
                                        <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label={<span></span>}>
                                <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => handleDeleteAddition(val, i)} style={{ flex: '1' }} danger type='dashed'>Sil</Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            ))}
            <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} className='d-flex justify-content-center'>
                <Button onClick={() => {
                    setAdditionValues([...additionValues, {}])
                }} type='dashed' style={{ height: '38px', display: 'flex', alignItems: 'center' }} >
                    <AiOutlinePlus />
                </Button>
            </Col>
        </Row>
    )
}

export default Index