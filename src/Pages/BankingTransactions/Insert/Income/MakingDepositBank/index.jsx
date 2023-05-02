import React, { useContext, useState, useEffect } from 'react'
import style from './style.module.scss'
import API from '../../../../../API'
import { Context } from '../../../Context'
import { Input, Row, Col, Select, Radio, Divider } from 'antd'
import { FormItem, CommissionInterest } from '../../../../../Components'


const Index = () => {

  const { options, FormBankingTransactions } = useContext(Context)
  const [{ COMPANY, DEBIT_CREDIT }] = options
  const [cashregister, setCashregister] = useState([])
  const [sender, setSender] = useState('cashbox')
  const [founder, setFounder] = useState([])
  const [fraud, setFraud] = useState([])
  const [calcValue, setCalcValue] = useState(0)

  useEffect(() => {
    onChangeCompany()
  }, [])

  const onChangeSender = (event) => {
    const { value } = event.target;
    setSender(value);
  }

  const onChangeCompany = (company_id) => {
    API.Finance.CashBoxList.list({ company_id }).then(({ data }) => setCashregister(data.data))
    API.Finance.Companies.CompanyFounder.list({ company_id }).then(({ data }) => setFounder(data.data))
    API.Information.EmdName.TehtelAccount({ company_id }).then(({ data }) => setFraud(data.data))

    FormBankingTransactions.setFields([
      { name: ['income', 'deposit_at_the_bank', 'cashbox_id'], value: null },
      { name: ['income', 'deposit_at_the_bank', 'founder_id'], value: null },
      { name: ['income', 'deposit_at_the_bank', 'petty_id'], value: null }
    ])

  }

  const onCalcValue = () => {
    const amount = Number(FormBankingTransactions.getFieldValue(['income', 'deposit_at_the_bank', 'payment_quantity']) || 0)
    const percent = Number(FormBankingTransactions.getFieldValue(['income', 'deposit_at_the_bank', 'commission_degree']) || 0)
    setCalcValue(amount * percent / 100)
  }

  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Banka nəğd əmanətin qoyulması</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={8} >
            <Row>
              <Col span={24}>
                <FormItem label='Göndərən' bottom={0} initialValue={sender}
                  name={['income', 'deposit_at_the_bank', 'sender']}
                  rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
                  onChange={onChangeSender}
                >
                  <Radio.Group className={style.group} size="middle" buttonStyle="solid">
                    <Radio.Button className={style.radio} value="cashbox">Kassa</Radio.Button>
                    <Radio.Button className={style.radioMiddle} value="founder">Təsisçi</Radio.Button>
                    <Radio.Button className={style.radio} value="petty">Təhtəl</Radio.Button>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={false}
                  rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
                  name={['income', 'deposit_at_the_bank', 'company_id']}

                >
                  <Select allowClear={true} showSearch={true}
                    optionFilterProp="children"
                    placeholder="Şirkət"
                    onChange={onChangeCompany}
                    options={COMPANY?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                  />
                </FormItem>
              </Col>

              <Col span={12}>
                {
                  sender === 'cashbox' &&
                  <FormItem label={false}
                    rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
                    name={['income', 'deposit_at_the_bank', 'cashbox_id']}
                  >
                    <Select allowClear={true} showSearch={true}
                      optionFilterProp="children"
                      placeholder="Kassa"
                      options={cashregister?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                    />
                  </FormItem>
                }
                {
                  sender === 'founder' &&
                  <FormItem label={false}
                    rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
                    name={['income', 'deposit_at_the_bank', 'founder_id']}
                  >
                    <Select allowClear={true} showSearch={true}
                      optionFilterProp="children"
                      placeholder="Təsisçi"
                      options={founder?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                    />
                  </FormItem>
                }
                {
                  sender === 'petty' &&
                  <FormItem label={false}
                    rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
                    name={['income', 'deposit_at_the_bank', 'petty_id']}
                  >
                    <Select allowClear={true} showSearch={true}
                      optionFilterProp="children"
                      placeholder="Təhtəl"
                      options={fraud?.map(({ uuid, surname_nat, name_nat, father_nat }) => ({ value: uuid, label: `${surname_nat} ${name_nat} ${father_nat}` }))}
                    />
                  </FormItem>
                }
              </Col>
            </Row>
          </Col>
          <Col span={8} >
            <FormItem label='Məbləğ'
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              name={['income', 'deposit_at_the_bank', 'payment_quantity']}
              onChange={onCalcValue}
            >
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={8} >
            <FormItem label='Debit'
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              name={['income', 'deposit_at_the_bank', 'debit_id']}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBIT_CREDIT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>

          <Col span={6} >
            <FormItem label='Kredit'
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              name={['income', 'deposit_at_the_bank', 'credit_id']}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBIT_CREDIT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />

            </FormItem>
          </Col>


          <Col span={6} >
            <CommissionInterest label='Komissiya faizi'
              name={['income', 'deposit_at_the_bank', 'commission_degree']}
              empty='Komissiyadan azad'
              onChange={onCalcValue}
              addonAfter={calcValue}
            />
          </Col>


          <Col span={6} >
            <FormItem label='Komissiya debit'
              name={['income', 'deposit_at_the_bank', 'commission_debit_id']}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBIT_CREDIT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Komissiya kredit'
              name={['income', 'deposit_at_the_bank', 'commission_credit_id']}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBIT_CREDIT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
        </Row>
      </Col >
    </Row >
  )
}

export default Index
