import React, { useState } from 'react';
import style from './style.module.scss';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Container from './Container';

import {
    GlobalOutlined, SettingOutlined, PoweroffOutlined
} from '@ant-design/icons';
import { Layout, Button } from 'antd';
const { Sider } = Layout;



const Index = () => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={style.container} >

            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className={style.logo} >Logo</div>
                <Menu />
                <div className={style.bottom} >
                    <Button type="link" shape="circle" icon={<GlobalOutlined className={style.button} />} />
                    <Button type="link" shape="circle" icon={<SettingOutlined className={style.button} />} />
                    <Button type="link" shape="circle" icon={<PoweroffOutlined className={style.button} />} />
                </div>
            </Sider>

            <Layout>
                <Header />
                <Container />
                {/* <Footer /> */}
            </Layout>

        </Layout >
    );

};
export default Index;