import React from 'react'
import style from './style.module.scss'
import { Input, Row, Col, Select, Divider } from 'antd'
import { FormItem, CommissionInterest } from '../../../../../Components'
const { Option } = Select


const Index = () => {
  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Əməkhaqqının ödənişi</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label='Sənədin növü' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='İşçilərin adları' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Məbləğ' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Input readOnly={true} type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Debit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={6} >
            <FormItem label='Kredit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <CommissionInterest name='' label='Komissiya faizi' empty='Komissiyadan azad' />
          </Col>
          <Col span={6} >
            <FormItem label='Komissiya debit' name=''>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
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
