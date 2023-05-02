import React from 'react';
import './style.scss';

import { Layout, theme } from 'antd';
const { Header } = Layout;

const Index = () => {

    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} >
            Header
        </Header>
    )
}

export default Index;
