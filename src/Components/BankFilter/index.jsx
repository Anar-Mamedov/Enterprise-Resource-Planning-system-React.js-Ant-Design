import { memo, useState, useRef } from 'react'
import API from '../../API'
import styled from 'styled-components'
import { Button, Popover, Select, Row, Col, Form, Space, Input, message } from 'antd';
import { FormItem } from '../../Components'
const { Option } = Select

const _Form = styled(Form).attrs({

})`
    width: ${({ revenues }) => revenues ? 700 : 600}px;
    height: 150px;
    padding: 10px;
`;

const Index = ({ placement, errorMessage, showButton, revenues, responce, company_id, individual_persons_id, supplier_id }) => {

    const span = revenues ? 24 / 6 : 24 / 4;

    const [bankId, setBankId] = useState([])
    const [currencyId, setCurrencyId] = useState([])
    const [accountTypeId, setAccountTypeId] = useState([])
    const [iban, setIban] = useState([])
    const [hidden, setHidden] = useState(null)
    const [open, setOpen] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm()
    const data = useRef({});

    const selectAPI = (data) => {
        if (individual_persons_id) return API.Procurement.IndividualPersonsBankIban.list(data)
        if (company_id) return API.Finance.Picklist.CompanyBankIban.list(data)
        if (supplier_id || !errorMessage) return API.Procurement.SupplierBankIban.list(data)
    }

    const onClick = values => {
        console.log(individual_persons_id, company_id, supplier_id, form)
        // debugger
        if (individual_persons_id || company_id || supplier_id || !errorMessage) {
            if (!values) setOpen(false)
            else {
                data.current = {
                    responce,
                    individual_persons_id: individual_persons_id || null,
                    company_id: company_id || null,
                    supplier_id: supplier_id || null
                };

                selectAPI(data.current).then(({ data }) => {
                    setBankId(data.data)
                    setCurrencyId([])
                    setAccountTypeId([])
                    setIban([])
                    setHidden(null)
                    form.setFieldsValue({ bank_id: null, currency_id: null, account_type_id: null, iban: null });
                });

            }
        } else {
            setOpen(false)
            messageApi.open({
                type: 'warning',
                content: errorMessage
            })
        }
    }

    const onChangeBank = values => {
        data.current.responce = "currency"
        data.current.bank_id = values
        selectAPI(data.current).then(({ data }) => {
            setCurrencyId(data.data)
            setAccountTypeId([])
            setIban([])
            setHidden(null)
            form.setFieldsValue({ currency_id: null, account_type_id: null, iban: null });
        })
    }
    const onChangeCurrency = values => {
        data.current.responce = "account_type"
        data.current.currency_id = values
        selectAPI(data.current).then(({ data }) => {
            setAccountTypeId(data.data)
            setIban([])
            setHidden(null)
            form.setFieldsValue({ account_type_id: null, iban: null });
        });
    }
    const onChangeAccountType = values => {
        data.current.responce = "iban"
        data.current.account_type_id = values
        selectAPI(data.current).then(({ data }) => {
            setIban(data.data)
            setHidden(null)
            form.setFieldsValue({ iban: null });
        });
    }
    const onChangeIban = values => {
        setHidden(values)
    }

    const Save = values => {
        setOpen(false)
    }
    const Cancel = () => {
        form.resetFields()
        setHidden(null)
        setOpen(false)
    }

    const Toogle = () => {
        if (individual_persons_id || company_id || supplier_id || !errorMessage) {
            setOpen(value => !value)
        }
    }

    return (
        <>
            {contextHolder}
            <Popover onOpenChange={onClick} open={open} placement={placement} trigger="click" content={
                <_Form onFinish={Save} form={form} layout="vertical" revenues={revenues} >
                    <Row gutter={5}>

                        {
                            revenues && <Col span={span * 2}>
                                <FormItem label='Qəbuledən təhtəlhesab' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                                    <Select allowClear={!true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                                        <Option value="1">1</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        }

                        <Col span={span}>
                            <FormItem label='Bank' name='bank_id' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                                <Select onChange={onChangeBank} allowClear={!true}
                                    showSearch={true} optionFilterProp="children"
                                    placeholder="Zəhmət olmazsa seçim edin"
                                    options={bankId?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                                />

                            </FormItem>
                        </Col>
                        <Col span={span}>
                            <FormItem label='Valyuta' name='currency_id' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                                <Select onChange={onChangeCurrency} allowClear={!true}
                                    showSearch={true} optionFilterProp="children"
                                    placeholder="Zəhmət olmazsa seçim edin"
                                    options={currencyId?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                                />
                            </FormItem>
                        </Col>
                        <Col span={span}>
                            <FormItem label='Hesab növü' name='account_type_id' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                                <Select onChange={onChangeAccountType} allowClear={!true}
                                    showSearch={true} optionFilterProp="children"
                                    placeholder="Zəhmət olmazsa seçim edin"
                                    options={accountTypeId?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                                />
                            </FormItem>
                        </Col>
                        <Col span={span}>
                            <FormItem label='Bank hesabı' name='iban' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                                <Select onChange={onChangeIban} allowClear={!true} showSearch={true}
                                    optionFilterProp="children"
                                    placeholder="Zəhmət olmazsa seçim edin"
                                    options={iban?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={24} align='right'>
                            <Space>
                                <Button htmlType='submit' >Yadda saxla</Button>
                                <Button onClick={Cancel} >Ləğv et</Button>
                            </Space>
                        </Col>
                    </Row>
                </_Form>
            } >

                <Input type='hidden' value={hidden} />
                <Button onClick={Toogle} block={true}>{showButton}</Button>
            </Popover>
        </>
    )
}

export default memo(Index)