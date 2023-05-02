import React, { useContext, useState } from 'react'
import style from './style.module.scss'
import { Context } from '../../../Context'
import { Input, Row, Col, Select, Divider } from 'antd'
import { FormItem, BankFilter, CommissionInterest, MeaningVAT } from '../../../../../Components'

const Index = () => {

  const { options, FormBankingTransactions } = useContext(Context)
  const [{ SENDER, INVOICE, CURRENCY, DEBIT_CREDIT, EDV_RATE }] = options

  const [calcValue, setCalcValue] = useState(0)
  const [calcValueEDV, setCalcValueEDV] = useState(0)
  const [supplierId, setSupplierId] = useState(0)

  const onCalcValue = () => {
    const amount = Number(FormBankingTransactions.getFieldValue(['income', 'customer_payment', 'payment_quantity']) || 0)
    const percent = Number(FormBankingTransactions.getFieldValue(['income', 'customer_payment', 'commission_degree']) || 0)
    setCalcValue(amount * percent / 100)
  }
  const onCalcValueEDV = () => {
    const amount = Number(FormBankingTransactions.getFieldValue(['income', 'customer_payment', 'payment_quantity']) || 0)
    const uuid = FormBankingTransactions.getFieldValue(['income', 'customer_payment', 'tax_degree_id'])
    const percent = Number(EDV_RATE.find(val => val.uuid === uuid)?.name || 0)
    setCalcValueEDV(amount * percent / 100)
  }

  const onChangeAmount = () => {
    onCalcValueEDV()
    onCalcValue()
  }

  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Sifarişçidən ödəniş</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label='Göndərən'
              name={['income', 'customer_payment', 'supplier_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                onChange={value => setSupplierId(value)}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={SENDER?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label='Faktura'
              name={['income', 'customer_payment', 'factura_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={INVOICE?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={5} >
            <FormItem label={false} top={30}
              name={['income', 'customer_payment', 'supplier_bank_iban_id']}
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
            <FormItem label='Ödəniş məbləği'
              name={['income', 'customer_payment', 'payment_quantity']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              onChange={onChangeAmount}
            >
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={4} >
            <FormItem label='Valyuta'
              name={['income', 'customer_payment', 'currency_id']}
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
            <FormItem label='Debit'
              name={['income', 'customer_payment', 'debit_id']}
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
              name={['income', 'customer_payment', 'credit_id']}
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
            <MeaningVAT label='ƏDV dərəcəsi' empty='ƏDV-dən azad'
              name={['income', 'customer_payment', 'tax_degree_id']}
              onChange={onCalcValueEDV}
              addonAfter={calcValueEDV}
              options={EDV_RATE?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
            />
          </Col>
          <Col span={6} >
            <FormItem label='ƏDV Debit'
              name={['income', 'customer_payment', 'edv_debit_id']}
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
            <FormItem label='ƏDV Kredit'
              name={['income', 'customer_payment', 'edv_credit_id']}
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
            <CommissionInterest label='Komissiya faizi'
              name={['income', 'customer_payment', 'commission_degree']}
              empty='Komissiyadan azad'
              onChange={onCalcValue}
              addonAfter={calcValue}
            />
          </Col>
          <Col span={6} >
            <FormItem label='Komissiya debit'
              name={['income', 'customer_payment', 'commission_debit_id']}
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
              name={['income', 'customer_payment', 'commission_credit_id']}
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
