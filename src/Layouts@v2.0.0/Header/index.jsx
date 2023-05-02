import React, { useEffect, useState } from 'react';
import './style.scss';

import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme, Space, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { HomeOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title, Text } = Typography;

const Index = () => {
   const [accordion, setAccordion] = useState([])
   const location = useLocation()

   useEffect(() => {
      setAccordion(location.pathname.split('/'))
   }, [location])

   const { token: { colorBgContainer } } = theme.useToken();
   const items = [
      {
         label: <a href="https://www.antgroup.com">My Profile</a>,
         key: '0',
      },
      {
         label: <a href="https://www.aliyun.com">My Project</a>,
         key: '1',
      },
      // {
      //    type: 'divider',
      // },
      {
         label: <a href="https://www.aliyun.com">Settings</a>,
         key: '2',
      },
      {
         label: <a href="https://www.aliyun.com">Sign out</a>,
         key: '3',
      },
   ];
   return (
      <Header className='header' >
         <Breadcrumb className='c-breadcrumb'>
            {accordion.map((value, index) => {
               const isLastItem = accordion.length === index
               return value && <Breadcrumb.Item key={index} > {value === 'finance' ? <HomeOutlined /> : value}</Breadcrumb.Item>
            })}
         </Breadcrumb>
         <Space>
            <Dropdown
               menu={{
                  items,
               }}
               trigger={['click']}
               overlayClassName='user-dropdown'
               dropdownRender={menu => {
                  return (
                     <>
                        <Space className='user-dropdown__head' size='middle'>
                           {/* user picture  */}
                           <div className='h-50 w-50 bg-secondary rounded'></div>
                           <Space direction='vertical' size={0}>
                              <Title className='font-small-3' style={{ marginBottom: 0 }}>Camden Camden</Title>
                              <Text className='head-text font-small-2'>admin@demo.com</Text>
                           </Space>
                        </Space>
                        {menu}
                     </>
                  )
               }}
            >
               <a onClick={(e) => e.preventDefault()}>
                  <Space>
                     <Avatar icon={<UserOutlined />} />
                  </Space>
               </a>
            </Dropdown>
         </Space>
      </Header>
   )
}

export default Index;
