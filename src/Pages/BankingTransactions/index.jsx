import React, { useReducer, useEffect, useState } from 'react'
import API from '../../API'
import View from './View'
import Filter from './Filter'
import Insert from './Insert'
import style from './style.module.scss'
import { Languages } from "../../Config";
import { PrinterOutlined, FileExcelOutlined, PlusOutlined } from '@ant-design/icons'
import { Row, Col, Space, Table, Form } from 'antd'
import { Button as MyButton } from '../../Components'
import columns from './columns'
import { Context } from './Context'
import { _table, _options } from './Reducer'

const innerText = Languages.SelectLanguage("BankingTransactions");

const Index = () => {

    const [table, setTable] = useReducer(_table, [])
    const [options, setOptions] = useReducer(_options, {})
    const [FormBankingTransactions] = Form.useForm()

    useEffect(() => {

        API.Acc.Picklist.BankTransactionName.list({ "type": "income" }).then(({ data }) => setOptions({ method: "POST_TRANSACTION", data: data.data }));
        API.Finance.Organization.list().then(({ data }) => setOptions({ method: "POST_COMPANY", data: data.data }));
        API.Acc.IndividualPersons.list().then(({ data }) => setOptions({ method: "POST_INDIVIDUAL", data: data.data }));
        API.Acc.Picklist.ExpenseItem.list().then(({ data }) => setOptions({ method: "POST_EXPENSEITEM", data: data.data }));
        API.Information.EmdName.list().then(({ data }) => setOptions({ method: "POST_RESPONSIBLEPERSON", data: data.data }));
        API.Com.Project.list().then(({ data }) => setOptions({ method: "POST_PROJECT", data: data.data }));
        API.Acc.Picklist.TransactionMovement.list().then(({ data }) => setOptions({ method: "POST_TRANSACTIONMOVEMENT", data: data.data }));
        API.Procurement.Contracts.Contract.list().then(({ data }) => setOptions({ method: "POST_CONTRACT", data: data.data }));

        API.Finance.SubKonto.getSubkontoList().then(({ data }) => setOptions({ method: "POST_DEBIT_CREDIT", data: data.data }));
        API.Acc.Picklist.CommissionValue.list().then(({ data }) => setOptions({ method: "POST_COMMISSION_DEBIT_LOAN", data: data.data }));

        API.Procurement.Suppliers.list().then(({ data }) => setOptions({ method: "POST_SENDER", data: data.data }));
        API.Acc.Factura.list().then(({ data }) => setOptions({ method: "POST_INVOICE", data: data.data }));
        API.Finance.Picklist.getCurrencyList().then(({ data }) => setOptions({ method: "POST_CURRENCY", data: data.data }));
        API.Finance.Picklist.tax().then(({ data }) => setOptions({ method: "POST_EDV_RATE", data: data.data }));

        API.Acc.PaymentBank.DebtLoanTrn().then(({ data }) => setOptions({ method: "POST_DEBT_LOAN_TRN", data: data.data }));

    }, [])

    return (
        <Context.Provider value={{
            options: [options, setOptions],
            table: [table, setTable],
            FormBankingTransactions
        }}>
            <Row className={style.container}>
                <Col span={24} className={style.header}>
                    <Space size={15}>
                        <MyButton onClick={() => console.log('1')} icon={<PrinterOutlined />} />
                        <MyButton icon={<FileExcelOutlined />} />
                        <MyButton icon={<PlusOutlined />}>{innerText.btn_new}</MyButton>
                    </Space>
                </Col>
                <Col span={24} className={style.content}>
                    <Table className={style.table}
                        size='small'
                        columns={columns}
                        dataSource={table}
                        scroll={{ x: 750, y: (window.innerHeight - 265) }}
                        filterMultiple={true}
                        rowKey={record => record.uuid}
                        pagination={false}
                        rowSelection={{ selectedRowKeys: [null], onChange: null }}
                        onRow={(record, rowIndex) => ({ onClick: null })}
                    />
                </Col>
            </Row>
            {/* <Filter /> */}
            <Insert />
        </Context.Provider>
    );
}

Index.View = () => <View />

export default Index
