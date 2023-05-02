import React, { useContext, useState } from 'react'
import style from './style.module.scss'
import { Context } from '../../../Context'
import { Input, Row, Col, Select, Divider } from 'antd'
import { FormItem, BankFilter, MeaningVAT } from '../../../../../Components'


const Index = () => {

  const { options, FormBankingTransactions } = useContext(Context)
  const [{ SENDER, EDV_RATE, DEBIT_CREDIT }] = options

  const [calcValueEDV, setCalcValueEDV] = useState(0)
  const [supplierId, setSupplierId] = useState(0)

  const onCalcValueEDV = () => {
    const amount = Number(FormBankingTransactions.getFieldValue(['income', 'income_from_product_returns', 'payment_quantity']) || 0)
    const uuid = FormBankingTransactions.getFieldValue(['income', 'income_from_product_returns', 'tax_degree_id'])
    const percent = Number(EDV_RATE.find(val => val.uuid === uuid)?.name || 0)
    setCalcValueEDV(amount * percent / 100)
  }



  return (
    <Row>
      <Col span={24}>
        <Divider className={style.title} orientation="left">Məhsulun geri qaytarılmasından mədaxil</Divider>
      </Col>
      <Col span={24}>
        <Row gutter={5}>

          <Col span={6} >
            <FormItem label='Göndərən'
              name={['income', 'income_from_product_returns', 'supplier_id']}
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
          <Col span={6} >
            <FormItem label='Geri qaytarılma sənədi'
              name={['income', 'income_from_product_returns', 'return_document_id']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
            >
              <Select allowClear={true} showSearch={true}
                optionFilterProp="children"
                placeholder="Zəhmət olmazsa seçim edin"
                options={[]?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
              />
            </FormItem>
          </Col>
          <Col span={6} >
            <FormItem label={false} top={30}
              name={['income', 'income_from_product_returns', 'supplier_bank_iban_id']}
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
          <Col span={6} >
            <FormItem label='Debit'
              name={['income', 'income_from_product_returns', 'debit_id']}
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
              name={['income', 'income_from_product_returns', 'credit_id']}
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
            <FormItem label='Ödəniş məbləği'
              name={['income', 'income_from_product_returns', 'payment_quantity']}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              onChange={onCalcValueEDV}
            >
              <Input type='number' placeholder="Please enter user name" />
            </FormItem>
          </Col>
          <Col span={6} >
            <MeaningVAT label='ƏDV dərəcəsi' empty='ƏDV-dən azad'
              name={['income', 'income_from_product_returns', 'tax_degree_id']}
              onChange={onCalcValueEDV}
              addonAfter={calcValueEDV}
              options={EDV_RATE?.map(({ uuid, name }) => ({ value: uuid, label: name }))}

            />
          </Col>
          <Col span={3} >
            <FormItem label='ƏDV debit'
              name={['income', 'income_from_product_returns', 'edv_debit_id']}
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
            <FormItem label='ƏDV kredit'
              name={['income', 'income_from_product_returns', 'edv_credit_id']}
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
