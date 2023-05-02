import React, { useState } from 'react'
import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader
} from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { InvUpperInputGroup, InvContDynamicInputGroup, Sorter, InvInnerTable, InvBottomInputGroup } from '../../../Components';
import { Button as MyButton } from '../../../Components'
import AccTransSubField from '../../../Components/AccTransSubField';
import BankRequisiteModal from "./BankRequisiteModal"
import JournalModal from "./JournalModal"
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("Invoice")
const { Text, Title } = Typography;
const { TextArea } = Input;

const options = [
    {
        label: "Servis",
        value: "Servis"
    },
    {
        label: "Məhsul",
        value: "Məhsul"
    }
]

const Index = ({ renderTableView, onClose, open }) => {

    const [countInputGroup, setCountInputGroup] = useState([true])
    const [isBankRequisiteOpen, setIsBankRequisiteOpen] = useState(false)
    const [isJournalOpen, setIsJournalOpen] = useState()
    const [form] = Form.useForm()

    const openBankRequisiteModal = () => {
        console.log('hey')
        setIsBankRequisiteOpen(true)
    }
    const closeBankRequisite = () => {
        setIsBankRequisiteOpen(false)
    }

    const openJournal = () => {
        setIsJournalOpen(true)
    }

    const closeJournal = () => {
        setIsJournalOpen(false)
    }
    const afterChange = () => {
        form.resetFields()
        setCountInputGroup([true])
    }
    const onFinish = (value) => {
        // API.Finance.SubKonto.store(value).then(res => {
        //     if (res.data.status === 201) {
        //         renderTableView()
        //         form.resetFields()
        //         onClose()
        //     } else {
        //         const messages = res.data.data;
        //         for (let key in messages) setFormError(key, messages[key]);
        //     }
        // })
    }
    const onFinishFailed = (errorInfo) => {
        message.error('Məlumatlar natamamdır!');
    }
    const Close = () => {
        form.resetFields()
        setCountInputGroup([true])
        onClose()
    }
    const addInputGroup = () => {
        const count = [...countInputGroup]
        count.push(true)
        setCountInputGroup([...count])
    }
    const removeInputGroup = (i) => {
        console.log('--')
        const count = [...countInputGroup]
        delete count[i]
        setCountInputGroup([...count])
    }
    // console.log(countInputGroup)
    return (
        <Drawer
            title='Yeni'
            width={'85%'}
            // className='comp-modal-add-gov-article'
            onClose={Close}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterChange}
            extra={<MyButton onClick={openJournal} green="true">{innerText.journal}</MyButton>}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col>
                        <Title style={{ color: '#28C76F' }} level={5}>{innerText.main_info}</Title>
                        {/* <Divider /> */}
                    </Col>
                </Row>
                <InvUpperInputGroup openBankRequisiteModal={openBankRequisiteModal} />
                {/* <hr /> */}
                <Row justify="center" style={{ width: '100%' }}>
                    <Col style={{ width: '100%' }}>
                        <InvInnerTable />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title style={{ color: '#28C76F' }} level={5}>{innerText.additions}</Title>
                        {/* <Divider /> */}
                    </Col>
                </Row>
                <InvBottomInputGroup />
                <BankRequisiteModal closeBankRequisite={closeBankRequisite} isBankRequisiteOpen={isBankRequisiteOpen} />
                <JournalModal closeJournal={closeJournal} isJournalOpen={isJournalOpen} />
                <Row gutter={8} justify='space-between' align='center' style={{ marginTop: '1rem' }}>
                    <Divider />
                    <Row gutter={8}>
                        <Col>
                            <AccTransSubField title={innerText.amount} value={'1200 AZN'} />
                        </Col>
                        <Col>
                            <AccTransSubField title={innerText.total_invoice_amount} value={'1700 AZN'} />
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col>
                            <MyButton htmlType="submit">{innerText.btn_save}</MyButton>
                        </Col>
                        <Col>
                            <MyButton onClick={Close}>{innerText.btn_cancel}</MyButton>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Drawer>
    )
}

export default Index
