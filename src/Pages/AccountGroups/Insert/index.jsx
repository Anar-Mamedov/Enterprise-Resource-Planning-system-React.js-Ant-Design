import React from 'react'
import './style.scss';
import {
   Form, Input, Drawer, Col,
   Row, Typography, Select, Button,
   message,
   Divider,
   DatePicker
} from 'antd';
import API from '../../../API'
import { GrClose } from 'react-icons/gr';
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("AccountGroups")
const { Text, Title } = Typography;
const { Option } = Select;

function Index({ renderTableView, onClose, open }) {
   const [form] = Form.useForm()

   const onFinish = (value) => {
      API.Finance.KontoGroups.store(value).then(res => {
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

   const setFormError = (name, messages) => {
      form.setFields([{ name, errors: [...messages] }]);
   }

   const afterChange = () => {
      form.resetFields()
   }

   const onFinishFailed = (errorInfo) => {
      message.error('Məlumatlar natamamdır!');
   }
   const Close = (uuid) => onClose()
   return (
      <Drawer
         title="Yeni"
         width={'30%'}
         className='c-drawer'
         onClose={Close}
         closeIcon={<GrClose size={18} style={{ display: 'inherit' }} />}
         open={open}
         bodyStyle={{ paddingBottom: 80 }}
         headerStyle={{ padding: 24, backgroundColor: 'rgba(51, 48, 60, 0.04)' }}
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
                  <Form.Item label={innerText.name_eng} name='name_eng' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input placeholder={innerText.input_placeholder} className='c-input c-input--solid' />
                  </Form.Item>
                  <Form.Item label={innerText.name_az} name='name_nat' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input placeholder={innerText.input_placeholder} value={2211} className='c-input c-input--solid' />
                  </Form.Item>
                  <Form.Item label={innerText.abbreviation_az} name='abb_az' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input placeholder={innerText.input_placeholder} className='c-input c-input--solid' />
                  </Form.Item>
                  <Form.Item label={innerText.abbreviation_eng} name='abb_eng' className='c-form-item' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input placeholder={innerText.input_placeholder} className='c-input c-input--solid' />
                  </Form.Item>

                  
                  {/* ******* Datepicker example ********  */}
                  {/* <Form.Item className='c-form-item' >
                     <DatePicker placeholder='Tarix seçin' className='c-datepicker c-datepicker--solid full-width' popupClassName='c-datepicker-calendar'/>
                  </Form.Item> */}
                  
                 
                 {/* **** Selectbox example *****8  */}

                 {/* <Form.Item className='c-form-item' label='Label'>
                     <Select className='c-select c-select--solid' popupClassName='c-select-dropdown' placeholder='Seçim edin'>
                        <Select.Option key={1} className='c-select__option'>
                           1
                        </Select.Option>
                        <Select.Option key={2} className='c-select__option'>
                           2
                        </Select.Option>
                     </Select>
                  </Form.Item> */}
               </Col>
            </Row>
            <Row align='end' className='fixed-submit-buttons' >
               <Button htmlType="submit" type='primary' className='c-btn c-btn--primary'>{innerText.btn_save}</Button>
               <Button onClick={Close} className='c-btn c-btn--secondary'>{innerText.btn_cancel}</Button>
            </Row>
         </Form>
      </Drawer >
   )
}

export default Index