import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Button, Input, Form, Typography, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from "./style.module.scss"
import styled from 'styled-components'
const { Text } = Typography

const AccTransViewField = styled(Col).attrs({

})`

    // padding: 0!important;
    display: flex!important;
    // background-color:${({ color }) => color || ''};
    gap: 0.5rem!important;
    text-transform: capitalize;
    // min-width: 50px;
    // max-width: auto;
    // min-height: 30px;
    // max-height: auto
    
    .ant-typography {
        
    }
    .ant-typography-secondary {
        width: auto;
        max-width: 200px;
        min-height: 80px;
        text-transform: none;
        word-break: break-all;
    }
`


export default memo(({ title, value }) => {
    return (
        <AccTransViewField >
            <Text strong>{title}:</Text>
            <Text type="secondary">{value}</Text>
        </AccTransViewField>
    )
})