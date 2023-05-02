import React, { useState } from 'react'
import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Languages } from '../../Config';
import { Description, Button as MyButton } from '../index';
const innerText = Languages.SelectLanguage("InvoiceContract")
const { Text, Title } = Typography;
const { TextArea } = Input;

const InvContDynamicInputGroup = ({ index, removeInputGroup, listLength }) => {
    const [radioValue, setRadioValue] = useState(innerText.btn_service)
    const removePart = (index) => {
        removeInputGroup(index)
    }
    return (
        <>
            <Row justify="space-between" gutter={[32, 16]}>
                {/* <Col span={24} > */}
                <Col span={4}>
                    <Form.Item
                        label={innerText.category}
                        // name='code'
                        rules={[{ required: true, message: innerText.error_insert_data }]}
                        style={{ margin: 0 }}
                    >
                        <Form.Item style={{ margin: 0 }}>
                            <Radio.Group style={{ margin: 0, width: '100%' }} buttonStyle='solid' onChange={_ => setRadioValue(_.target.value)} value={radioValue}>
                                <Radio.Button
                                    value={innerText.btn_service}
                                    style={{ width: '50%', color: '#28C76F', borderColor: '#28C76F', borderBottomLeftRadius: 0 }}
                                >
                                    {innerText.btn_service}
                                </Radio.Button>
                                <Radio.Button
                                    value={innerText.btn_product}
                                    style={{ width: '50%', color: '#28C76F', borderColor: '#28C76F', borderBottomRightRadius: 0 }}
                                >
                                    {innerText.btn_product}
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item style={{ margin: 0 }}>
                            <Select
                                // style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, borderRadius: 0, width: '100%' }}
                                placeholder={innerText.select_placeholder}
                                allowClear
                            // onChange={tableOnChange}
                            >
                                {/* {
                                    tableList && tableList.map((table) => {
                                            return <Option key={table.uuid}>
                                        {table.name}
                                        </Option>
                                    })
                                } */}
                            </Select>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={innerText.classification} name='name' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Select
                            // size="large"
                            placeholder={innerText.select_placeholder}
                            allowClear
                        // onChange={tableOnChange}
                        >
                            {/* {
                                    tableList && tableList.map((table) => {
                                        return <Option key={table.uuid}>
                                        {table.name}
                                        </Option>
                                    })
                                } */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={innerText.unit_of_measurement} name='model_per_table_id' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Select
                            // size="large"
                            placeholder={innerText.select_placeholder}
                            allowClear
                        // onChange={tableOnChange}
                        >
                            {/* {
                                    tableList && tableList.map((table) => {
                                        return <Option key={table.uuid}>
                                        {table.name}
                                        </Option>
                                    })
                                } */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item label={innerText.quantity} name='quantity' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Input height={50} placeholder={innerText.input_placeholder} />
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item label={innerText.price} name='price' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Input height={50} placeholder={innerText.input_placeholder} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={innerText.amount} name='amount' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Input height={50} placeholder={innerText.input_placeholder} />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item label={innerText.vat} name='tax' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Input
                            addonBefore={
                                <Select
                                    placeholder={innerText.select_placeholder}
                                    style={{
                                        width: 'auto',
                                    }}
                                // options={{}}
                                />
                            }

                            height={50}
                            placeholder='edv'
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={innerText.bank_guarantee_amount} name='bank_guarantee_amount' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Input height={50} placeholder={innerText.input_placeholder} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={innerText.bank_guarantee} name='bank_guarantee' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Select
                            // size="large"
                            placeholder={innerText.select_placeholder}
                            allowClear
                        // onChange={tableOnChange}
                        >
                            {/* {
                                    tableList && tableList.map((table) => {
                                        return <Option key={table.uuid}>
                                        {table.name}
                                        </Option>
                                    })
                                } */}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        label={innerText.bank_guarantee_date}
                        name="bank_guarantee_datee"
                        rules={[
                            {
                                required: true,
                                message: innerText.error_insert_data,
                            }
                        ]}
                    // style={{ width: '200px', display: 'inline-block' }}
                    >
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label={innerText.bank_guarantee_duration} name='bank_guarantee_duration' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <Input
                            addonBefore={
                                <Select
                                    placeholder={innerText.select_placeholder}
                                    style={{
                                        width: 'auto',
                                    }}
                                // options={{}}
                                />
                            }

                            height={50}
                            placeholder={innerText.input_placeholder}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={innerText.note} name='note' rules={[{ required: true, message: innerText.error_insert_data }]}>
                        <TextArea rows={4} placeholder={innerText.input_placeholder} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Row justify="space-between" >
                        <Col style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <Col>
                                <Description
                                    title={innerText.amount}
                                    children="321"
                                    direction="vertical"
                                    top={0}
                                    left={0}
                                />
                            </Col>
                            <Col>
                                <Description
                                    title={innerText.vat_amount}
                                    children="432"
                                    direction="vertical"
                                    top={0}
                                    left={0}
                                />
                            </Col>
                        </Col>
                        <Col style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <Col>
                                <Description
                                    title={innerText.sum_amount}
                                    children="435"
                                    direction="vertical"
                                    top={0}
                                    left={0}
                                />
                            </Col>
                            <Col>
                                <Description
                                    title={innerText.sum_amount_vat}
                                    children="532"
                                    direction="vertical"
                                    top={0}
                                    left={0}
                                />
                            </Col>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    {
                        <Button onClick={_ => removePart(index)} icon={<CloseOutlined style={{ fontSize: '16px' }} />} />
                    }
                </Col>
            </Row>
            <Divider style={{ margin: '3rem 0' }} />
        </>
    )
}

export default InvContDynamicInputGroup;