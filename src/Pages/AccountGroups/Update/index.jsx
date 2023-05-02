import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './style.scss';
import { Form, Input, Drawer, Col, Row, Typography, message, Divider, Button, Select } from 'antd';
import { EditOutlined, FolderViewOutlined } from '@ant-design/icons'
import API from '../../../API'
import { Languages } from '../../../Config';
import { GrClose } from 'react-icons/gr';

const innerText = Languages.SelectLanguage("AccountGroups")
const { Text, Title } = Typography;

function Index({ open, data, onClose, renderTableView }) {
   const [rowData, setRowData] = useState(null)
   const [form] = Form.useForm()
   const location = useLocation()

   const onFinish = (value) => {
      API.Finance.KontoGroups.update(data.uuid, value).then(res => {
         if (res.data.status === 201 || res.data.status === 200) {
            // console.log('----')
            renderTableView()
            // form.resetFields()
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

   const onFinishFailed = (errorInfo) => {
      message.error('Məlumatlar natamamdır!');
   }
   const Close = (uuid) => onClose()
   const getRowData = () => {
      API.Finance.KontoGroups.show(data.uuid).then(res => {
         if (res.data.status === 200) {
            const resData = res.data.data
            setInputValues({
               'name_eng': resData.name_eng,
               'name_nat': resData.name_nat,
               'abb_az': resData.abb_az,
               'abb_eng': resData.abb_eng
            })
         }
      })
   }

   const setInputValues = (value) => {
      form.setFieldsValue(value)
   }

   useEffect(() => {
      if (data?.uuid) getRowData()
   }, [data.uuid])
   // console.log(`${location.pathname}/show/${data?.uuid}`)
   return (
      <Drawer
         title={<Title level={5} style={{ marginBottom: 0 }}>{innerText.btn_edit}</Title>}
         width={'30%'}
         className='c-drawer'
         onClose={Close}
         closeIcon={<GrClose size={18} style={{ display: 'inherit' }} />}
         open={open}
         bodyStyle={{ paddingBottom: 80 }}
         headerStyle={{ padding: 24, backgroundColor: 'rgba(51, 48, 60, 0.04)' }}
         extra={<Button className='c-btn c-btn--info' href={`${location.pathname}/show/${data?.uuid}`} target='_blank'><FolderViewOutlined />Formaya baxış</Button>}
      >
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Row>
               <Col span={24} >
                  <Form.Item className='c-form-item' label={innerText.name_eng} name='name_eng' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input className='c-input c-input--solid' placeholder={innerText.input_placeholder} />
                  </Form.Item>
                  <Form.Item className='c-form-item' label={innerText.name_az} name='name_nat' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input className='c-input c-input--solid' placeholder={innerText.input_placeholder} value={2211} />
                  </Form.Item>
                  <Form.Item className='c-form-item' label={innerText.abbreviation_eng} name='abb_eng' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input className='c-input c-input--solid' placeholder={innerText.input_placeholder} />
                  </Form.Item>
                  <Form.Item className='c-form-item' label={innerText.abbreviation_az} name='abb_az' rules={[{ required: true, message: innerText.error_insert_data }]}>
                     <Input className='c-input c-input--solid' placeholder={innerText.input_placeholder} />
                  </Form.Item>
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