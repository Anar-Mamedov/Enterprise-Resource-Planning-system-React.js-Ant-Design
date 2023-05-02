import React from 'react'
import './style.scss';
import { Row, Col, Button, Form, Input, Drawer, DatePicker, Select, Typography } from 'antd';
import { useLocation } from 'react-router';
import { EditOutlined } from '@ant-design/icons'
const { Text } = Typography;
const { Option } = Select;

function Index(props) {
    const location = useLocation()
    const onFinish = (value) => console.log(value);
    const Close = (uuid) => props.onClose();
    const onChangeDate = (date, dateString) => console.log(date, dateString);
    return (
        <Drawer
            title="Yeni"
            width={'25%'}
            className='comp-modal-add-gov-article'
            onClose={Close}
            open={props.open}
            bodyStyle={{ paddingBottom: 80 }}
            extra={<Button href={`${location.pathname}/show`} style={{ width: 150, marginLeft: 5 }} type='primary' > View <EditOutlined /></Button>}
        >
            <Form layout="vertical" className='insertForm' onFinish={onFinish}>
                <Row>
                    {props.billStatus && <InsertBill onChangeDate={onChangeDate} />}
                    {props.appendixStatus && <InsertAppendix onChangeDate={onChangeDate} />}
                </Row>
                <Row align='center' className='insertFooter' style={{ marginTop: 30 }}>
                    <Button style={{ width: '9rem', marginRight: '1rem' }} htmlType="submit" type='primary'>Yadda saxla</Button>
                    <Button onClick={Close} style={{ width: '9rem' }} type='secondary'>Bağla</Button>
                </Row>
            </Form >
        </ Drawer >
    )
}
export default Index

const InsertBill = ({ onChangeDate }) => {
    return (
        <Col span={24} >
            <Form.Item label='Müqavilənin nömrəsi:' name='account_number' rules={[{ required: true, message: 'Please enter account number' }]}>
                <Input placeholder='Daxil edin' />
            </Form.Item>
            <Form.Item label='Müqavilənin nömrəsi:' name='account_number' rules={[{ required: true, message: 'Please enter account number' }]}>
                <DatePicker style={{ width: '100%' }} onChange={onChangeDate} />
            </Form.Item>
            <Form.Item label='Məbləğ:' name='price' rules={[{ required: true, message: 'Please enter account number' }]}>
                <Col style={{ width: '100%', display: 'flex' }}>
                    <Input style={{ width: '70%' }} placeholder='Daxil edin' />
                    <Select style={{ width: '30%' }} filterOption={false} placeholder='Seçim edin'>
                        <Option value='ok'>ok</Option>
                    </Select>
                </Col>
            </Form.Item>
            <Form.Item label='Müştəri: ' name='client' rules={[{ required: true, message: 'Please select sub article' }]}>
                <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='ok'>ok</Option>
                </Select>
            </Form.Item>
            <Form.Item label='Müqavilənin tarixi: ' name='sub_account' rules={[{ required: true, message: 'Please select sub article' }]}>
                <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='ok'>ok</Option>
                </Select>
            </Form.Item>
        </Col>
    )
}

const InsertAppendix = ({ onChangeDate }) => {
    return (
        <Col span={24} >
            <Form.Item label='Müqavilənin nömrəsi:' name='account_number' rules={[{ required: true, message: 'Please enter account number' }]}>
                <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='ok'>ok</Option>
                </Select>
            </Form.Item>
            <Form.Item label='Əlavə tarixi:' name='account_number' rules={[{ required: true, message: 'Please enter account number' }]}>
                <DatePicker style={{ width: '100%' }} onChange={onChangeDate} />
            </Form.Item>
            <Form.Item label='Məbləğ:' name='price' rules={[{ required: true, message: 'Please enter account number' }]}>
                <Col style={{ width: '100%', display: 'flex' }}>
                    <Input style={{ width: '70%' }} placeholder='Daxil edin' />
                    <Select style={{ width: '30%' }} filterOption={false} placeholder='Seçim edin'>
                        <Option value='ok'>ok</Option>
                    </Select>
                </Col>
            </Form.Item>
            <Col span={24}>
                <Text style={{ marginRight: '.5rem' }}>Müştəri</Text>
                <Text type="secondary">Lorem İpsum</Text>
            </Col>
            <Col span={24}>
                <Text style={{ marginRight: '.5rem' }}>Təşkilat</Text>
                <Text type="secondary">Lorem İpsum</Text>
            </Col>
        </Col>
    )
}
