import React, { useState, useEffect, useRef } from 'react'
import style from './style.module.scss';
import {
    Row, Col, Button,
    Form, Input, Drawer,
    Checkbox, Select,
    Radio, Divider
} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import API from '../../../API'
import { Languages } from "../../../Config";
const { Option } = Select;
const innerText = Languages.SelectLanguage("ChartOfAccount");

function Index(props) {
    const [disabled, setDisabled] = useState(true)
    const [subkontoList, setSubkontoList] = useState([])
    const [kontoPlansParentsList, setKontoPlansParents] = useState([])
    const [childInput, setChildInput] = useState([])
    const [sortedAlqo, setSortedAlqo] = useState({})
    const plainOptions = ['Aktiv', 'Passiv', 'Aktiv/Passiv'];
    const subOptions = ['turnovers_accounting', 'amount_accounting', 'quantity_account', 'currency_account'];
 
    let algorithmList = useRef({})
    let formRef = useRef()
    let checkedBox = useRef([])
    const accountObj = useRef({
        "currency_accounting": 0,
        "amount_accounting": 0,
        "division_accounting": 0,
        "tax_accounting": 0,
    })
    const accountingObj = useRef([])
    let code;

    const Close = (uuid) => {
        props.onClose()
        formRef.current.resetFields()
    }

    const setFormError = (name, messages) => {
        formRef.current.setFields([{ name, errors: [...messages] }]);
    }

    const store = (data) => {
        API.Finance.KontoPlans.store(data).then(res => {
            if (res.status === 201) {
                Close();
                formRef.current.resetFields()
            } else {
                const messages = res.data.data;
                for (let key in messages) setFormError(key, messages[key]);
            }
        })
    }

    const onFinish = (value) => {
        value.plans = value.plans?.filter(val => val)
        value.subkonto_id = value.subkonto_id?.filter(val => val)
        accountObj.current = ({
            "currency_accounting": 0,
            "amount_accounting": 0,
            "division_accounting": 0,
            "tax_accounting": 0,
        })
        const { parent_id, number, name, type, accounting, subkonto_id, plans } = value

        accounting?.map(val => {
            accountObj.current[val] = 1
        })
        const plansArr = []
        subkonto_id?.map((value, index) => {
            accountingObj.current.push({
                "turnovers_accounting": 0,
                "amount_accounting": 0,
                "quantity_account": 0,
                "currency_account": 0
            })
            plans[index]?.map((val, ind) => {
                subOptions?.map(v => {
                    accountingObj.current[index][val] = 1
                })
            })
            value = { subkonto_id: value, ...accountingObj.current[index] }
            plansArr.push(value)
            return plansArr;
        })
        const data = {
            parent_id,
            number,
            name,
            type: type === 'Aktiv' ? 1 : type === 'Passiv' ? 0 : 2,
            ...accountObj.current,
            plans: plansArr
        }
        store(data)

    }

    const getSubkontoList = () => {
        API.Finance.SubKonto.getSubkontoList().then(res => setSubkontoList([...res.data.data]))
    }
    const getKontoPlanList = () => {
        API.Finance.KontoPlans.getKontoPlanParents().then(res => setKontoPlansParents([...res.data.data]))
    }
    const addChild = () => { setChildInput(prev => [...prev, true]) };
    const removeChild = (index) => {
        let arr = []
        delete childInput[index]
        setChildInput([...childInput])
        arr = childInput.filter(val => val)
        if (arr.length < 3) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    };
    const algorithm = () => {
        API.Finance.KontoPlans.algorithm().then(res => {
            algorithmList.current = { ...res.data.data }
        })
    }
    const getAccountNumber = (e) => {
        const newValue = e.target.value.split("-")
        code = ""
        newValue.map(v => { code += v })
        formRef.current.setFieldsValue({ "code": code })
    }
    const afterVisibleChange = (visible) => {
        getKontoPlanList()
        // setChildInput([])
    }

    const onChangebox = (e) => {
        if (e.target.checked) {
            checkedBox.current.push(e.target.value)
        } else {
            if (checkedBox.current.includes(e.target.value)) {
                checkedBox.current = checkedBox.current.filter(val => val !== e.target.value)
            }
        }
        if (checkedBox.current.length > 1) {
            if (checkedBox.current.includes("amount_accounting") && checkedBox.current.includes("currency_accounting")) {
                setSortedAlqo({ ...algorithmList.current["currency_accounting_amount_accounting"] })
            } else if (checkedBox.current.includes("amount_accounting")) {
                setSortedAlqo({ ...algorithmList.current["amount_accounting"] })
            } else if (checkedBox.current.includes("currency_accounting")) {
                setSortedAlqo({ ...algorithmList.current["currency_accounting"] })
            }
        } else {
            setSortedAlqo({ ...algorithmList.current[checkedBox.current[0]] })
        }
    }

    useEffect(() => {
        if (props.open) {
            getSubkontoList()
            getKontoPlanList()
            algorithm()
        } else {
            setChildInput([])
        }

    }, [props.open])

    useEffect(() => {
        let newArr = childInput.filter(val => val)
        if (newArr.length >= 3) {
            setDisabled(false)
        } else { setDisabled(true) }
    }, [childInput])

    return (
        <Drawer
            title={innerText.title}
            width={'50%'}
            className='c-drawer'
            onClose={Close}
            open={props.open}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterVisibleChange}
        >
            <Form layout="vertical" className={style.insertForm} onFinish={onFinish} ref={formRef}>
                <Row gutter={16}>
                    <Col span={24} >
                        <Row gutter={16}>
                            <Col span={24} >
                                <Col span={24} style={{ display: 'flex', alignItems: 'center' }} >
                                    <Form.Item
                                        style={{width: '200px', marginRight: '1%', display: 'inline-block', color: 'red' }}
                                        className='c-form-item'
                                        labelCol={{ color: 'red' }}
                                        label={innerText.account_number}
                                        name='number'
                                        rules={[
                                            {
                                                pattern: new RegExp('^[0-9-]*$'),
                                                message: innerText.account_number_msg
                                            }
                                        ]}
                                    >
                                        <Input className='c-input' placeholder={innerText.input_placeholder} type='text' onChange={getAccountNumber} />
                                    </Form.Item>
                                    <Form.Item
                                        className='c-form-item'
                                        style={{width: '200px', marginRight: '1%', display: 'inline-block' }}
                                        label={innerText.code}
                                        name='code'
                                    >
                                        <Input className='c-input' placeholder={innerText.input_placeholder} type='number' value={code} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        className='c-form-item'
                                        style={{width: '200px', marginRight: '1%', display: 'inline-block' }}
                                        label={innerText.parent} name='parent_id'
                                    >
                                        <Select
                                            showSearch
                                            className='c-select'
                                            filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                            placeholder={innerText.select_placeholder}
                                        >
                                            {kontoPlansParentsList?.map((val, ind) => (
                                                <Option value={val.uuid} key={ind}>{val.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className='c-form-item'
                                        style={{width: '200px', marginRight: '1%', display: 'inline-block' }}
                                        label={innerText.name}
                                        name='name'
                                    >
                                        <Input className='c-input' placeholder={innerText.input_placeholder} />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px' }}>
                                    <Row >
                                        <Form.Item
                                            className='c-form-item'
                                            label={innerText.type}
                                            name='type'
                                        >
                                            <Radio.Group name='dsc'>
                                                {plainOptions.map((val, ind) => (
                                                    <Radio value={val} key={ind}>{val}</Radio>
                                                ))}
                                            </Radio.Group>
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row >
                                        <Form.Item className='c-form-item' name='accounting'>
                                            <Checkbox.Group style={{ width: '100%' }}  >
                                                <Checkbox value={'currency_accounting'} onChange={onChangebox}>{innerText.currency_accounting}</Checkbox>
                                                <Checkbox value={'amount_accounting'} onChange={onChangebox}>{innerText.amount_accounting}</Checkbox>
                                                <Checkbox value={'tax_accounting'} onChange={onChangebox}>{innerText.tax_accounting}</Checkbox>
                                                <Checkbox value={'division_accounting'} onChange={onChangebox}>{innerText.division_accounting}</Checkbox>
                                            </Checkbox.Group>
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col>


                                    <Row gutter={16}>
                                        {childInput.map((val, ind) => (
                                            val &&
                                            <Col span={24} key={ind}>
                                                <Divider orientation="right">
                                                    {ind >= 0 && (
                                                        <CloseOutlined style={{ marginLeft: 10, color: "#4B4B4B" }}
                                                            onClick={(_) => removeChild(ind)} />
                                                    )}
                                                </Divider>

                                                <Row gutter={16} key={ind}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            className='c-form-item'
                                                            style={{width: '200px', marginRight: '1%', display: 'inline-block' }}
                                                            label={innerText.sub_account}
                                                            name={['subkonto_id', ind]}
                                                        >

                                                            <Select className='c-select' showSearch filterOption={false} placeholder={innerText.select_placeholder}>
                                                                {subkontoList?.map((val, ind) => (
                                                                    <Option value={val.uuid} key={ind}>{val.name}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item className='c-form-item' label={innerText.account_type} name={['plans', ind]} >
                                                            <Checkbox.Group style={{ width: '100%' }} defaultValue={['']}>
                                                                {sortedAlqo.currency_account && <Checkbox key={ind + 2} value="currency_account">{innerText.currency_account}</Checkbox>}
                                                                {sortedAlqo.quantity_account && <Checkbox key={ind + 3} value="quantity_account" >{innerText.quantity_account}</Checkbox>}
                                                                <Checkbox key={ind} value="turnovers_accounting">{innerText.turnovers_accounting}</Checkbox>
                                                                <Checkbox key={ind + 1} value="amount_accounting">{innerText.amount_accounting}</Checkbox>
                                                            </Checkbox.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        ))}

                                        <Col span={24}>
                                            <Form.Item>
                                                {disabled &&
                                                    <Button
                                                        type="dashed"
                                                        onClick={(_) => addChild()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        {innerText.add_btn}
                                                    </Button>
                                                }
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row align='end' className='fixed-submit-buttons'>
                    <Button style={{ width: 150, marginLeft: 5 }} htmlType="submit" type='primary' className='c-btn c-btn--primary'>{innerText.save_btn}</Button>
                    <Button style={{ width: 150, marginRight: 5 }} className='c-btn c-btn--secondary' onClick={Close}>{innerText.reject}</Button>
                </Row>

            </Form>
        </Drawer >
    )
}

export default Index