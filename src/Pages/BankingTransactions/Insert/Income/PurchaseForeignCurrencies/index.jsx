import React, { useContext, useState } from 'react'
import style from './style.module.scss'
import { Context } from '../../../Context'
import { Input, Row, Col, Select, Divider, DatePicker } from 'antd'
import { FormItem, BankFilter, CommissionInterest } from '../../../../../Components'

const Index = () => {

  const { options, FormBankingTransactions } = useContext(Context)
  const [{ DEBIT_CREDIT, CURRENCY }] = options

  const [calcValue, setCalcValue] = useState(0)

  const onCalcValue = () => {
    const amount = Number(FormBankingTransactions.getFieldValue(['income', 'debt_and_loan_repayment', 'currency_amount']) || 0)
    const percent = Number(FormBankingTransactions.getFieldValue(['income', 'debt_and_loan_repayment', 'commission_degree']) || 0)
    setCalcValue(amount * percent / 100)
  }

  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Xarici valyutanın alışı</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label={false} top={30}
              name={['income', 'debt_and_loan_repayment', 'supplier_bank_iban_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <BankFilter placement="top"
                showButton="Göndərən bank"
                responce="bank"
              // supplier_id={null}
              // errorMessage='Öncə Göndərən şəxsi seçin'
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Məbləğ'
              name={['income', 'debt_and_loan_repayment', 'currency_amount']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              onChange={onCalcValue}
            >
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Debit'
              name={['income', 'debt_and_loan_repayment', 'debit_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
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
              name={['income', 'debt_and_loan_repayment', 'credit_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBIT_CREDIT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>

          <Col span={3} >
            <FormItem label='Məbləğ valuta'
              name={['income', 'debt_and_loan_repayment', 'amount_currency_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={CURRENCY?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={3} >
            <FormItem label='Alış valuta'
              name={['income', 'debt_and_loan_repayment', 'purchase_currency_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={CURRENCY?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Məzənnə qiyməti'
              name={['income', 'debt_and_loan_repayment', 'payment_quantity']}
            >
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={6} >
            <CommissionInterest label='Komissiya faizi'
              name={['income', 'debt_and_loan_repayment', 'commission_degree']}
              empty='Komissiyadan azad'
              onChange={onCalcValue}
              addonAfter={calcValue}
            />
          </Col>
          <Col span={6} >
            <FormItem label='Komissiya debit'
              name={['income', 'debt_and_loan_repayment', 'commission_debit_id']}
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
              name={['income', 'debt_and_loan_repayment', 'commission_credit_id']}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBIT_CREDIT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label='Etibarlıdır'
              name={['income', 'debt_and_loan_repayment', 'reliability_date']}
            >
              <DatePicker
                placeholder="Please enter user date of birth"
                className={style.date}
              />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem label='İstifadə məqsədi'
              name={['income', 'debt_and_loan_repayment', 'purpose_note']}
            >
              <Input.TextArea
                showCount
                maxLength={155}
                rows={1}
                placeholder="Please enter user address"
              />

            </FormItem>
          </Col>

        </Row>
      </Col>
    </Row>
  )
}

export default Index
