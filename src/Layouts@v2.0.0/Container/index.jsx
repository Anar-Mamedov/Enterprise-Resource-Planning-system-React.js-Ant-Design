import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
const { Content } = Layout;
const Index = () => {
   //   const { token: { colorBgContainer } } = theme.useToken();

   return (
      <Content style={{ margin: 25 }}>
         <Outlet />
      </Content>
   )
}
export default Index;