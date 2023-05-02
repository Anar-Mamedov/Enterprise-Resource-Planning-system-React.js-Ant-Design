import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader
} from 'antd';
const { Text, Title } = Typography;
const { TextArea } = Input;

const InvContViewInputGroup = ({ removeInputGroup }) => {
    const removePart = (index) => {
        removeInputGroup(index)
    }
    return (
        <>
            <Row gutter={[32, 16]}>
                {/* <Col span={24} > */}
                <Col span={4}>
                    <Form.Item label='Təşkilat' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Kontragent' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Növ:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item label='Valyuta:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Sütun:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        style={{ width: '200px', display: 'inline-block' }}
                        label='Tarix:'
                    >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Predment:'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Ödəniş növü:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        style={{ width: '200px', display: 'inline-block' }}
                        label='Başlama tarixi:'
                    >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        style={{ width: '200px', display: 'inline-block' }}
                        label='Bitmə tarixi:'
                    >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
            </Row>
            <hr />
            <Title level={5}>Maliyyə detalları</Title>
            <Divider />
            <Row gutter={[32, 16]}>
                {/* <Col span={24} > */}
                <Col span={4}>
                    <Form.Item
                        label='Kateqoriya'
                        // name='code'
                        style={{ margin: 0 }}
                    >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Təsnifat'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Öıcü vahidi:'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item label='Miqdar:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span='auto'>
                    <Form.Item label='Qiymət:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Məbləğ:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item label='ƏDV:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Bank zəmanət məbləği:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Zəmanət verən bank:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Bank zəmanətinin tarixi:'                    >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Bank zəmanətinin müddəti:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Qeyd:' >
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label='Məbləğ:'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item initialValue={234} label='ƏDV məbləği:'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item initialValue={122} label='Cəmi məbləğ:'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item initialValue={566} label='Cımi vergi daxil məbləğ:'>
                        <Input value={321} disabled style={{ border: 'none', backgroundColor: 'transparent' }} />
                    </Form.Item>
                </Col>
                {/* <Col>
                    {
                        <Button onClick={_ => removePart(index)} icon={<CloseOutlined style={{ fontSize: '16px' }} />} />
                    }
                </Col> */}
            </Row>
            <hr />
        </>
    )
}

export default InvContViewInputGroup;