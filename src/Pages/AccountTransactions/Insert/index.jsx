import React, { useState, useEffect, useRef, useCallback } from 'react'
import './style.scss';
import { Row, Col, Divider, Form, Input, Drawer, DatePicker, Typography, TreeSelect, Modal, Select } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import API from '../../../API'
import { Button as MyButton, Status } from '../../../Components';
import AccountInputGroup from './AccountInputGroup';
import { Languages } from '../../../Config';
import dayjs from 'dayjs';
const innerText = Languages.SelectLanguage("AccountTransactions")
const { Text } = Typography;
const { Option } = Select;

function Index({ renderView, onClose, open, convertToNull }) {
    const [debetList, setDebetList] = useState(null)
    const [creditList, setCreditList] = useState(null)
    const [subDebetList, setSubDebetList] = useState(null)
    const [subCreditList, setSubCreditList] = useState(null)
    const [currencyList, setCurrencyList] = useState(null)
    // const [existingCurrencyList, setExistingCurrencyList] = useState([])
    const [debetProdOptionArr, setDebetProdOptionArr] = useState(null)
    const [creditProdOptionArr, setCreditProdOptionArr] = useState(null)
    const [accountInputGroup, setAccountInputGroup] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [rowCount, setRowCount] = useState([])
    const [form] = Form.useForm()
    let disableButton = useRef(true)
    let _i = 0

    const currentDate = useRef(0)
    useEffect(() => {
        currentDate.current = dayjs().format('DD.MM.YYYY')
    })

    const onFinish = (value) => {
        if (accountInputGroup.some(v => v === true)) {
            if (disableButton.current) {
                disableButton.current = false
                value.date = value.date.format('YYYY-MM-DD')
                value = convertToNull(value)
                value?.data.map(v => {
                    // console.log(v);
                    delete v?.converting_currency
                    delete v?.currency
                    delete v?.mutual_amount_converted
                    if (v) {
                        if (v.debet?.products) v.debet.products = v.debet.products.filter(({ product_id, subkonto_chart_of_account_id }) => product_id && subkonto_chart_of_account_id)
                        else v.debet = { ...v.debet, products: [] }
                        if (v.credit?.products) v.credit.products = v.credit.products.filter(({ product_id, subkonto_chart_of_account_id }) => product_id && subkonto_chart_of_account_id)
                        else v.credit = { ...v.credit, products: [] }
                        delete v?.mutual_amount
                    }
                })
                value.data = value.data.filter(v => v)
                // console.log(value);
                API.Finance.AccountTransactions.store(value).then(res => {
                    if (res.data.status === 201) {
                        Close()
                        disableButton.current = true
                    } else {
                        setTimeout(() => {
                            disableButton.current = true
                        }, 1000);
                    }
                })
            }
        } else {
            disableButton.current = true
            Modal.error({
                content: innerText.error_insert_data,
            });
        }
    }

    const getCurrentCurrency = () => {
        API.Global.getCurrencies().then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        // getCurrentCurrency()
    }, [])

    const getCurrentUser = () => {
        API.Auth.Sanctum.loginUser().then(res => {
            if (res.data.status === 200) {
                const { first_name, last_name } = res.data.data
                setCurrentUser(`${first_name} ${last_name}`)
            }
        })
    }

    const getCurrencyList = () => {
        API.Finance.Picklist.getCurrencyList().then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.data);
                setCurrencyList(res.data.data)
            }
        })
    }

    const getJournals = () => {
        API.Finance.AccountTransactions.journals().then(res => {
            if (res.data.status === 200) {
                setDebetList(res.data.data)
                setCreditList(res.data.data)
            }
        })
    };

    const renderTreeNodes = (nodes) => {
        return nodes?.map((node, i) => {
            if (node.children) {
                return (
                    <TreeSelect.TreeNode disabled={node.disable === true ? true : false} value={node.uuid} title={`${node.number}. ${node.name}`} key={node.uuid}>
                        {renderTreeNodes(node.children)}
                    </TreeSelect.TreeNode>
                );
            }
            return <TreeSelect.TreeNode disabled={node.disable === true ? true : false} value={node.uuid} title={`${node.number}. ${node.name}`} key={node.uuid} />;
        });
    }

    const onDebetChange = (value, index) => {
        let dataDebetList = []
        if (index >= 0 && subDebetList?.length) dataDebetList = [...subDebetList]

        const debetCurrency = form.getFieldValue(['data', index, 'debet', 'currency_id'])
        const creditCurrency = form.getFieldValue(['data', index, 'credit', 'currency_id'])

        API.Finance.SubKonto.getSubkontoList(value).then(res => {
            const values = []
            const { kontoplan } = res.data.data || {}

            if (kontoplan?.currency_accounting && creditCurrency) values.push({ value: creditCurrency, name: ['data', index, 'debet', 'currency_id'] })
            else values.push({ value: null, name: ['data', index, 'debet', 'currency_id'] })

            dataDebetList[index] = res.data.data
            dataDebetList?.forEach((val, ind) => {
                if (index === ind && val) {
                    val?.subkonto?.forEach((v, i) => {
                        values.push(
                            {
                                value: null,
                                name: ['data', index, 'debet', 'products', i, 'product_id']
                            },
                            {
                                value: v?.uuid,
                                name: ['data', index, 'debet', 'products', i, 'subkonto_chart_of_account_id']
                            },
                            {
                                value: null,
                                name: ['data', index, 'debet', 'quantity']
                            }
                            // {
                            //     value: null,
                            //     name: ['data', index, 'debet', 'currency_id']
                            // },
                            // {
                            //     value: null,
                            //     name: ['data', index, 'debet', 'amount']
                            // }
                        )
                    })
                    // onChangeAmount(null, index)
                } else {
                    values.push(
                        {
                            value: null,
                            name: ['data', index, 'debet', 'quantity']
                        },
                        {
                            value: null,
                            name: ['data', index, 'debet', 'currency_id']
                        }
                        // {
                        //     value: null,
                        //     name: ['data', index, 'debet', 'amount']
                        // }
                    )
                    // onChangeAmount(null, index)
                }
            })
            form.setFields(values)
            setSubDebetList(dataDebetList)
        })
    }

    const onCreditChange = (val, index) => {
        let dataCreditList = []
        if (index >= 0 && subCreditList?.length) dataCreditList = [...subCreditList]

        const debetCurrency = form.getFieldValue(['data', index, 'debet', 'currency_id'])
        const creditCurrency = form.getFieldValue(['data', index, 'credit', 'currency_id'])
        // console.log(debetCurrency, creditCurrency);

        API.Finance.SubKonto.getSubkontoList(val).then(res => {
            if (res.data.status === 200) {
                const values = []
                const { kontoplan } = res.data.data || {}

                if (kontoplan?.currency_accounting && debetCurrency) values.push({ value: debetCurrency, name: ['data', index, 'credit', 'currency_id'] })
                else values.push({ value: null, name: ['data', index, 'credit', 'currency_id'] })

                dataCreditList[index] = res.data.data
                dataCreditList?.forEach((val, ind) => {
                    if (index === ind && val) {
                        val?.subkonto?.forEach((v, i) => {
                            values.push(
                                {
                                    value: null,
                                    name: ['data', ind, 'credit', 'products', i, 'product_id']
                                },
                                {
                                    value: v?.uuid,
                                    name: ['data', ind, 'credit', 'products', i, 'subkonto_chart_of_account_id']
                                },
                                {
                                    value: null,
                                    name: ['data', ind, 'credit', 'quantity']
                                }
                                // {
                                //     value: null,
                                //     name: ['data', ind, 'credit', 'currency_id']
                                // }
                            )
                        })
                    } else {
                        values.push(
                            {
                                value: null,
                                name: ['data', index, 'credit', 'quantity']
                            },
                            {
                                value: null,
                                name: ['data', index, 'credit', 'currency_id']
                            }
                            // {
                            //     value: null,
                            //     name: ['data', index, 'debet', 'amount']
                            // }
                        )
                        // onChangeAmount(null, index)
                    }
                })
                form.setFields(values)
            }
            setSubCreditList(dataCreditList)
        })
    }

    const Close = () => {
        renderView()
        form.resetFields()
        onClose()
    }

    const addInputGroup = () => {
        const fields = accountInputGroup
        fields.push(true)
        setAccountInputGroup([...fields])
    }

    const removeInputGroup = (i) => {
        let fields = accountInputGroup
        delete fields[i]
        setRowCount(rowCount)
        setAccountInputGroup([...fields])
    }

    useEffect(() => {
        const debetProdGroup = []
        const creditProdGroup = []

        accountInputGroup?.forEach((_, index) => {
            const prodOptionD = []
            const valueD = subDebetList?.[index]

            const prodOptionC = []
            const valueC = subCreditList?.[index]
            valueD?.subkonto?.forEach((val, ind) => {

                val?.uuid && API.Com.Column.listData(val?.uuid).then(res => {
                    if (res.data.status === 200) {
                        prodOptionD.push(res.data.data)
                        if (valueD && valueD?.subkonto?.length - 1 === ind) debetProdGroup[index] = prodOptionD
                    }
                    setDebetProdOptionArr([...debetProdGroup])
                })
            })

            valueC?.subkonto?.forEach((val, ind) => {
                val?.uuid && API.Com.Column.listData(val?.uuid).then(res => {
                    if (res.data.status === 200) {
                        prodOptionC.push(res.data.data)
                        if (valueC && valueC?.subkonto?.length - 1 === ind) creditProdGroup[index] = prodOptionC
                    }
                    setCreditProdOptionArr([...creditProdGroup])
                })
            })

        })
    }, [subDebetList, subCreditList])

    useEffect(() => {
        // getTotalAmount()
    }, [accountInputGroup])

    const onCancelClick = () => {
        onClose()
    }
    const afterOpenChange = (st) => {
        if (st) {
            form.resetFields()
            setAccountInputGroup([])
            getJournals()
            getCurrencyList()
            getCurrentUser()
        } else {
            setDebetList(null)
            setCreditList(null)
            setSubDebetList(null)
            setSubCreditList(null)
            setCurrencyList(null)
            setDebetProdOptionArr(null)
            setCreditProdOptionArr(null)
        }
    }

    return (
        <Drawer
            title="Yeni"
            width="calc(100% - 200px)"
            onClose={Close}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterOpenChange}
        >
            <Form className='acc-trans-insert' form={form} layout="vertical" onFinish={onFinish}>
                <Row justify='space-between' align='center'>
                    <Col>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: innerText.error_insert_data,
                                }
                            ]}
                            style={{ width: '200px', display: 'inline-block' }}
                            label='Tarix:'
                            name={['date']}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label=' ' style={{ width: '200px', display: 'inline-block' }}>
                            <Input value={currentUser} disabled placeholder={innerText.input_placeholder} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item
                            style={{ width: '200px', display: 'inline-block' }}
                            label={innerText.description}
                            name={['description']}
                        >
                            <Input placeholder={innerText.input_placeholder} />
                        </Form.Item>
                    </Col>
                    <Col>
                        {/* <Form.Item style={{ width: '300px', display: 'inline-block' }}> */}
                        <Form.Item
                            label={`${innerText.total_amount}`}
                            name={['total_amount']}
                            initialValue={0}
                        >
                            <Input
                                disabled
                                style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
                            />
                        </Form.Item>
                        {/* <Form.Item
                                label=' '
                                // style={{ width: '40%' }}
                                initialValue={0}
                                name={['total_amount_converted']}
                            >
                                <Input
                                    disabled
                                    style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
                                />
                            </Form.Item> */}
                        {/* </Form.Item> */}
                    </Col>
                    <Col>
                        <Form.Item label=' ' style={{ width: '200px', display: 'inline-block' }}>
                            <Status name='draft' title='Qaralama' />
                        </Form.Item>
                    </Col>
                    {
                        accountInputGroup?.map((v, index) => {
                            return (
                                v && <AccountInputGroup
                                    _i={++_i}
                                    key={index}
                                    index={index}
                                    form={form}
                                    accountInputGroup={accountInputGroup}
                                    removeField={removeInputGroup}
                                    currencyList={currencyList}
                                    debetList={debetList}
                                    creditList={creditList}
                                    subDebetList={subDebetList}
                                    subCreditList={subCreditList}
                                    onDebetChange={onDebetChange}
                                    onCreditChange={onCreditChange}
                                    // onChangeCurrency={onChangeCurrency}
                                    debetProdOptions={debetProdOptionArr}
                                    creditProdOption={creditProdOptionArr}
                                    // onChangeAmount={onChangeAmount}
                                    rowCount={rowCount}
                                    renderTreeNodes={renderTreeNodes}
                                    currentDate={currentDate.current}
                                />
                            )
                        })
                    }
                    <Row justify="center" style={{ width: "100%" }}>
                        <Col>
                            <MyButton icon={<PlusSquareOutlined />} onClick={addInputGroup} />
                        </Col>
                    </Row>
                </Row>
                <Row align='end' gutter={8}>
                    <Divider />
                    <Col>
                        <MyButton disabled={!disableButton.current} style={{ width: 150, marginLeft: 5 }} htmlType="submit">{innerText.btn_save}</MyButton>
                    </Col>
                    <Col>
                        <MyButton onClick={onCancelClick}>{innerText.btn_cancel}</MyButton>
                    </Col>
                </Row>
            </Form >
        </Drawer >
    )
}

export default Index;