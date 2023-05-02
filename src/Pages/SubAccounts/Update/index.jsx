import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './style.scss';
import { Form, Input, Drawer, Col, Row, Typography, message, Button, Select, Divider } from 'antd';
import { FolderViewOutlined } from '@ant-design/icons'
import { Button as MyButton } from '../../../Components';
import API from '../../../API'
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("SubAccounts")
const { Text, Title } = Typography;
const { Option } = Select;

function Index({ open, data, onClose, renderTableView }) {
    const [rowData, setRowData] = useState(null)
    const [tableList, setTableList] = useState(null)
    const [columnList, setColumnList] = useState(null)
    const [form] = Form.useForm()
    const location = useLocation()

    const onFinish = (value) => {
        API.Finance.SubKonto.update(data.uuid, value).then(res => {
            console.log(res)
            if (res.data.status === 201 || res.data.status === 200) {
                renderTableView()
                onClose()
            } else {
                const messages = res.data.data;
                for (let key in messages) setFormError(key, messages[key]);
            }
        })
    }

    const setFormError = (name, messages) => {
        form.setFields([{ name, errors: [...messages] }]);
    }

    const onFinishFailed = (errorInfo) => {
        message.error(innerText.error_onFinishFailed);
    }
    // const onChange = (checkedValues) => console.log('checked = ', checkedValues);
    const Close = (uuid) => onClose()
    const getRowData = () => {
        API.Finance.SubKonto.show(data.uuid).then(res => {
            if (res.data.status === 200) {
                const resData = res.data.data
                setInputValues({
                    'code': resData.code,
                    'column_name': resData.column_name,
                    'name': resData.name,
                    'model_per_table_id': resData.table?.uuid
                })
                API.Com.Column.list({ uuid: resData.table?.uuid }).then(res => {
                    if (res.data.status === 200) {
                        setColumnList(res.data.data)
                    }
                })
            }
        })
    }

    const setInputValues = (value) => {
        form.setFieldsValue(value)
    }

    const getTypeList = () => {
        API.Com.Table.list().then(res => {
            if (res.data.status === 200) {
                // console.log(res)
                setTableList(res.data.data)
            }
        })
    }

    const tableOnChange = (uuid) => {
        API.Com.Column.list({ uuid: uuid }).then(res => {
            if (res.data.status === 200) {
                setColumnList(res.data.data)
            }
        })
    }

    useEffect(() => {
        if (data?.uuid) getRowData()
        getTypeList()
    }, [data.uuid])
    // console.log(`${location.pathname}/show/${data?.uuid}`)
    return (
        <Drawer
            title={innerText.btn_edit}
            width={'35%'}
            onClose={Close}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            extra={<MyButton href={`${location.pathname}/show/${data?.uuid}`} target='_blank'> {innerText.btn_view} <FolderViewOutlined /></MyButton>}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Title level={2}>{innerText.main_title}</Title>
                </Row>
                <Row>
                    <Col span={24} >
                        <Form.Item label={innerText.name} name='name' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Input placeholder={innerText.input_placeholder} />
                        </Form.Item>
                        <Form.Item label={innerText.code} name='code' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Input placeholder={innerText.input_placeholder} value={2211} />
                        </Form.Item>
                        <Form.Item label={innerText.type} name='model_per_table_id' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select
                                size="large"
                                placeholder={innerText.select_placeholder}
                                allowClear
                                onChange={tableOnChange}
                            >
                                {
                                    tableList && tableList.map((table) => {
                                        return <Option key={table.uuid}>
                                            {table.name}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label={innerText.column} name='column_name' rules={[{ required: true, message: innerText.error_insert_data }]}>
                            <Select
                                size="large"
                                placeholder={innerText.select_placeholder}
                                allowClear
                            >
                                {
                                    columnList && columnList.map((column) => {
                                        return <Option key={column}>
                                            {column}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row align='end' gutter={8} className='fixed-submit-buttons'>
                    <Divider />
                    <Col>
                        <MyButton type='primary' className='c-btn c-btn--primary' htmlType="submit">{innerText.btn_save}</MyButton>
                    </Col>
                    <Col>
                        <MyButton onClick={Close} className='c-btn c-btn--secondary'>{innerText.btn_cancel}</MyButton>
                    </Col>
                </Row>
            </Form>
        </Drawer >
    )
}

export default Index