import React from 'react'
import style from './style.module.scss'
import { Input, Row, Col, Select, Divider, Radio } from 'antd'
import { FormItem, BankFilter, CommissionInterest } from '../../../../../Components'
const { Option } = Select



const Index = () => {
  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Kredit və borcların ödənişi</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <Row>
              <Col span={24}>
                <FormItem label='Qəbul edən' bottom={0} name='k' initialValue="a" rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                  <Radio.Group className={style.group} size="middle" buttonStyle="solid">
                    <Radio.Button className={style.radio} value="a">Kassa</Radio.Button>
                    <Radio.Button className={style.radioMiddle} value="b">Təsisçi</Radio.Button>
                    <Radio.Button className={style.radio} value="c">Təhtəl</Radio.Button>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name='' label={false} rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
                  <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                    <Option value="1">1</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={6} >
            <FormItem label='Borc və kredit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
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
            <CommissionInterest name='' label='Komissiya faizi' empty='Komissiyadan azad' />
          </Col>

          <Col span={5} >
            <FormItem label='Komissiya debit' name=''>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label='Komissiya kredit' name=''>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label='Debit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label='Kredit' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true} optionFilterProp="children" placeholder="Zəhmət olmazsa seçim edin">
                <Option value="1">1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={4} >
            <FormItem label='Ödəniş məbləği' name='' rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>

        </Row>
      </Col>
    </Row>
  )
}

export default Index
