import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Form, Row, Divider, Button, Input, Col, Typography, Select, DatePicker, Tabs, Collapse, Space, Card } from 'antd';
import { Languages } from '../../../Config';
import styles from './style.module.scss';
import API from '../../../API';
import dayjs from 'dayjs';
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
const innerText = Languages.SelectLanguage("InvoiceContract");
let totalAmount = 0;
let totalEdvAmount = 0;
const Index = () => {
    const params = useParams()
    const [form] = Form.useForm()
    const [tabInfoPanel, setTabInfoPanel] = useState([]);
    const [totalAmountState, setTotalAmountState] = useState(0)
    const [totalEdvAmountState, setTotalEdvAmountState] = useState(0)
    //---------------------------------------------------------
    //! SetItem Function Start------------------------------------------------------------------------------
    const setItem = (value) => form.setFields(value);
    //! SetItem Function End--------------------------------------------------------------------------------
    const getShowApi = () => {
        API.Acc.FacturaContract.show(params?.uuid).then(res => {
            if (res.status === 200) {
                let show = res.data.data
                setItem([{ name: 'prediment_id', value: show?.prediment?.name, errors: null }]);
                setItem([{ name: 'company_id', value: show?.company?.name, errors: null }]);
                setItem([{ name: 'supplier_id', value: show?.supplier?.name, errors: null }]);
                setItem([{ name: 'contract_type_id', value: show?.contract_type?.name, errors: null }]);
                setItem([{ name: 'currency_type_id', value: show?.currency?.name, errors: null }]);
                setItem([{ name: 'contract_no', value: show?.contract_no, errors: null }]);
                setItem([{ name: 'contract_date', value: show?.contract_date, errors: null }]);
                show?.contract_date && form.setFields([{ name: 'contract_date', value: dayjs(show?.contract_date), errors: null }]);
                form.setFields([{ name: 'payment_type_id', value: show?.payment_type?.name, errors: null }]);
                show?.contract_date && form.setFields([{ name: 'start_date', value: dayjs(show?.start_date), errors: null }]);
                show?.contract_date && form.setFields([{ name: 'end_date', value: dayjs(show?.end_date), errors: null }]);
                show?.items?.forEach((item, index) => {
                    setItem([{ name: ['items', index, 'product_id'], value: item?.product?.name, errors: null }]);
                    setItem([{ name: ['items', index, 'description_id'], value: item?.description?.name, errors: null }]);
                    setItem([{ name: ['items', index, 'unit_id'], value: item?.unit?.name, errors: null }]);
                    setItem([{ name: ['items', index, 'quantity'], value: item?.quantity, errors: null }]);
                    setItem([{ name: ['items', index, 'amount'], value: item?.amount, errors: null }]);
                    setItem([{ name: ['items', index, 'amountUI'], value: item?.quantity * item?.amount, errors: null }]);
                    setItem([{ name: ['items', index, 'tax_id'], value: item?.tax?.tax_value, errors: null }]);
                    setItem([{ name: ['items', index, 'tax_id_value'], value: ((form.getFieldValue(['items', index, 'amountUI']) || 0) * (item?.tax?.tax_value ?? 0)) / 100, errors: null }]);
                    setItem([{ name: ['items', index, 'bank_guarantee_amount'], value: item?.bank_guarantee_amount, errors: null }]);
                    setItem([{ name: ['items', index, 'bank_guarantee_id'], value: item?.bank_guarantee?.name, errors: null }]);
                    item?.bank_guarantee_date && setItem([{ name: ['items', index, 'bank_guarantee_date'], value: dayjs(item?.bank_guarantee_date), errors: null }]);
                    setItem([{ name: ['items', index, 'bank_guarantee_time_id'], value: item?.bank_guarantee_time?.name, errors: null }]);
                    setItem([{ name: ['items', index, 'bank_guarantee_time_quantity'], value: item?.bank_guarantee_time_quantity, errors: null }]);
                    setItem([{ name: ['items', index, 'note'], value: item?.note, errors: null }]);
                })
                setTabInfoPanel([...show?.items])
                show?.items?.forEach((el, index) => {
                    let hasil = (el?.amount ?? 0) * (el?.quantity ?? 0)
                    let hasilEdv = ((el?.amount ?? 0) * (el?.quantity ?? 0) * (el?.tax?.tax_value || 0)) / 100
                    totalAmount = (totalAmount || 0) + hasil;
                    totalEdvAmount = (totalEdvAmount || 0) + hasilEdv;
                })
                setTotalAmountState(totalAmount)
                setTotalEdvAmountState(totalEdvAmount)
            }
        })
    }
    useEffect(() => {
        getShowApi()
    }, []);
    return (
        <Form style={{ padding: '1.5rem' }} form={form} layout="vertical" >
            <Row>
                <Col span={24}>
                    <Row style={{ marginBottom: '1rem' }}> <Col><Text type="success">Əsas məlumatlar</Text></Col></Row>
                    <Row gutter={14}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Təşkilat' name='company_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Select disabled className='c-select' allowClear showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder={innerText.select_placeholder}
                                >
                                    <Option className='c-select-option' value=''></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Kontragent' name='supplier_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Select disabled className='c-select' allowClear showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder={innerText.select_placeholder}
                                >
                                    <Option className='c-select-option' value=''></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Növ' name='contract_type_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Select disabled className='c-select' allowClear showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder={innerText.select_placeholder}
                                >
                                    <Option className='c-select-option' value='Nov1'>Nov1</Option>
                                    <Option className='c-select-option' value='Nov2'>Nov2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Valyuta' name='currency_type_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Select disabled className='c-select' allowClear showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder={innerText.select_placeholder}
                                >
                                    <Option className='c-select-option' value='' />
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item className='c-form-item' label='Nömrə' name='contract_no' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Input disabled className='c-input' placeholder={innerText.input_placeholder} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={14}>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Tarix' name='contract_date' rules={[{ required: false, message: innerText.error_insert_data }]} >
                                <DatePicker disabled style={{ width: '100%', height: '36px' }} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Predmet' name='prediment_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Select disabled className='c-select' allowClear showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder={innerText.select_placeholder}
                                >
                                    <Option className='c-select-option' value='Predmet1'>Predmet1</Option>
                                    <Option className='c-select-option' value='Predmet2'>Predmet2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item className='c-form-item' label='Ödəniş növü' name='payment_type_id' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <Select disabled className='c-select' allowClear showSearch
                                    filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                    placeholder={innerText.select_placeholder}
                                >
                                    <Option className='c-select-option' value='Ödənişnövü1'>Ödəniş növü1</Option>
                                    <Option className='c-select-option' value='Ödənişnövü2'>Ödəniş növü2</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label='Başlama tarixi' name='start_date' rules={[{ required: false, message: innerText.error_insert_data }]}>
                                <DatePicker disabled style={{ width: '100%', height: '36px' }} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label='Bitmə tarixi' name='end_date' rules={[{ required: false, message: innerText.error_insert_data }]} >
                                <DatePicker disabled style={{ width: '100%', height: '36px' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={24}>
                    <Tabs animated={true} type="card" defaultActiveKey="1">
                        <Tabs.TabPane tab='Maliyyə detalları' key="1">
                            <Collapse accordion>
                                {tabInfoPanel?.map((tabInfo, index) => (
                                    tabInfo && <Panel header='Maliyyə detalları paneli' key={index + 1}>
                                        <Row style={{ width: '100%', height: '125px', display: 'flex' }} gutter={14}>
                                            <Col span={5}>
                                                <Form.Item label={<span>Kateqoriya</span>}>
                                                    <Form.Item className='c-form-item' name={['items', index, 'product_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                        <Select disabled className='c-select' filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Servis seçin' >
                                                            <Option className='c-select-option' value='' />
                                                        </Select>
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item className='c-form-item' label='Təsnifat' name={['items', index, 'description_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <Select disabled className='c-select' allowClear showSearch
                                                        filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                        placeholder={innerText.select_placeholder}
                                                    >
                                                        <Option className='c-select-option' value='' />
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item className='c-form-item' label='Ölçü vahidi' name={['items', index, 'unit_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <Select disabled className='c-select' allowClear showSearch
                                                        filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                        placeholder={innerText.select_placeholder}
                                                    >
                                                        <Option className='c-select-option' value={1}>1</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item className='c-form-item' label='Miqdar' name={['items', index, 'quantity']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <Input disabled className='c-input' placeholder={innerText.input_placeholder} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item className='c-form-item' label='Qiymət' name={['items', index, 'amount']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <Input disabled className='c-input' placeholder={innerText.input_placeholder} />
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
                                                <Form.Item label='ƏDV'>
                                                    <Space size={0}>
                                                        <Form.Item className='c-form-item' name={['items', index, 'tax_id']} rules={[{ required: false, message: '' }]}>
                                                            <Select disabled className='c-select' allowClear
                                                                showSearch
                                                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                                placeholder='Seçim edin'>
                                                                <Option className='c-select-option' value={1}>1</Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item className='c-form-item' name={['items', index, 'tax_id_value']} rules={[{ required: false, message: '' }]}>
                                                            <Input disabled className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                                                        </Form.Item>
                                                    </Space>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item className='c-form-item' label='Bank zəmanət məbləği' name={['items', index, 'bank_guarantee_amount']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <Input disabled className='c-input' placeholder={innerText.input_placeholder} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item className='c-form-item' label='Zəmanət verən bank' name={['items', index, 'bank_guarantee_id']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <Select disabled className='c-select' allowClear showSearch
                                                        filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                        placeholder={innerText.select_placeholder}
                                                    >
                                                        <Option className='c-select-option' value={1}>1</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item className='c-form-item' label='Bank zəmanət tarixi' name={['items', index, 'bank_guarantee_date']} rules={[{ required: false, message: innerText.error_insert_data }]} >
                                                    <DatePicker disabled style={{ width: '100%', height: '36px' }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={14}>
                                            <Col span={5}>
                                                <Form.Item label='Bank zəmanət müddəti'>
                                                    <Space size={0}>
                                                        <Form.Item className='c-form-item' name={['items', index, 'bank_guarantee_time_id']} rules={[{ required: false, message: '' }]}>
                                                            <Select disabled className='c-select' allowClear
                                                                showSearch
                                                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                                                placeholder='Seçim edin'>
                                                                <Option className='c-select-option' value={1}>1</Option>
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item className='c-form-item' name={['items', index, 'bank_guarantee_time_quantity']} rules={[{ required: false, message: '' }]}>
                                                            <Input disabled className='c-input' min='0' type='number' placeholder='Daxil edin...' />
                                                        </Form.Item>
                                                    </Space>
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item className='c-form-item' label='Qeyd' name={['items', index, 'note']} rules={[{ required: false, message: innerText.error_insert_data }]}>
                                                    <TextArea disabled rows={4} className='c-input' placeholder={innerText.input_placeholder} />
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
                        </Tabs.TabPane>
                    </Tabs>
                    {tabInfoPanel?.filter(a => a).length > 0 && <Space className={styles.cardParent}>
                        <Card className={styles.cardDesign} size="small">
                            <span className={styles.justifyBetween}>
                                <b style={{ fontSize: '12px' }}>Cəmi məbləğ:</b>
                                <span>{totalAmountState} AZN</span>
                            </span>
                        </Card>
                        <Card className={styles.cardDesign} size="small">
                            <span className={styles.justifyBetween}>
                                <b style={{ fontSize: '12px' }}>Cəmi ƏDV məbləği:</b>
                                <span>{totalEdvAmountState} AZN</span>
                            </span>
                        </Card>
                        <Card className={styles.cardDesign} size="small">
                            <span className={styles.justifyBetween}>
                                <b style={{ fontSize: '12px' }}>Cəmi vergi daxili məbləğ:</b>
                                <span>{totalAmountState + totalEdvAmountState} AZN</span>
                            </span>
                        </Card>
                    </Space>}
                </Col>
            </Row>
        </Form>
    )
}

export default Index
