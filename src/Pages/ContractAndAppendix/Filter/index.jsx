import React, { useState } from 'react'
import './style.scss';
import {
    Row, Col, Button,
    Form, Drawer, Checkbox,
    Input
} from 'antd';
const { Search } = Input;

function Index(props) {
    const [disabled, setDisabled] = useState(false)
    const onFinish = (value) => {

    }
    const onClose = (status = true) => {
        // this.formRef.current.resetFields()
        // filter = []
        // if (status) props.onClose(props.data);
        setDisabled(disabled)
    }

    const Reset = () => {
        props.onClose('reset')
    }
    return (
        <Drawer
            title="Filter"
            width={350}
            className='comp-modal-filter-by'
            onClose={props.onClose}
            open={props.visibleFilter}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Form layout="vertical" onFinish={onFinish} >
                <Row gutter={16}>
                    <Input placeholder="Search" style={{ width: 239, height: 38, padding: '8px 10px', marginBottom: '20px' }} />
                    <Col span={24} >
                        <Form.Item valuePropName="checked" style={{ marginBottom: '20px' }}>
                            <Checkbox >{'filter.name'}</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row align='center' style={{ marginTop: 30 }}>
                    <Button htmlType="submit" type='primary' className='filtered'>Filtrlə</Button>
                    <Button htmlType='reset' onClick={Reset} type='danger' className='reset'>Təmizlə</Button>
                </Row>

            </Form>
        </Drawer >
    )
}

export default Index