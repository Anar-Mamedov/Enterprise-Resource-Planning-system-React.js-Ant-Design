import { Form, DatePicker, Input, Divider, Button, Row, Col, Select } from 'antd';
import { EditOutlined, StepBackwardOutlined, WarningOutlined, CheckOutlined } from '@ant-design/icons';
import { createRef, useEffect, useState } from 'react';
import moment from 'moment';
import API from '../../API'
import React, { Component, memo } from 'react'
const { Option } = Select
/*
const defaultData = [
    {
        "key": "reject_method",
        "content": null
    },
    {
        "key": "next_method",
        "content": {
            "uuid": "b91fb981-2e1e-4c1a-81c2-19999acca284",
            "button_name_nat": "Təsdiq üçün göndər",
            "button_name_eng": "Order send",
            "status_id": 2,
            "status_group_id": 87
        }
    },
    {
        "key": "return_method",
        "content": null
    }
]
*/

const Test = () => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        console.log(values);
    }

    const onCurrencyChange = (v) => {
        console.log(v);
        form.setFieldValue('currency', v)
    }

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item>
                <Select onChange={onCurrencyChange} placeholder='select'>
                    <Option value='AZN'>AZN</Option>
                    <Option value="USD">USD</Option>
                </Select>
            </Form.Item>
            <Form.Item >
                <Input
                    addonAfter={
                        <Form.Item name='currency' style={{ width: '90px' }} >
                            <Input disabled />
                        </Form.Item>
                    }
                    placeholder='0'
                />
            </Form.Item>

        </Form>
    )
}


export default Test;
