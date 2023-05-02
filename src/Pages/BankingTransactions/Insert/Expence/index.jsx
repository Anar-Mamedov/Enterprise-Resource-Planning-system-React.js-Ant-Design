import React, { useState, useContext, useEffect } from 'react'
import style from './style.module.scss'
import API from '../../../../API'
import { Context } from '../../Context'
import RentalPayments from './RentalPayments'
import PaymentSalary from './PaymentSalary'
import PaymentLoansDebts from './PaymentLoansDebts'
import PaymentSupplier from './PaymentSupplier'
import TransferAnotherBankAccountOrganization from './TransferAnotherBankAccountOrganization'
import ReturnSaleProceeds from './ReturnSaleProceeds'
import YGBpayment from './YGBpayment'
import PaymentTaxes from './PaymentTaxes'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Input, Row, Col, Form, Select, Space, Radio, Divider, DatePicker, } from 'antd'
import { FormItem, Description, BankFilter } from '../../../../Components'

const Index = () => {
  const { options } = useContext(Context)
  const [{ TRANSACTION, COMPANY, INDIVIDUAL, EXPENSEITEM, RESPONSIBLEPERSON, PROJECT, TRANSACTIONMOVEMENT, CONTRACT }, setOptions] = options
  const [receiver, setReceiver] = useState('company')
  const [companyId, setCompanyId] = useState(null)
  const [individualPersonsId, setIndividualPersonsId] = useState(null)
  const [info, setInfo] = useState({ "name": {}, "balance": {}, "local_balance": {} })
  const [FormExpenseItem] = Form.useForm();
  const [FormTransactionMovement] = Form.useForm();

  const onReceiverOrSenderChange = (event) => {
    const { value } = event.target;
    setReceiver(value);
  }

  const onFinishExpenseItem = values => {

    API.Acc.Picklist.ExpenseItem.store(values).then(({ data }) => {
      setOptions({ method: "PUT_EXPENSEITEM", data: data.data })
      FormExpenseItem.resetFields()
    });

  }
  const onFinishTransactionMovement = values => {
    API.Acc.Picklist.TransactionMovement.store(values).then(({ data }) => {
      setOptions({ method: "PUT_TRANSACTIONMOVEMENT", data: data.data })
      FormTransactionMovement.resetFields()
    });

  }

  const getInfo = (data) => {
    API.Acc.PaymentBank.Balance(data).then(({ data }) => {

      setInfo(info => {
        info.name.value = data.data.name
        info.name.label = receiver === 'company' ? 'Təşkilat' : 'Fiziki şəxs'
        info.balance.value = data.data.balance
        info.balance.label = 'Balans'
        info.local_balance.value = data.data.local_balance
        info.local_balance.label = 'Lokal məbləğ'

        return { ...info }
      })

    })
  }

  useEffect(() => {

    const data = {
      receiver_or_sender: receiver,
      id: receiver === 'company' ? companyId : individualPersonsId
    }

    getInfo(data)

  }, [receiver, companyId, individualPersonsId])



  return (
    <Row gutter={5}>
      <Col span={5} >
        <FormItem label='Əməliyyatın adı'
          name='transaction_name_id'
          rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
        >
          <Select allowClear={true} showSearch={true}
            optionFilterProp="children"
            placeholder="Zəhmət olmazsa seçim edin"
            options={TRANSACTION?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
          />
        </FormItem>
      </Col>
      <Col span={5} >
        <Row>
          <Col span={24}>
            <FormItem label='Göndərən' bottom={0}
              name='receiver_or_sender' initialValue={receiver}
              rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              onChange={onReceiverOrSenderChange}
            >
              <Radio.Group className={style.group} size="middle" buttonStyle="solid">
                <Radio.Button className={style.radio} value="company">Təşkilat</Radio.Button>
                <Radio.Button className={style.radio} value="individual_person">Fiziki şəxs</Radio.Button>
              </Radio.Group>
            </FormItem>
          </Col>
          <Col span={24}>
            {
              receiver === 'company' &&
              <FormItem name='company_id' label={false}
                rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              >
                <Select allowClear={true} showSearch={true}
                  onChange={value => setCompanyId(value)}
                  optionFilterProp="children"
                  placeholder="Zəhmət olmazsa seçim edin"
                  options={COMPANY?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
                />
              </FormItem>
            }
            {
              receiver === 'individual_person' &&
              <FormItem name='individual_person_id' label={false}
                rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
              >
                <Select allowClear={true} showSearch={true}
                  onChange={value => setIndividualPersonsId(value)}
                  optionFilterProp="children"
                  placeholder="Zəhmət olmazsa seçim edin"
                  options={INDIVIDUAL?.map(({ uuid, surname_nat, name_nat, father_nat }) => ({ value: uuid, label: `${surname_nat} ${name_nat} ${father_nat}` }))}
                />
              </FormItem>
            }
          </Col>
        </Row>
      </Col>
      <Col span={5} >
        {
          receiver === 'company' &&
          <FormItem label={false} top={30} name='company_bank_iban_id'
            rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
          >
            <BankFilter placement="bottom"
              showButton="Göndərən bank"
              responce="bank"
              company_id={companyId}
              errorMessage='Öncə Təşkilat və ya Fiziki şəxsi seçin'
            />
          </FormItem>
        }
        {
          receiver === 'individual_person' &&
          <FormItem label={false} top={30} name='individual_persons_iban_id'
            rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
          >
            <BankFilter placement="bottom"
              showButton="Göndərən bank"
              responce="bank"
              individual_persons_id={individualPersonsId}
            />
          </FormItem>
        }
      </Col>
      <Col span={5} >
        <FormItem label='Sənədin tarixi'
          name='document_date'
          rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
        >
          <DatePicker
            placeholder="Please enter user date of birth"
            className={style.date}
          />
        </FormItem>
      </Col>
      <Col span={4} >
        <FormItem label='Xərc maddəsi' name='expense_item_id'>
          <Select allowClear={true} showSearch={true}
            optionFilterProp="children"
            placeholder="Zəhmət olmazsa seçim edin"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className={style.line} />
                <Form form={FormExpenseItem} onFinish={onFinishExpenseItem} >
                  <Row>
                    <Col span={18}>
                      <FormItem name="name_nat"
                        rules={[{ required: true, message: "Please enter item" }]}
                      >
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
            options={EXPENSEITEM?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
          />
        </FormItem>
      </Col>

      <Col span={5} >
        <FormItem label='Cavabdeh şəxs' name='responsible_person_id'
          rules={[{ required: true, message: 'Zəhmət olmazsa seçim edin' }]}
        >
          <Select allowClear={true} showSearch={true}
            optionFilterProp="children"
            placeholder="Zəhmət olmazsa seçim edin"
            options={RESPONSIBLEPERSON?.map(({ uuid, surname_nat, name_nat, father_nat }) => ({ value: uuid, label: `${surname_nat} ${name_nat} ${father_nat}` }))}
          />
        </FormItem>
      </Col>
      <Col span={5} >
        <FormItem label='Layihə' name='project_id'>
          <Select allowClear={true} showSearch={true}
            optionFilterProp="children"
            placeholder="Zəhmət olmazsa seçim edin"
            options={PROJECT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
          />
        </FormItem>
      </Col>
      <Col span={5} >
        <FormItem label='Təyinatı' name='destination' >
          <Input placeholder="Please enter user name" />
        </FormItem>
      </Col>
      <Col span={5} >
        <FormItem label='Əməliyyatın hərəkəti' name='transaction_movement_id' >
          <Select allowClear={true} showSearch={true}
            optionFilterProp="children"
            placeholder="Zəhmət olmazsa seçim edin"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className={style.line} />
                <Form form={FormTransactionMovement} onFinish={onFinishTransactionMovement} >
                  <Row>
                    <Col span={18}>
                      <FormItem name="name_nat" rules={[{ required: true, message: "Please enter item" }]}>
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
            options={TRANSACTIONMOVEMENT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
          />
        </FormItem>
      </Col>
      <Col span={4} >
        <FormItem label='Müqavilə' name='contract_id'>
          <Select allowClear={true} showSearch={true}
            optionFilterProp="children"
            placeholder="Zəhmət olmazsa seçim edin"
            options={CONTRACT?.map(({ uuid, name }) => ({ value: uuid, label: name }))}
          />
        </FormItem>
      </Col>

      <Col span={12} >
        <FormItem label='Qeyd' name='note'>
          <Input.TextArea
            showCount
            maxLength={155}
            rows={4}
            placeholder="Please enter user address"
          />

        </FormItem>
      </Col>
      <Col span={12} >
        <Space className={style.space} direction='horizontal'>
          <Description direction='vertical' title={info?.name?.label}>{info?.name?.value}</Description>
          <Description direction='vertical' title={info?.balance?.label}>{info?.balance?.value}</Description>
          <Description direction='vertical' title={info?.local_balance?.label}>{info?.local_balance?.value}</Description>
        </Space>
      </Col>
    </Row>
  )
}

Index.RentalPayments = () => <RentalPayments />
Index.PaymentSalary = () => <PaymentSalary />
Index.PaymentLoansDebts = () => <PaymentLoansDebts />
Index.PaymentSupplier = () => <PaymentSupplier />
Index.TransferAnotherBankAccountOrganization = () => <TransferAnotherBankAccountOrganization />
Index.ReturnSaleProceeds = () => <ReturnSaleProceeds />
Index.YGBpayment = () => <YGBpayment />
Index.PaymentTaxes = () => <PaymentTaxes />

export default Index
