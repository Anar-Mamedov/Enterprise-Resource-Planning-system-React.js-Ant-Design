import { Form, Input, Col, Row, Typography, Select, DatePicker } from 'antd';
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("InvoiceContract");
const { Option } = Select;
const { Text } = Typography;

const InvContStaticInputGroup = () => {
    return (
        <Row>
            <Col span={24}>
                <Row style={{ marginBottom: '1rem' }}> <Col><Text type="success">Əsas məlumatlar</Text></Col></Row>
                <Row gutter={14}>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Təşkilat' name='Təşkilat' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select className='c-select' allowClear showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder={innerText.select_placeholder}
                            >
                                <Option className='c-select-option' value={1}>1</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Kontragent' name='Kontragent' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select className='c-select' allowClear showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder={innerText.select_placeholder}
                            >
                                <Option className='c-select-option' value={1}>1</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Növ' name='Növ' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select className='c-select' allowClear showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder={innerText.select_placeholder}
                            >
                                <Option className='c-select-option' value={1}>1</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Valyuta' name='Valyuta' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select className='c-select' allowClear showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder={innerText.select_placeholder}
                            >
                                <Option className='c-select-option' value={1}>1</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item className='c-form-item' label='Nömrə' name='Nömrə' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Input className='c-input' placeholder={innerText.input_placeholder} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={14}>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Tarix' name='Tarix' rules={[{ required: true, message: innerText.error_insert_data }]} >
                            <DatePicker style={{ width: '100%', height: '36px' }} />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Predmet' name='payment_type' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select className='c-select' allowClear showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder={innerText.select_placeholder}
                            >
                                <Option className='c-select-option' value={1}>1</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item className='c-form-item' label='Ödəniş növü' name='payment_type' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select className='c-select' allowClear showSearch
                                filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                placeholder={innerText.select_placeholder}
                            >
                                <Option className='c-select-option' value={1}>1</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label='Başlama tarixi' name='start-date' >
                            <DatePicker style={{ width: '100%', height: '36px' }} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label='Bitmə tarixi' name='end-date' >
                            <DatePicker style={{ width: '100%', height: '36px' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default InvContStaticInputGroup;