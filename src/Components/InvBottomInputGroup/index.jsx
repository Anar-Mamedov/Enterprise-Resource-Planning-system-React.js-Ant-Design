import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Space, Checkbox, InputNumber
} from 'antd';
import { PaperClipOutlined } from "@ant-design/icons";
import { useRef, useState } from 'react';
import { AccTransSubField, Button as MyButton } from '../index'
import styles from "./style.module.scss"
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("Invoice")
const { Text, Title } = Typography;
const { TextArea } = Input;

const InvUpperInputGroup = () => {
    const [isVatVisible, setIsVatVisible] = useState(false)
    const addRelationForm = useRef()
    const addRelationInputValue = (value) => {
        // API.Finance.Picklist.recommendedSourceStore(value).then((res) => {
        //     this.getRelation();
        //     this.addRelationForm.current.resetFields();
        // });
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) setIsVatVisible(false)
        else setIsVatVisible(true)
    }
    return (
        <Row gutter={[32, 16]} justify='space-between'>
            {/* <Col span={24} > */}
            <Col span={4}>
                <Form.Item
                    label={innerText.sale}
                    name='sale'
                    rules={[
                        { message: innerText.error_insert_number, pattern: new RegExp(/^[0-9]+$/) },
                        { min: 0, message: ' ' }
                    ]}
                >
                    <Input
                        type='number'
                        controls={false}
                        addonAfter={
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
            <Col span={4}>
                <Form.Item
                    label={innerText.Logistic_spendings}
                    name='logistic'
                    rules={[
                        { message: innerText.error_insert_number, pattern: new RegExp(/^[0-9]+$/) },
                        { min: 0, message: ' ' }
                    ]}
                >
                    <Input type='number' height={50} placeholder={innerText.input_placeholder} value={2211} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    label={innerText.exceptions}
                    name='exception'
                // rules={[
                //     { required: true, message: 'Məlumatı daxil edin' }
                // ]}
                >
                    <Input height={50} placeholder={innerText.input_placeholder} value={2211} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    rules={[
                        { message: innerText.input_placeholder, pattern: new RegExp(/^[0-9]+$/) },
                        { min: 0, message: ' ' }
                    ]}
                    label=' '
                    name='no_name'
                >
                    <Input type='number' height={50} placeholder={innerText.input_placeholder} value={2211} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    label={innerText.document}
                    name='document'
                // rules={[{ required: true, message: 'Məlumatı daxil edin' }]}
                >
                    <Input
                        className={styles.myInput}
                        addonAfter={<PaperClipOutlined style={{ color: '#fff' }} />}
                        height={50}
                        placeholder={innerText.input_placeholder}
                        value={2211}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    labelCol={{ span: 24 }}
                    label={
                        <Row style={{ width: '100%' }}>
                            <Col>{innerText.vat}</Col>
                            <Col>
                                <Checkbox onChange={handleCheckboxChange} />
                            </Col>
                        </Row>
                    }
                    name='assign'
                // rules={[{ required: true, message: 'Məlumatı daxil edin' }]}
                >
                    {
                        isVatVisible ? (
                            <Input
                            addonBefore={
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
                            }
                            height={50}
                            placeholder={innerText.input_placeholder}
                            value={2211}
                        />
                        ) : (
                            <AccTransSubField title={'ƏDV-dən azad'} value={'hey1'} />
                        )
                    }
                   
                </Form.Item>
            </Col>
            <Col span={4}>
                <Space style={{ width: '100%' }} direction='vertical'>
                    {/* <Col style={{ paddingRight: 0, paddingLeft: 0 }} span={24}> */}
                    <Form.Item
                        label={innerText.vat_debet}
                        name='tax_debet'
                    // rules={[{ required: true, message: 'Məlumatı daxil edin' }]}
                    >
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
                    {/* </Col> */}
                    {/* <Col style={{ paddingRight: 0, paddingLeft: 0 }}> */}
                    <Form.Item
                        label={innerText.debet}
                        name='debet'
                    //   rules={[{ required: true, message: 'Məlumatı daxil edin' }]}
                    >
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
                    {/* </Col> */}
                </Space>
            </Col>
            <Col span={4}>
                <Space style={{ width: '100%' }} direction='vertical'>
                    {/* <Col style={{ paddingRight: 0, paddingLeft: 0 }} span={24}> */}
                    <Form.Item
                        label={innerText.vat_credit}
                        name='tax_credit'
                    // rules={[{ required: true, message: 'Məlumatı daxil edin' }]}
                    >
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
                    {/* </Col> */}
                    {/* <Col style={{ paddingRight: 0, paddingLeft: 0 }}> */}
                    <Form.Item
                        label={innerText.vat_credit}
                        name='credit'
                    // rules={[{ required: true, message: 'Məlumatı daxil edin' }]}
                    >
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
                    {/* </Col> */}
                </Space>
            </Col>
            <Col span={6}>
                <Form.Item label={innerText.note} name='note' >
                    <TextArea style={{ padding: "0 11px" }} rows={6} />
                </Form.Item>
            </Col>
        </Row >
    )
}

export default InvUpperInputGroup;