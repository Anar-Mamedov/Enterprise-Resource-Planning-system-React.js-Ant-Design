import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Button, Input, Form, Typography, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AccTransViewField } from '../../Components'
import styled from 'styled-components';
import AccTransSubField from '../AccTransSubField';
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("AccountTransactions")

const InputRow = styled(Row).attrs({})`
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: space-between;
    .ant-typography {
        max-height: 30px;
    }
    .ant-typography-secondary {
        max-height: 30px
    }
`

const SubRow = styled(Row).attrs({})`
    display: flex;
    flex-direction: column;
    .ant-typography {
        height: 20px
    }
    .ant-typography-secondary {
        height: 20px
    }
`

const Index = ({ data, index }) => {
    return (
        <>
            <Col span={3}>
                <AccTransViewField title={`No${index}`} />
            </Col>
            <Col span={9}>
                <AccTransViewField color="red" title={innerText.debet} value={data?.debet?.account_plan?.name} />
                <InputRow>
                    <AccTransSubField title={innerText.quantity} value={data?.debet?.quantity} />
                    <AccTransSubField title={innerText.amount} value={data?.debet?.amount} />
                    <AccTransSubField title={innerText.currency} value={data?.debet?.currency?.name} />
                </InputRow>
                <Divider />
                <SubRow>
                    {
                        data?.debet?.subkonto_belong?.map((val, ind) => (
                            <AccTransSubField key={val?.uuid} title={val?.subkonto_chart_account?.subkonto?.name} value={val?.product?.name_nat} />
                        ))
                    }
                </SubRow>
            </Col>
            <Col span={9}>
                <AccTransViewField title={innerText.credit} value={data?.credit?.account_plan?.name} />
                <InputRow>
                    <AccTransSubField title={innerText.quantity} value={data?.credit?.quantity} />
                    <AccTransSubField title={innerText.amount} value={data?.credit?.amount} />
                    <AccTransSubField title={innerText.currency} value={data?.credit?.currency?.name} />
                </InputRow>
                <Divider />
                <SubRow>
                    {
                        data?.credit?.subkonto_belong?.map((val, ind) => (
                            <AccTransSubField key={val?.uuid} title={val?.subkonto_chart_account?.subkonto?.name} value={val?.product?.name_nat} />
                        ))
                    }
                </SubRow>
            </Col>
            <Col span={3}>
                <AccTransViewField title={innerText.price} value={data?.debet?.amount} />
            </Col>
            <Divider />
        </>
    )
}

export default Index