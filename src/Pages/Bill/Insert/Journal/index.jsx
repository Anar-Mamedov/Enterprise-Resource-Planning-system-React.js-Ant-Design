import React from 'react'
import { Row, Col, Form, Input, Select } from 'antd';
const { Option } = Select;
const Index = ({ journal }) => {
    return (
        <>
            {journal.map((_, i) => (
                <Row>
                    <Col span={24} key={i}>
                        <Row style={{ width: '100%' }} gutter={12}>
                            <Col span={8} >
                                <Form.Item style={{ marginBottom: '10px' }} label='Debet:' name='jurnalDebet' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: '10px' }} label='Alt hesab:' name='jurnalAlthesab1' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: '10px' }} label='Alt hesab:' name='jurnalAlthesab2' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: '10px' }} label='Alt hesab:' name='jurnalAlthesab3' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8} >
                                <Form.Item style={{ marginBottom: '10px' }} label='Kredit:' name='jurnalKredit' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Kredit1</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: '10px' }} label='Alt hesab:' name='jurnalAlthesab4' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: '10px' }} label='Alt hesab:' name='jurnalAlthesab5' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: '10px' }} label='Alt hesab:' name='jurnalAlthesab6' >
                                    <Select filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())} placeholder='Seçim edin'>
                                        <Option value='ok'>Debet1</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8} >
                                <Form.Item style={{ marginBottom: '28px' }} label='Məbləğ:' name='jurnalMəbləğ' >
                                    <Input placeholder='Daxil edin' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default Index