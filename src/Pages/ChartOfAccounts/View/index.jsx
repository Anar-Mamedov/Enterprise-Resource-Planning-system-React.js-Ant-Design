import React, { useState, useEffect, useRef } from 'react'
import './style.scss';
import { useParams } from 'react-router-dom';
import {
    Col, Layout, Row
} from 'antd';
import { Description } from '../../../Components';
import API from '../../../API'
import { Languages } from "../../../Config";
const innerText = Languages.SelectLanguage("ChartOfAccount");
let code;
function Index(props) {

    const [data, setData] = useState({})
    const { uuid } = useParams()

    const uchot_types = useRef([
        {
            key: 'amount_accounting',
            name: 'Kəmiyyət uçotu'
        },
        {
            key: 'currency_accounting',
            name: 'Valyuta uçotu'
        },
        {
            key: 'division_accounting',
            name: 'Bölünmə uçotu'
        },
        {
            key: 'tax_accounting',
            name: 'Vergi uçotu'
        }
    ])
    
    let type_value = useRef("");

    const showData = () => {
        type_value.current = ""
        API.Finance.KontoPlans.show(uuid).then(res => {
            const { data } = res.data
            let number = data.number.split("-");
            code = ""
            number.map(v => {
                code += v
            })
            setData(res.data.data)
            uchot_types.current.forEach(value => {
                if (data[value.key] === 1) {
                    type_value.current = type_value.current + value.name + ","
                }
            })
        })
    }

    useEffect(() => { showData() }, [])
    return (
        <Layout style={{ background: '#fff' }} >
            <Col style={{ display: 'flex' }} span={24}>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    <Description title={innerText.account_number} children={data?.number} />
                </Row>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    <Description title={innerText.code} children={code} />
                </Row>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    <Description title={innerText.parent} children={data?.parent?.name} />
                </Row>
            </Col>
            <Col style={{ display: 'flex' }} span={24}>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    <Description title={innerText.name} children={data?.name} />
                </Row>
            </Col>
            <Col style={{ display: 'flex' }} span={24}>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    <Description title={innerText.type} children={innerText?.active_btn} />
                </Row>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    <Description title={innerText.uchot_type} children={type_value.current} />
                </Row>
            </Col>
            <Col>
                <Row style={{ marginRight: '40px', marginBottom: '20px' }}>
                    {data?.plans?.map((value, index) => (
                        < Description key={index} title={innerText.sub_account} children={value?.subkonto?.name} />
                    ))}
                </Row>
            </Col>

        </Layout>
    )
}

export default Index