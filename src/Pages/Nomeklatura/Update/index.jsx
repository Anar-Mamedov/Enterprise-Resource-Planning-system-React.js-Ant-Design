import React from 'react'
import './style.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Drawer, Select, Typography, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Text } = Typography

function Index(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const onFinish = (value) => console.log(value)
  const Close = (uuid) => props.onClose()
  const showNavigate = () => navigate(`${location.pathname}/show`)
  return (
    <Drawer
      title="Yeni"
      width={'70%'}
      className='comp-modal-add-gov-article'
      onClose={Close}
      open={props.open}
      extra={<Col onClick={showNavigate} type='primary' className='showButtonLink'> View <EditOutlined /></Col>}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Row style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <Col style={{ width: '21%' }}>
            <Form.Item label='Təşkilat:' name='Təşkilat'>
              <Select filterOption={false} placeholder='Seçim edin'>
                <Option value='Planing1'>Resource Planing</Option>
                <Option value='Planing2'>Resource Planing</Option>
                <Option value='Planing3'>Resource Planing</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col style={{ width: '21%' }}>
            <Form.Item label='Nomeklatura:' name='Nomeklatura'>
              <Select filterOption={false} placeholder='Seçim edin'>
                <Option value='Məhsul1'>Məhsul1</Option>
                <Option value='Məhsul2'>Məhsul2</Option>
                <Option value='Məhsul3'>Məhsul3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col style={{ width: '21%' }}>
            <Form.Item label='Anbar:' name='Anbar'>
              <Select filterOption={false} placeholder='Seçim edin'>
                <Option value='Mərkəzi1'>Mərkəzi</Option>
                <Option value='Mərkəzi2'>Mərkəzi</Option>
                <Option value='Mərkəzi3'>Mərkəzi</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col style={{ width: '21%' }}>
            <Form.Item label='Anbar bölməsi:' name='Anbarbölməsi'>
              <Select filterOption={false} placeholder='Seçim edin'>
                <Option value='Bölmə1'>Bölmə1</Option>
                <Option value='Bölmə2'>Bölmə2</Option>
                <Option value='Bölmə3'>Bölmə3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Col style={{ border: '1px solid lightgray', borderRadius: '10px', width: '47%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#28C76F', fontSize: '1.2rem', margin: '10px 0' }}>Maliyyə uçotunun hesablanması:</Text>
            <Row style={{ width: '95%' }} gutter={20}>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Uçot hesabı:' name='Uçot hesabı'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12'>12</Option>
                    <Option value='123'>123</Option>
                    <Option value='1234'>1234</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab1'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab1'>Hesab 1</Option>
                    <Option value='hesab2'>Hesab 2</Option>
                    <Option value='hesab3'>Hesab 3</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab2'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab4'>Hesab 4</Option>
                    <Option value='hesab5'>Hesab 5</Option>
                    <Option value='hesab6'>Hesab 6</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab3'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab7'>Hesab 7</Option>
                    <Option value='hesab8'>Hesab 8</Option>
                    <Option value='hesab9'>Hesab 9</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Uçot hesab transferi:' name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab4'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab10'>Hesab 10</Option>
                    <Option value='hesab11'>Hesab 11</Option>
                    <Option value='hesab12'>Hesab 12</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab5'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab13'>Hesab 13</Option>
                    <Option value='hesab14'>Hesab 14</Option>
                    <Option value='hesab15'>Hesab 15</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab6'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab16'>Hesab 16</Option>
                    <Option value='hesab17'>Hesab 17</Option>
                    <Option value='hesab18'>Hesab 18</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ width: '95%' }} gutter={20}>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Sifarişdən gələn gəlirlərin uçotu:' name='Sifarişdən gələn gəlirlərin uçotu'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12'>12</Option>
                    <Option value='123'>123</Option>
                    <Option value='1234'>1234</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab7'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab19'>Hesab 19</Option>
                    <Option value='hesab20'>Hesab 20</Option>
                    <Option value='hesab21'>Hesab 21</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab8'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab22'>Hesab 22</Option>
                    <Option value='hesab23'>Hesab 23</Option>
                    <Option value='hesab24'>Hesab 24</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab9'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab25'>Hesab 25</Option>
                    <Option value='hesab26'>Hesab 26</Option>
                    <Option value='hesab27'>Hesab 27</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Uçot hesab transferi:' name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab10'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab28'>Hesab 28</Option>
                    <Option value='hesab29'>Hesab 29</Option>
                    <Option value='hesab30'>Hesab 30</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab11'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab31'>Hesab 31</Option>
                    <Option value='hesab32'>Hesab 32</Option>
                    <Option value='hesab33'>Hesab 33</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab12'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab34'>Hesab 34</Option>
                    <Option value='hesab35'>Hesab 35</Option>
                    <Option value='hesab36'>Hesab 36</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col style={{ border: '1px solid lightgray', borderRadius: '10px', width: '47%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#28C76F', fontSize: '1.2rem', margin: '10px 0' }}>Vergi uçotunun hesablanması:</Text>
            <Row style={{ width: '95%' }} gutter={20}>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Uçot hesabı:' name='Uçot hesabı'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12'>12</Option>
                    <Option value='123'>123</Option>
                    <Option value='1234'>1234</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab1'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab1'>Hesab 1</Option>
                    <Option value='hesab2'>Hesab 2</Option>
                    <Option value='hesab3'>Hesab 3</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab2'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab4'>Hesab 4</Option>
                    <Option value='hesab5'>Hesab 5</Option>
                    <Option value='hesab6'>Hesab 6</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab3'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab7'>Hesab 7</Option>
                    <Option value='hesab8'>Hesab 8</Option>
                    <Option value='hesab9'>Hesab 9</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Uçot hesab transferi:' name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab4'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab10'>Hesab 10</Option>
                    <Option value='hesab11'>Hesab 11</Option>
                    <Option value='hesab12'>Hesab 12</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab5'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab13'>Hesab 13</Option>
                    <Option value='hesab14'>Hesab 14</Option>
                    <Option value='hesab15'>Hesab 15</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab6'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab16'>Hesab 16</Option>
                    <Option value='hesab17'>Hesab 17</Option>
                    <Option value='hesab18'>Hesab 18</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ width: '95%' }} gutter={20}>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Sifarişdən gələn gəlirlərin uçotu:' name='Sifarişdən gələn gəlirlərin uçotu'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12'>12</Option>
                    <Option value='123'>123</Option>
                    <Option value='1234'>1234</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab7'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab19'>Hesab 19</Option>
                    <Option value='hesab20'>Hesab 20</Option>
                    <Option value='hesab21'>Hesab 21</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab8'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab22'>Hesab 22</Option>
                    <Option value='hesab23'>Hesab 23</Option>
                    <Option value='hesab24'>Hesab 24</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab9'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab25'>Hesab 25</Option>
                    <Option value='hesab26'>Hesab 26</Option>
                    <Option value='hesab27'>Hesab 27</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label='Uçot hesab transferi:' name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab10'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab28'>Hesab 28</Option>
                    <Option value='hesab29'>Hesab 29</Option>
                    <Option value='hesab30'>Hesab 30</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab11'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab31'>Hesab 31</Option>
                    <Option value='hesab32'>Hesab 32</Option>
                    <Option value='hesab33'>Hesab 33</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab12'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab34'>Hesab 34</Option>
                    <Option value='hesab35'>Hesab 35</Option>
                    <Option value='hesab36'>Hesab 36</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Col style={{ border: '1px solid lightgray', borderRadius: '10px', width: '47%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#28C76F', fontSize: '1.2rem', margin: '10px 0' }}>ƏDV uçot hesabları:</Text>
            <Row style={{ width: '95%' }} gutter={20}>
              <Col span={8}>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ fontSize: '11px' }}>Təqdim edilmiş ƏDV uçot hesabı:</span>} name='Uçot hesabı'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12'>12</Option>
                    <Option value='123'>123</Option>
                    <Option value='1234'>1234</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab1'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab1'>Hesab 1</Option>
                    <Option value='hesab2'>Hesab 2</Option>
                    <Option value='hesab3'>Hesab 3</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab2'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab4'>Hesab 4</Option>
                    <Option value='hesab5'>Hesab 5</Option>
                    <Option value='hesab6'>Hesab 6</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab3'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab7'>Hesab 7</Option>
                    <Option value='hesab8'>Hesab 8</Option>
                    <Option value='hesab9'>Hesab 9</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ fontSize: '11px' }}>Gömrük üzrə uçot hesabı:</span>} name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab4'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab10'>Hesab 10</Option>
                    <Option value='hesab11'>Hesab 11</Option>
                    <Option value='hesab12'>Hesab 12</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab5'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab13'>Hesab 13</Option>
                    <Option value='hesab14'>Hesab 14</Option>
                    <Option value='hesab15'>Hesab 15</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab6'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab16'>Hesab 16</Option>
                    <Option value='hesab17'>Hesab 17</Option>
                    <Option value='hesab18'>Hesab 18</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ fontSize: '11px' }}>Satış üzrə uçot hesabı:</span>} name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab4'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab10'>Hesab 10</Option>
                    <Option value='hesab11'>Hesab 11</Option>
                    <Option value='hesab12'>Hesab 12</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab5'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab13'>Hesab 13</Option>
                    <Option value='hesab14'>Hesab 14</Option>
                    <Option value='hesab15'>Hesab 15</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab6'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab16'>Hesab 16</Option>
                    <Option value='hesab17'>Hesab 17</Option>
                    <Option value='hesab18'>Hesab 18</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col style={{ border: '1px solid lightgray', borderRadius: '10px', width: '47%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#28C76F', fontSize: '1.2rem', margin: '10px 0' }}>Sifarişçinin materialının uçot hesabı:</Text>
            <Row style={{ width: '95%' }} gutter={20}>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ fontSize: '11px' }}>Emala qəbul olunmuş materiallar:</span>} name='Uçot hesabı'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12'>12</Option>
                    <Option value='123'>123</Option>
                    <Option value='1234'>1234</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab1'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab1'>Hesab 1</Option>
                    <Option value='hesab2'>Hesab 2</Option>
                    <Option value='hesab3'>Hesab 3</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab2'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab4'>Hesab 4</Option>
                    <Option value='hesab5'>Hesab 5</Option>
                    <Option value='hesab6'>Hesab 6</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab3'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab7'>Hesab 7</Option>
                    <Option value='hesab8'>Hesab 8</Option>
                    <Option value='hesab9'>Hesab 9</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ fontSize: '11px' }}>Sifarişçinin istehsalatda olan materialları:</span>} name='Uçot hesab transferi'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='12345'>12345</Option>
                    <Option value='123456'>123456</Option>
                    <Option value='1234567'>1234567</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab4'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab10'>Hesab 10</Option>
                    <Option value='hesab11'>Hesab 11</Option>
                    <Option value='hesab12'>Hesab 12</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: '2px' }} label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab5'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab13'>Hesab 13</Option>
                    <Option value='hesab14'>Hesab 14</Option>
                    <Option value='hesab15'>Hesab 15</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: 'lightgray' }}>Alt hesab:</span>} name='Alt hesab6'>
                  <Select filterOption={false} placeholder='Seçim edin'>
                    <Option value='hesab16'>Hesab 16</Option>
                    <Option value='hesab17'>Hesab 17</Option>
                    <Option value='hesab18'>Hesab 18</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 0' }}>
          <Col style={{ display: 'flex' }}>
            <Button className='submitBtn' htmlType="submit">Yadda saxla</Button>
            <Button onClick={Close} className='cancelBtn'>Bağla</Button>
          </Col>
        </Row>
      </Form >
    </Drawer >
  )
}

export default Index