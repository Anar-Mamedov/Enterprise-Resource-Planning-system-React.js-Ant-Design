import { ConfigProvider } from 'antd';
import Routes from './Routes';
import './Assets/style/style.scss'
import { Permission, Helper } from './Config'

Permission.DisabledRequired()
Helper()
/*
#28a745 - primary
#3f4254 - gray-dark
#f9f9f9 - light
#f4f4f4 - gray-200
#181c32 - dark
#f64e60 - danger
#ffa800 - warning
#1bc5bd - success
#e1e3ea - gray-300
*/

const Index = () => (
   <ConfigProvider
      theme={{
         token: {
            colorPrimary: '#28a745',
            colorTextBase: '#3f4254',
            // controlHeight: 38,
            colorBgLayout: '#f9f9f9',
            // colorBgContainer: 'red',
            // colorBgBase: 'yellow',
            // colorTextLabel: '#3f4254',
            colorBgContainerDisabled: '#e1e3ea',
            colorBorder: '#f4f4f4',
            colorTextHeading: '#181c32',
            colorText: '#3f4254',
            colorError: '#f64e60',
            colorSuccess: '#1bc5bd',
            colorWarning: '#ffa800',
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
         }
      }}>
      <Routes />
   </ConfigProvider>
)

export default Index;