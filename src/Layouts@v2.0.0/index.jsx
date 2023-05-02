import React, { useState } from 'react';
// import style from './style.module.scss';

import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Container from './Container';
import {
   GlobalOutlined, SettingOutlined, PoweroffOutlined
} from '@ant-design/icons';
import { Layout, Button, Switch, Space } from 'antd';
const { Sider } = Layout;

/* #f4f4f4 - border-color 
   #28a745 - green
*/
const style = {
   // sider: {
   //    borderRight: `1px solid #f4f4f4`
   // },
   logo: {
      padding: 16,
      display: 'flex',
      justifyContent: 'space-between',
      light: {
         background: 'rgba(255, 255, 255)'
      },
      dark: {
         color: '#fff'
      }
   },
   // bottom: {
   //    margin: 0,
   //    display: 'flex',
   //    justifyContent: 'space-around',
   //    alignItems: 'center'
   // },
   // button: {
   //    color: '#FFFFFFA6'
   // },
   // switch: {
   //    backgroundColor: '#28a745'
   // },
   // buttons: {
   //    padding: '10px 20px'
   // }
}


const Index = () => {

   const [collapsed, setCollapsed] = useState(false);
   const [theme, setTheme] = useState('dark');
   const changeTheme = (value) => {
      setTheme(value ? 'light ' : 'dark');
   };
   return (
      <Layout className='layout-sider'>
         <Sider breakpoint="lg" width='260px' className='sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Space wrap align='center' className={'logo' + ' ' + (theme === 'dark' ? 'logo--dark' : 'logo--light')}>
               logo
               <Switch className='switch' onChange={changeTheme} />
            </Space>
            <Menu theme={theme} />
         </Sider>

         <Layout >
            <Header />
            <Container />
            {/* <Footer /> */}
         </Layout>

      </Layout >
   );

};
export default Index;