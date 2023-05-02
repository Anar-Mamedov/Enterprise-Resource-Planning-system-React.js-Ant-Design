import React, { useEffect, useState } from 'react'
import './style.scss';
import {
   Form, Input, Drawer, Col,
   Row, Typography, Select, Button,
   message
} from 'antd';
import { Button as MyButton } from '../../../Components';
import API from '../../../API'
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("SubAccounts");
const { Text, Title } = Typography;
const { Option } = Select;

function Index({ renderTableView, onClose, open }) {
   const [tableList, setTableList] = useState(null)
   const [columnList, setColumnList] = useState(null)
   const [form] = Form.useForm()

   const onFinish = (value) => {
      API.Finance.SubKonto.store(value).then(res => {
         if (res.data.status === 201) {
            renderTableView()
            form.resetFields()
            onClose()
         } else {
            const messages = res.data.data;
            for (let key in messages) setFormError(key, messages[key]);
         }
      })
   }

   const getTypeList = () => {
      API.Com.Table.list().then(res => {
         if (res.data.status === 200) {
            // console.log(res)
            setTableList(res.data.data)
         }
      })
   }

   const setFormError = (name, messages) => {
      form.setFields([{ name, errors: [...messages] }]);
   }

   const afterChange = () => {
      form.resetFields()
   }

   const onFinishFailed = (errorInfo) => {
      message.error('Məlumatlar natamamdır!');
   }
   const onChange = (checkedValues) => console.log('checked = ', checkedValues);
   const Close = (uuid) => onClose()

   const tableOnChange = (uuid) => {
      API.Com.Column.list({ uuid: uuid }).then(res => {
         if (res.data.status === 200) {
            setColumnList(res.data.data)
         }
      })
   }
   useEffect(() => {
      getTypeList()
   }, [])
   // console.log(columnList)
   return (
      <Drawer
         title="Yeni alt hesab"
         // width={'25%'}
         className='c-drawer'
         onClose={Close}
         open={open}
         bodyStyle={{ paddingBottom: 80, backgroundColor: 'rgba(51, 48, 60, 0.04)' }}
         headerStyle={{}}
         afterOpenChange={afterChange}
      >
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Row>
               <Col span={24} >
                  <Form.Item label={innerText.code} name='code' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input placeholder={innerText.input_placeholder} className='c-input' />
                  </Form.Item>
                  <Form.Item label={innerText.name} name='name' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input placeholder={innerText.input_placeholder} value={2211} className='c-input' />
                  </Form.Item>
                  <Form.Item label={innerText.type} name='model_per_table_id' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Select
                        placeholder={innerText.select_placeholder}
                        allowClear
                        onChange={tableOnChange}
                        className='c-select'
                     >
                        {
                           tableList && tableList.map((table) => {
                              return <Option className='c-select-option' key={table.uuid}>
                                 {table.name}
                              </Option>
                           })
                        }
                     </Select>
                  </Form.Item>
                  <Form.Item label='Sütun:' name='column_name' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Select
                        placeholder={innerText.select_placeholder}
                        allowClear
                     >
                        {
                           columnList && columnList.map((column) => {
                              return <Option key={column}>
                                 {column}
                              </Option>
                           })
                        }
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
            <Row align='end' className='fixed-submit-buttons'>
               <Button htmlType="submit" type='primary' className='c-btn c-btn--primary'>{innerText.btn_save}</Button>
               <Button onClick={Close} className='c-btn c-btn--secondary'>{innerText.btn_cancel}</Button>
            </Row>
         </Form>
      </Drawer >
   )
}

export default Index