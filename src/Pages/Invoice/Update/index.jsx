import React, { useState } from 'react'
import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader, Space
} from 'antd';
import { EditOutlined, EnterOutlined } from '@ant-design/icons';
import { Button as MyButton, InvUpperInputGroup, InvInnerTable, InvBottomInputGroup } from '../../../Components';
import BankRequisiteModal from "../Insert/BankRequisiteModal"
import JournalModal from "../Insert/JournalModal"
import UpdateContent from "./UpdateContent"
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("Invoice")
const { Text, Title } = Typography;
const { TextArea } = Input;
const isEdit = true


const Index = ({ renderTableView, onClose, open }) => {
    const [countInputGroup, setCountInputGroup] = useState([true])
    const [isBankRequisiteOpen, setIsBankRequisiteOpen] = useState(false)
    const [isJournalOpen, setIsJournalOpen] = useState()
    const [status, setStatus] = useState(true)
    const [form] = Form.useForm()
    const openBankRequisiteModal = () => {
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
        setStatus(true)
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
        message.error(innerText.error_onFinishFailed);
    }
    const Close = () => {
        form.resetFields()
        onClose()
    }
    const addInputGroup = () => {
        const count = [...countInputGroup]
        count.push(true)
        setCountInputGroup([...count])
    }
    const removeInputGroup = (i) => {
        // console.log('--')
        const count = [...countInputGroup]
        delete count[i]
        setCountInputGroup([...count])
    }

    const changeToEdit = () => {
        setStatus(false)
    }
    return (
        <Drawer
            title={
                <Row gutter={8} justify='space-between' align='center'>
                    <Col>
                        <Title style={{ margin: 0 }} level={4}>{innerText.title_view}</Title>
                    </Col>
                    {
                        status ? (
                            <Col>
                                <Space size={8}>
                                    <MyButton icon={<EnterOutlined rotate='180' />}>{innerText.btn_send_for_approve}</MyButton>
                                    <MyButton icon={<EditOutlined />} onClick={changeToEdit}>{innerText.btn_edit}</MyButton>
                                </Space>
                            </Col>
                        ) : (
                            <MyButton onClick={openJournal} green="true">{innerText.journal}</MyButton>
                        )
                    }

                </Row>
            }
            width={'85%'}
            // className='comp-modal-add-gov-article'
            onClose={Close}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterChange}
        >
            <Form
                form={form}
                layout={status ? 'horizontal' : 'vertical'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Col>
                        <Title style={{ color: '#28C76F' }} level={5}>{innerText.main_info}</Title>
                        {/* <Divider /> */}
                    </Col>
                </Row>
                {
                    status ? (
                        <UpdateContent isEdit={isEdit} />

                    ) : (
                        <>
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
                            <>
                                <Divider />
                                {
                                    !status ? (
                                        <Row justify='end' align='center' gutter={8}>
                                            <Col>
                                                <MyButton htmlType="submit" >{innerText.btn_save}</MyButton>
                                            </Col>
                                            <Col>
                                                <MyButton onClick={Close} >{innerText.btn_cancel}</MyButton>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <Row justify='end' align='center' gutter={8}>
                                            <Col>
                                                <MyButton >{innerText.btn_close}</MyButton>
                                            </Col>
                                        </Row>
                                    )
                                }

                            </>
                        </>
                    )
                }
            </Form>
        </Drawer >
    )
}

export default Index
