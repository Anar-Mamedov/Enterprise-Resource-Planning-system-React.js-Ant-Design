import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Button, Input, Form, Typography, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components'
const { Text } = Typography


const AccTransSubField = styled(Col).attrs({

})`

    display: flex!important;
    gap: 0.5rem!important;
    text-transform: capitalize;
    background-color: ${({ green }) => green ? '#28C76F!important' : ' '}

`

export default memo(({ title, value, strong }) => {
    return (
        // <Col>Hey</Col>
        <AccTransSubField>
            <Text strong={strong}>{title}</Text>
            <Text type="secondary">{value}</Text>
        </AccTransSubField>
    )
})