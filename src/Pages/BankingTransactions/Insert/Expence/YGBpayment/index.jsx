import React from 'react'
import style from './style.module.scss'
import { Input, Row, Col, Select, Divider } from 'antd'
import { FormItem, BankFilter, MeaningVAT, CommissionInterest } from '../../../../../Components'
const { Option } = Select


const Index = () => {
  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">YGB ödənişi</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label='Qəbul edən' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='YGB nömrəsi' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label={false} top={30} name='a' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <BankFilter placement="top"
                showButton="Qəbul edən bank"
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Ödəniş məbləği' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>

          <Col span={6} >
            <MeaningVAT name='' label='ƏDV dərəcəsi' empty='ƏDV-dən azad' />
          </Col>
          <Col span={6} >
            <FormItem label='ƏDV Debit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='ƏDV Kredit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
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

        </Row>
      </Col>
    </Row>
  )
}

export default Index
