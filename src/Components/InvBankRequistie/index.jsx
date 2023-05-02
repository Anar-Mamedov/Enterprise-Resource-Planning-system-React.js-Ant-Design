import { Space, Row, Col, Form, Select } from "antd";
import styled from "styled-components";
import { Languages } from "../../Config";
const innerText = Languages.SelectLanguage("Invoice")
const MyRow = styled(Row).attrs({})`
    // width: 100%;
    // height: 200px;
    // align-content: center;
    // padding: 0 2rem;
`

const MyFormItem = styled(Form.Item).attrs({})`

`

const Index = () => {
    return (
        // <Space direction="vertical"> 
        <Row gutter={8} align='center' justify='space-between' style={{ width: '100%', height: '220px', alignContent: 'center', padding: '0 2rem' }} >
            <Col span={6}>
                <Form.Item label={innerText.bank} name='bank' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
            <Col span={6}>
                <Form.Item label={innerText.currency} name='currency' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
            <Col span={6}>
                <Form.Item label={innerText.type} name='type' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
            <Col span={6}>
                <Form.Item label={innerText.account_number} name='account_number' rules={[{ required: true, message: innerText.error_insert_data }]}>
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
        </Row>
        // </Space>
    )
}

export default Index;