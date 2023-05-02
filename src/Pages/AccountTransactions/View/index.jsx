import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Button, Input, Form, Typography, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AccTransViewField, AccTransViewGroup } from '../../../Components'
import API from '../../../API'
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("AccountTransactions")
const { Text } = Typography


const Index = () => {
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [sumAmount, setSumAmount] = useState(null)
    const [date, setDate] = useState(null)
    const [form] = Form.useForm()
    const { uuid } = useParams()
    const showData = () => {
        API.Finance.AccountTransactions.show(uuid).then(res => {
            if (res.data.status === 200) {
                const resData = res.data.data
                // console.log(resData)
                const currentUser = `${resData?.transaction?.employee?.surname_nat} ${resData?.transaction?.employee?.name_nat}`
                setData(resData.data)
                setStatus(resData?.transaction?.transaction?.status_type?.name)
                setCurrentUser(currentUser)
                setSumAmount(resData?.transaction?.SumAmount)
                setDate(resData?.transaction?.date)
            }
        })
    }
    useEffect(() => { showData() }, [])

    return (
        // <Layout>
        <>
            <Row style={{ padding: '1rem' }} align='bottom'>
                <Col>
                    <Text strong style={{ fontSize: '2rem' }}>{innerText.btn_view}</Text>
                </Col>
            </Row>
            <Row justify='space-between' style={{ marginTop: '2rem', padding: '1rem', height: '50px' }}>
                <Col span={3}>
                    <AccTransViewField title={innerText.date} value={date} />
                </Col>
                <Col span={9}>
                    <AccTransViewField title={innerText.responsible_person} value={currentUser} />
                </Col>
                <Col span={9}>
                    <AccTransViewField title={innerText.total_amount} value={sumAmount} />
                </Col>
                <Col span={3}>
                    <AccTransViewField title={innerText.status} value={status} />
                </Col>
            </Row>
            <Divider />
            <Row justify='space-between' style={{ padding: '1rem' }}>
                {
                    data?.map((value, index) => (
                        <AccTransViewGroup data={value} key={value?.uuid} index={index} />
                    ))
                }
            </Row>
        </>
        // </Layout>
    )
}

export default Index