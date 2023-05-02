import React from 'react'
import style from './style.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { Input, Row, Col, Select, Divider, Form, Button } from 'antd'
import { FormItem, CommissionInterest } from '../../../../../Components'
const { Option } = Select



const Index = () => {
  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Vergilərin ödənilməsi</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label='Vergilər növü' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider className={style.line} />
                    <Form  >
                      <Row>
                        <Col span={18}>
                          <FormItem name="" rules={[{ required: true, message: "Please enter item" }]}>
                            <Input placeholder="Please enter item" />
                          </FormItem>
                        </Col>
                        <Col span={6}>
                          <Button block={true} htmlType="submit" icon={<PlusOutlined />} />
                        </Col>
                      </Row>
                    </Form>
                  </>
                )}
                options={[].map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Məbləğ' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Debit' name='' >
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Kredit' name='' >
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={8} >
            <CommissionInterest name='' label='Komissiya faizi' empty='Komissiyadan azad' />
          </Col>
          <Col span={8} >
            <FormItem label='Komissiya debit' name=''>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={8} >
            <FormItem label='Komissiya kredit' name=''>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>

        </Row>
      </Col>
    </Row>
  )
}

export default Index
