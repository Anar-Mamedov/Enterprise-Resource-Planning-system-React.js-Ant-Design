import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import style from './style.module.scss';
import {
    Row, Col, Button,
    Form, Input, Drawer,
    Checkbox, Select,
    Radio, Divider, Space
} from 'antd';
import {
    PlusOutlined, CloseOutlined, EditOutlined,
    SnippetsOutlined, FolderViewOutlined
} from '@ant-design/icons';
import Loader from '../../../Components/Loader';
import API from '../../../API'
import { Button as MyButton } from '../../../Components';
import { Languages } from "../../../Config";
const innerText = Languages.SelectLanguage("ChartOfAccount");
const { Option } = Select;


const Index = ({ onClose, data, open }) => {
    const [disabled, setDisabled] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [disabledForm, setDisabledForm] = useState(false)
    const [showData, setShowData] = useState([]);
    const [subkontoList, setSubkontoList] = useState([])
    const [kontoPlansParentsList, setKontoPlansParents] = useState([])
    const [childInput, setChildInput] = useState([])
    const [sortedAlqo, setSortedAlqo] = useState({})
    const location = useLocation();
  
    const plainOptions = ['Aktiv', 'Passiv', 'Aktiv/Passiv'];
    const options = ['currency_accounting', 'amount_accounting', 'tax_accounting', 'division_accounting'];
    const optionsName = ['Valyuta uçotu', 'Kəmiyyət uçotu', 'Vergi uçotu', 'Bölünmə uçotu'];
    const subOptions = ['turnovers_accounting', 'amount_accounting', 'quantity_account', 'currency_account'];
    let checkedBox = useRef([])
    const uuidArr = useRef([]);
    const formRef = useRef()
    let algorithmList = useRef({})
    const accountingObj = useRef([])
    const accountObj = useRef({
        "currency_accounting": 0,
        "amount_accounting": 0,
        "division_accounting": 0,
        "tax_accounting": 0,
    })
    let code;

    const Close = (uuid) => {
        onClose()
        setDisabled(true)
        setChildInput([])
        formRef.current.resetFields()
    }

    const setFormError = (name, messages) => {
        formRef.current.setFields([{ name, errors: [...messages] }]);
    }

    const update = (obj) => {
        setIsLoad(true)
        API.Finance.KontoPlans.update(data?.uuid, obj).then(res => {
            if (res.status === 200) {
                Close();
                setIsLoad(false)
                formRef.current.resetFields()
            } else {
                setIsLoad(false)
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

        accounting.map(val => {
            accountObj.current[val] = 1
        })

        const plansArr = []
        accountingObj.current = []
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
            value = { subkonto_id: value, ...accountingObj.current[index], uuid: uuidArr.current[index] ? uuidArr.current[index] : null }
            plansArr.push(value)
            return plansArr;
        })
        const data = {
            parent_id,
            number,
            name,
            type: type === 'Aktiv' ? 1 : type === "Passiv" ? 0 : 2,
            ...accountObj.current,
            plans: plansArr
        }
        update(data)
    }

    const show = () => {
        setChildInput([])
        uuidArr.current = []
        checkedBox.current = []
        setIsLoad(true)

        API.Finance.KontoPlans.show(data?.uuid).then(res => {
            setShowData(res.data.data)
            let subOptionArr = []
            const { data } = res.data;
            setIsLoad(false)

            let number = data.number.split("-");
            code = ""
            number.map(v => {
                code += v
            })
            formRef.current.setFieldsValue({ "code": code })

            options.map(val => {
                if (data[val] === 1) { checkedBox.current.push(val) }
            })

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
            data?.plans.map((val, ind) => {
                setChildInput(prev => [...prev, true])
                subOptionArr.push([])
                uuidArr.current.push(val?.uuid)
                subOptions.map(v => {
                    val[v] === 1 && subOptionArr[ind].push(v)
                })
                formRef.current.setFieldsValue({
                    subkonto_id: { [ind]: val?.subkonto?.uuid },
                    plans: { [ind]: subOptionArr[ind] }
                })

            })
            formRef.current.setFieldsValue({
                name: data?.name,
                number: data?.number,
                parent_id: data?.parent?.uuid,
                type: data?.type === 1 ? 'Aktiv' : data?.type === 0 ? 'Passiv' : "Aktiv/Passiv",
                accounting: checkedBox.current,
            })

        })
    }

    const deleteElement = (uuid) => {
        setIsLoad(true)
        if (uuid) {
            API.Finance.KontoPlans.delete(uuid).then(res => {
                if (res.status === 200) {
                    setIsLoad(false)
                } else {
                    const messages = res.data.data;
                    for (let key in messages) setFormError(key, messages[key]);
                }
            })
        }
    }

    const getSubkontoList = () => {
        API.Finance.SubKonto.getSubkontoList().then(res => setSubkontoList([...res.data.data]))
    }

    const getKontoPlanList = () => {
        API.Finance.KontoPlans.getKontoPlanParents().then(res => setKontoPlansParents([...res.data.data]))
    }

    const algorithm = () => {
        API.Finance.KontoPlans.algorithm().then(res => {
            algorithmList.current = { ...res.data.data }
        })
    }

    const getAccountNumber = (e) => {
        const newValue = e.target.value.split("-")
        code = ""
        newValue.map(v => {
            code += v
        })
        formRef.current.setFieldsValue({ "code": code })
    }

    const removeChild = (index) => {
        let arr = []
        delete childInput[index];
        deleteElement(uuidArr.current[index]);
        setChildInput([...childInput]);
        arr = childInput.filter(val => val)
        if (arr.length < 3) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    };

    const addChild = () => {
        setChildInput(prev => [...prev, true])
    };

    const editData = () => {
        setDisabledForm(!disabledForm)
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
        let newArr = childInput.filter(val => val)
        if (newArr.length >= 3) {
            setDisabled(false)
        } else { setDisabled(true) }
    }, [childInput])

    useEffect(() => {
        if (open) {
            show()
            getKontoPlanList()
            getSubkontoList()
            algorithm()
            setIsLoad(true)

        }
    }, [open])
    return (


        <Drawer
            title={innerText.title_edit}
            width={'50%'}
            className='c-drawer'
            onClose={Close}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
                <>

                    <Space>
                        {
                            disabledForm ?
                                <Button onClick={editData} type="link" icon={<EditOutlined />}>{innerText.show}</Button>
                                :
                                <Button onClick={editData} type="link" icon={<SnippetsOutlined />}>{innerText.hide}</Button>
                        }
                    </Space>
                    <MyButton href={`${location.pathname}/show/${data?.uuid}`} target='_blank'> {innerText.view}<FolderViewOutlined /></MyButton>
                </>
            }
        >
            <Form layout="vertical" className={style.insertForm} onFinish={onFinish} ref={formRef} disabled={disabledForm}>
                <Row gutter={16}>
                    <Col span={24} >
                        <Row gutter={16}>
                            <Col span={24} >
                                <Col span={24} style={{ display: 'flex', alignItems: 'center' }} >
                                    <Form.Item
                                        className='c-form-item'
                                        style={{ width: '200px', marginRight: '1%', display: 'inline-block', color: 'red' }}
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
                                    <Form.Item className='c-form-item' style={{ width: '200px', marginRight: '1%', display: 'inline-block' }} label={innerText.code} name='code'   >
                                        <Input className='c-input' placeholder={innerText.input_placeholder} type='number' disabled />
                                    </Form.Item>
                                    <Form.Item className='c-form-item' style={{ width: '200px', marginRight: '1%', display: 'inline-block' }} label={innerText.parent} name='parent_id' >
                                        <Select
                                            className='c-select'
                                            showSearch
                                            placeholder={innerText.parent}
                                            filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                        >
                                            {kontoPlansParentsList?.map((val, ind) => (
                                                <Option value={val.uuid} key={ind}>{val.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item className='c-form-item' style={{ width: '200px', marginRight: '1%', display: 'inline-block' }} label={innerText.name} name='name' >
                                        <Input className='c-input' placeholder={innerText.input_placeholder} />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px' }}>
                                    <Row >
                                        <Form.Item className='c-form-item' label={innerText.type} name='type'>
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
                                        <Form.Item name='accounting'>
                                            <Checkbox.Group style={{ width: '100%' }}>
                                                {
                                                    options.map((val, ind) => (
                                                        <Checkbox value={val} onChange={onChangebox}>{optionsName[ind]}</Checkbox>
                                                    ))
                                                }
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
                                                        <Form.Item className='c-form-item' style={{ width: '200px', marginRight: '1%', display: 'inline-block' }} label={innerText.sub_account} name={['subkonto_id', ind]}>
                                                            <Select className='c-select' showSearch filterOption={false} placeholder={innerText.select_placeholder}>
                                                                {subkontoList?.map((val, ind) => (
                                                                    <Option value={val.uuid} key={ind}>{val.name}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item className='c-form-item' label={innerText.type} name={['plans', ind]}>
                                                            <Checkbox.Group style={{ width: '100%' }}>
                                                                {sortedAlqo.currency_account && <Checkbox key={ind + 2} value="currency_account">Valyuta</Checkbox>}
                                                                {sortedAlqo.quantity_account && <Checkbox key={ind + 3} value="quantity_account" >Miqdar</Checkbox>}
                                                                <Checkbox key={ind} value="turnovers_accounting">Dövriyyə</Checkbox>
                                                                <Checkbox key={ind + 1} value="amount_accounting">Məbləğ</Checkbox>
                                                            </Checkbox.Group>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        ))}
                                        <Col span={24}>
                                            <Form.Item>
                                                {disabled && <Button
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
                <Row align='end' className='fixed-submit-buttons' >
                    <Button style={{ width: 150, marginLeft: 5 }} htmlType="submit" type='primary' className='c-btn c-btn--primary'>{innerText.save_btn}</Button>
                    <Button style={{ width: 150, marginRight: 5 }} type='danger' className='c-btn c-btn--secondary' onClick={Close}>{innerText.reject}</Button>
                </Row>

            </Form >
            <Loader loading={isLoad} />
        </Drawer >

    )
}

export default Index