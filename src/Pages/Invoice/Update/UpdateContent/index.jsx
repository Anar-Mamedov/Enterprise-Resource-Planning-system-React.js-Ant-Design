import React, { useState } from 'react'
import {
    Form, Input, Drawer, Col,
    Row, Typography, Select, Button,
    message, DatePicker, Divider, Radio, Cascader
} from 'antd';
import { PlusSquareOutlined, EditOutlined } from '@ant-design/icons';
import { Description, AccTransSubField, InvInnerTable } from '../../../../Components'
// import { InvContStaticInputGroup } from '../../../Components';
// import { InvContDynamicInputGroup } from '../../../Components';
// import { InvContViewInputGroup } from '../../../Components';
import { Languages } from '../../../../Config';
const innerText = Languages.SelectLanguage("Invoice")
const { Text, Title } = Typography;
const { TextArea } = Input;


const Index = ({ form, isEdit }) => {
    const some = [
        {
            title: 'Müqavilə nömrəsi',
            value: '34813091283109'
        },
        {
            title: 'Tşkilat',
            value: 'Resource planning'
        },
        {
            title: 'Müştəri',
            value: 'at geotech'
        },
        {
            title: 'Faktura tarixi',
            value: '01.01.2023'
        },
        {
            title: 'Faktura nömrəsi',
            value: '5432442322113'
        },
        {
            title: 'Təyinat',
            value: 'təyinat'
        },
        {
            title: 'Ödəniş tarixi',
            value: '01.01.2022'
        },
        {
            title: 'Valyuta',
            value: 'AZN'
        }
    ]

    const requsite = [
        {
            title: 'Bank',
            value: 'Access Bank'
        },
        {
            title: 'Valyuta',
            value: 'AZN'
        },
        {
            title: 'Növ',
            value: 'aa44'
        },
        {
            title: 'Hesab nömrəsi',
            value: '78908282'
        }
    ]

    const additional = [
        {
            title: 'Endirim',
            value: '120AZN'
        },
        {
            title: 'Yol xərclərit',
            value: '10AZN'
        },
        {
            title: 'ƏDV dərcəsi',
            value: '18%'
        },
        {
            title: 'İstisnalar',
            value: 'lorem ipsum'
        },
        {
            title: 'Sənəd',
            value: 'document'
        },
        {
            title: 'Qeyd',
            value: 'lorem ipsum dolor omet sit'
        }
    ]
    const Close = () => {

    }
    return (
        <>
            <Row gutter={[32, 32]} justify='space-between'>
                {
                    some.map((val, ind) => (
                        <Col key={ind}>
                            <Description top={0} left={0} title={val.title} children={val.value} />
                        </Col>
                    ))
                }
            </Row>
            <Row justify='space-between' style={{ margin: '3rem 0' }}>
                <Col>
                    <Title style={{ margin: 0, color: '#28C76F' }} level={5}>{innerText.bank_requisite}</Title>
                </Col>
                {
                    requsite.map((val, ind) => (
                        <Col key={ind}>
                            <Description top={0} left={0} title={val.title} children={val.value} />
                        </Col>
                    ))
                }
            </Row>
            <InvInnerTable isEdit={isEdit} />
            <Row justify='space-between' style={{ margin: '3rem 0' }}>
                <Col>
                    <Title style={{ margin: 0, color: '#28C76F' }} level={5}>{innerText.additions}</Title>
                </Col>
                {
                    additional.map((val, ind) => (
                        <Col key={ind}>
                            <Description top={0} left={0} title={val.title} children={val.value} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Index;