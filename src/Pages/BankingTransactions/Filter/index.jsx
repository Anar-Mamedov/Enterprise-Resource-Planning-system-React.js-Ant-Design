import React from 'react'
import style from './style.module.scss'
import { ClearOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Row, Col, Form, Checkbox, Empty, Divider } from 'antd'
import { Loading } from '../../../Components'

const Index = () => {
  return (
    <Drawer
      width={750}
      placement="right"
      closable={true}
      open={false}
      afterOpenChange={null}
      title="Filterləmək"
      extra={<Input.Search className={style.search} placeholder="input search loading default" loading={false} enterButton />}
    >
      <Row gutter={16} className={style.content}>
        <Col span={24}>
          <Divider className={style.title} orientation="left">Seçilmiş filterler</Divider>
        </Col>

        <Col span={24} className={style.selected}>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>
          <Button icon={<CloseCircleOutlined />} className={style.button}>Ali</Button>

          {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        </Col>

        <Col span={24}>
          <Divider className={style.title} orientation="left">Filterler</Divider>
        </Col>

        <Col span={24} className={style.form}>
          <Form layout="vertical" >
            <Row gutter={16} >
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item name={['ali']} valuePropName="checked" style={{ marginBottom: '0px' }}  >
                  <Checkbox value='ali'>Ali</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            {/* <Loading message="Yüklənir..." /> */}
            <Row align='center' className={style.bottom}>
              <Button className={style.clearFilter} type="primary" icon={<ClearOutlined />}>Filterləri təmizlə</Button>
              <Button className={style.clear} htmlType='reset' danger>Seçilənləri təmizlə</Button>
              <Button className={style.filter} htmlType='submit' type='primary'>Filtirlə</Button>
            </Row>
          </Form>
        </Col>

        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
      </Row>




    </Drawer>
  )
}

export default Index
