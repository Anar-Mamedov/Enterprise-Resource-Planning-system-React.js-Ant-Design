import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Row, Col, Button, Form, Input, Select, Switch, TreeSelect, Space, Typography } from 'antd';
import API from '../../../../API'
import styles from './style.module.scss'
import { BillInsertContext, useContext } from '../../Context/context';
const { Option } = Select;
const { Title } = Typography;
const Index = () => {
    const { distribution, novState, setCostTab, suppliers, taxEdv, checkbox, setCheckbox, renderTreeNodes, journalsTop } = useContext(BillInsertContext)
    // const [distribution, setDistribution] = useState([])
    // const [novState, setNovState] = useState([])
    // const getDistributionFunc = () => {
    //     API.Procurement.Picklist.distribution().then(res => {
    //         if (res.status === 200) {
    //             setDistribution(res.data.data)
    //         }
    //     })
    // }
    // const getNovFunc = () => {
    //     API.Procurement.Picklist.list().then(res => {
    //         if (res.status === 200) {
    //             setNovState(res.data.data)
    //         }
    //     })
    // }
    const handleDeleteAddition = (val, i) => {
        if (val?.uuid) {
            let data = {
                "bill_expenses_id": null,
                "prf_expenses_id": val?.uuid
            }
            API.Finance.Bill.additionExpensesDelete(data).then(res => {
                console.log(res);
                delete checkbox[i]
                setCheckbox([...checkbox])
            })
        } else {
            delete checkbox[i]
            setCheckbox([...checkbox])
        }
    }
    // useEffect(() => {
    //     getDistributionFunc()
    //     getNovFunc()
    //     checkbox?.map((val, ind) => {
    //         setItem({ 'addition_expenses': { [ind]: { 'prf_id': val?.prf?.uuid } } })
    //         setItem({ 'addition_expenses': { [ind]: { 'supplier_id': val?.supplier?.uuid } } })
    //         setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_type_id': val?.addition_expenses_type?.uuid } } })
    //         setItem({ 'addition_expenses': { [ind]: { 'distribution_id': val?.distribution?.uuid } } })
    //         setItem({ 'addition_expenses': { [ind]: { 'amount': val?.amount } } })
    //         setItem({ 'addition_expenses': { [ind]: { 'addition_expenses_number': val?.addition_expenses_number } } })
    //         setItem({ 'addition_expenses': { [ind]: { 'tax_id': val?.tax?.uuid } } })
    //     })
    // }, [])
    // console.log(checkbox)
    return (
        <Row style={{ width: '100%' }}>
            {checkbox.map((val, i) => (
                val && val.status &&
                <Col onClick={() => setCostTab(false)} key={i} className={styles.costParent}>
                    <Title className={styles.costTitle}>{val?.prf?.name ?? 'Yeni Əlavə Xərc'}</Title>
                    <Row gutter={12}>
                        <Col span={5}>
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
                                <Input className='c-input' placeholder='Daxil edin' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Əlavə xərc nömrəsi:' name={['addition_expenses', i, 'addition_expenses_number']} rules={[{ required: false, message: 'Zəhmət olmasa doldurun...' }]}>
                                <Input className='c-input' placeholder='Daxil edin' />
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
                            <Form.Item className='c-form-item' label={
                                <span style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Öhdəlik ƏDV dərəcəsi:</span>
                                    <Switch
                                        checked={val.check}
                                        onChange={(checked) => {
                                            checkbox[i].check = checked
                                            setCheckbox([...checkbox])
                                        }} size='small' />
                                </span>}>
                                {checkbox?.[i]?.check === true ? <Form.Item name={['addition_expenses', i, 'tax_id']} rules={[{ required: checkbox[i].check, message: 'Zəhmət olmasa doldurun...' }]} >
                                    <Select className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        {taxEdv?.map(item => (
                                            <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item> : <b><i>ƏDV-dən azad</i></b>}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label={<span></span>}>
                                <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    {checkbox.length > 0 &&
                                        // !checkbox?.[i]?.uuid &&
                                        <Button onClick={() => handleDeleteAddition(val, i)} style={{ flex: '1' }} danger type='dashed'>Sil</Button>
                                    }
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            ))}
            <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} className='d-flex justify-content-center'>
                <Button type='dashed' style={{ height: '38px', display: 'flex', alignItems: 'center' }}
                    onClick={() => {
                        checkbox.push({ status: true })
                        setCheckbox([...checkbox])
                    }}
                >
                    <AiOutlinePlus />
                </Button>
            </Col>
        </Row>
    )
}

export default Index