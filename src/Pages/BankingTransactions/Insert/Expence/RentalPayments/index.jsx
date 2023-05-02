import React, { useContext, useState, useEffect } from 'react'
import style from './style.module.scss'
import API from '../../../../../API'
import { Context } from '../../../Context'
import { Input, Row, Col, Select, Divider } from 'antd'
import { FormItem, MeaningVAT, CommissionInterest } from '../../../../../Components'
const { Option } = Select



const Index = () => {

  const { options, FormBankingTransactions } = useContext(Context)
  const [{ COMPANY, DEBIT_CREDIT }] = options

  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">İcarə ödənişləri</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label='İcarədarlar' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='İcra müqaviləsi' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Ödəniş məbləği' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Input type='number' placeholder="Please enter user name" />
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
