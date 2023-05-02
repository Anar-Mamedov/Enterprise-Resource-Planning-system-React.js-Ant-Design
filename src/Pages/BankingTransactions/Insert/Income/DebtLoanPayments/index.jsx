import React, { useContext, useState } from 'react'
import style from './style.module.scss'
import { Context } from '../../../Context'
import { Input, Row, Col, Select, Divider } from 'antd'
import { FormItem, BankFilter, CommissionInterest } from '../../../../../Components'

const Index = () => {

  const { options, FormBankingTransactions } = useContext(Context)
  const [{ SENDER, DEBT_LOAN_TRN, DEBIT_CREDIT }] = options

  const [calcValue, setCalcValue] = useState(0)
  const [supplierId, setSupplierId] = useState(0)

  const onCalcValue = () => {
    const amount = Number(FormBankingTransactions.getFieldValue(['income', 'debt_and_loan_repayment', 'payment_quantity']) || 0)
    const percent = Number(FormBankingTransactions.getFieldValue(['income', 'debt_and_loan_repayment', 'commission_degree']) || 0)
    setCalcValue(amount * percent / 100)
  }

  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Borc və kredit ödənişi</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={5} >
            <FormItem label='Göndərən'
              name={['income', 'debt_and_loan_repayment', 'supplier_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}>
              <Select allowClear={true} showSearch={true}
                onChange={value => setSupplierId(value)}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={SENDER?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label='Borc və kredit'
              name={['income', 'debt_and_loan_repayment', 'debt_loan_trn_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={DEBT_LOAN_TRN?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label='Ödəniş məbləği'
              name={['income', 'debt_and_loan_repayment', 'payment_quantity']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              onChange={onCalcValue}
            >
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label={false} top={30}
              name={['income', 'debt_and_loan_repayment', 'supplier_bank_iban_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <BankFilter placement="top"
                showButton="Göndərən bank"
                responce="bank"
                supplier_id={supplierId}
                errorMessage='Öncə Göndərən şəxsi seçin'
              />
            </FormItem>
          </Col>
          <Col span={4} >
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


        </Row>
      </Col>
    </Row>
  )
}

export default Index
