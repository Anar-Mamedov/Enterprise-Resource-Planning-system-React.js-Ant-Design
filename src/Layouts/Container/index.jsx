import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout, theme } from 'antd';
const { Content } = Layout;
const Index = () => {
  const [accordion, setAccordion] = useState([])
  const { token: { colorBgContainer } } = theme.useToken();
  const location = useLocation()

  useEffect(() => {
    setAccordion(location.pathname.split('/'))
  }, [location])

  return (
    <Content className={style.container} >
      <Breadcrumb style={{ margin: '16px 0' }}>
        {accordion.map((value, index) => (
          value && <Breadcrumb.Item key={index}>{value}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div className={style.content} style={{ background: colorBgContainer }} >
        <Outlet />
      </div>
    </Content>
  )
}
export default Index;