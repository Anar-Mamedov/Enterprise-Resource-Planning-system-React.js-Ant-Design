import React, { useContext } from 'react'
import style from './style.module.scss'
import { Context } from '../Context'
import { CloudUploadOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { Drawer, Row, Col, Form, Divider, Tabs } from 'antd'
import { Description, TDebitCreditTable } from '../../../Components'
import Income from './Income'
import Expence from './Expence'

const Index = () => {

    const { FormBankingTransactions } = useContext(Context)

    return (
        <Drawer
            width="calc(100% - 200px)"
            placement="right"
            closable={true}
            mask={true}
            open={!false}
            afterOpenChange={null}
            title="Yeni informasiya"
            extra={<TDebitCreditTable showButton='Debit/Kredit' placement='bottomRight' content={[]} />}
        >
            <Row gutter={10}>


                <Col span={24}>

                    <Tabs type="card" size="small" defaultActiveKey="expence"
                        items={[
                            {
                                key: "income",
                                label: <><CloudDownloadOutlined />Mədaxil</>,
                                children: <Form layout="vertical" form={FormBankingTransactions}>
                                    <Row>
                                        <Col span={24}>
                                            <Divider orientation="left">Əsas məlumatlar</Divider>
                                        </Col>
                                        <Col span={2}>
                                            <Description top={0} left={5} title='№'>1</Description>
                                        </Col>
                                        <Col span={22}>
                                            <Income />
                                        </Col>
                                        <Col span={24}>
                                            <Income.MakingDepositBank />
                                            <Income.PaymentCustomer />
                                            <Income.DebtLoanPayments />
                                            <Income.PurchaseForeignCurrencies />
                                            <Income.IncomeProductReturns />
                                        </Col>
                                    </Row>
                                </Form>
                            },
                            {
                                key: "expence",
                                label: <><CloudUploadOutlined />Məxaric</>,
                                children: <Form layout="vertical">
                                    <Row>
                                        <Col span={24}>
                                            <Divider orientation="left">Əsas məlumatlar</Divider>
                                        </Col>
                                        <Col span={2}>
                                            <Description top={0} left={5} title='№'>1</Description>
                                        </Col>
                                        <Col span={22}>
                                            <Expence />
                                        </Col>
                                        <Col span={24}>
                                            <Expence.RentalPayments />
                                            <Expence.PaymentSalary />
                                            <Expence.PaymentLoansDebts />
                                            <Expence.PaymentSupplier />
                                            <Expence.TransferAnotherBankAccountOrganization />
                                            <Expence.ReturnSaleProceeds />
                                            <Expence.YGBpayment />
                                            <Expence.PaymentTaxes />
                                        </Col>
                                    </Row>
                                </Form>
                            }
                        ]}


                    />

                </Col>

            </Row>

        </Drawer >
    )
}

export default Index
