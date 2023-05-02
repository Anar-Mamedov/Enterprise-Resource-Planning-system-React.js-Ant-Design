import React, { useState, useEffect } from 'react'
import './style.scss';
import { Col, Typography, Input, Row, Form, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import API from '../../../API'
import { useForm } from 'antd/es/form/Form';
import { Languages } from '../../../Config';
import { Description } from '../../../Components';
const innerText = Languages.SelectLanguage("SubAccounts")
const { Text } = Typography;

function Index() {
    const navigate = useNavigate()
    const { uuid } = useParams()
    const [data, setData] = useState({})
    const showData = () => {
        API.Finance.SubKonto.show(uuid).then(res => {
            if (res.data.status === 200) {
                setData(res.data.data)
            }
        })
    }
 
    useEffect(() => { showData() }, [])
    return (
        <Row justify='space-around'>
            <Col>
                <Description title={innerText.name} children={data?.name} />
            </Col>
            <Col>
                <Description title={innerText.code} children={data?.code} />
            </Col>
            <Col>
                <Description title={innerText.type} children={data?.table?.table_name} />
            </Col>
            <Col>
                <Description title={innerText.column} children={data?.column_name} />
            </Col>
        </Row>
    )
}
export default Index