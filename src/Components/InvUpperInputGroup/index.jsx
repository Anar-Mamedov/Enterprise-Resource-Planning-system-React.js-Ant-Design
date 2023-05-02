import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader
} from 'antd';
import { AccTransSubField, Button as MyButton } from '../index'
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("Invoice")
const { Text, Title } = Typography;
const { TextArea } = Input;

const InvUpperInputGroup = ({ openBankRequisiteModal }) => {
    // const addRelationForm = useRef()
    const addRelationInputValue = (value) => {
        // API.Finance.Picklist.recommendedSourceStore(value).then((res) => {
        //     this.getRelation();
        //     this.addRelationForm.current.resetFields();
        // });
    };
    return (
        <Row gutter={[32, 16]} justify='space-between'>
            <Col span={4}>
                <Form.Item label={innerText.contract_number} name='contract_number' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
                <Form.Item label={innerText.company} name='code' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
                <Form.Item label={innerText.client} name='client' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
                    rules={[
                        {
                            required: true,
                            message: innerText.error_insert_data
                        }
                    ]}
                    style={{ width: '200px', display: 'inline-block' }}
                    label={innerText.invoice_date}
                    name={['invoice_date']}
                >
                    <DatePicker />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    label={innerText.invoice_number}
                    name='invoice_number'
                    rules={[
                        { required: true, message: innerText.error_insert_data }
                    ]}
                >
                    <Input height={50} placeholder={innerText.select_placeholder} value={2211} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label={innerText.assignment} name='assign'>
                    <Input height={50} placeholder={innerText.select_placeholder} value={2211} />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Məlumatı daxil edin',
                    //     }
                    // ]}
                    style={{ width: '200px', display: 'inline-block' }}
                    label={innerText.payment_date}
                    name={['payment_date']}
                >
                    <DatePicker />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label={innerText.project} name='project'>
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
                <Form.Item label=' ' style={{ width: '200px', display: 'inline-block' }}>
                    <MyButton green="true" onClick={openBankRequisiteModal}>{innerText.bank_requisite}</MyButton>
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item label=' '>
                    <AccTransSubField green="true" title={innerText.currency} value='AZN' />
                </Form.Item>
            </Col>
        </Row>
    )
}

export default InvUpperInputGroup;