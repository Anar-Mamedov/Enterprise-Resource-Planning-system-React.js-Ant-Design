import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader
} from 'antd';
import { Description } from '../index';
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("InvoiceContract")
const { Text, Title } = Typography;
const { TextArea } = Input;

const InvContViewInputGroup = ({ removeInputGroup }) => {
    const removePart = (index) => {
        removeInputGroup(index)
    }
    return (
        <>
            <Row justify="space-between">
                {/* <Col span={24} > */}
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.company} children={3434} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.supplier} children={3434} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item >
                        <Description top={0} left={0} title={innerText.type} children={3434} />
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.currency} children={3434} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.number} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.date} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.predment} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.payment_type} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.start_date} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.end_date} children={13034} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>
                    <Title level={5}>{innerText.finance_details}</Title>
                    <Divider />
                </Col>
            </Row>
            <Row justify="space-between" gutter={[32, 16]}>
                {/* <Col span={24} > */}
                <Col span={5}>
                    <Form.Item
                        // label='Kateqoriya'
                        // name='code'
                        style={{ margin: 0 }}
                    >
                        <Description top={0} left={0} title={innerText.category} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.classification} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.unit_of_measurement} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.quantity} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.price} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.amount} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.vat} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.bank_guarantee_amount} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.bank_guarantee} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.bank_guarantee_date} children={13034} />
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.bank_guarantee_duration} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item>
                        <Description top={0} left={0} title={innerText.note} children={13034} />
                        {/* <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} /> */}
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
        </>
    )
}

export default InvContViewInputGroup;