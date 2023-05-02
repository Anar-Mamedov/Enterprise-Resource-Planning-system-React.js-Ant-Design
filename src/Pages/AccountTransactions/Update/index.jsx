import React, { useState, useEffect, useRef } from 'react'
import './style.scss';
import {
    Row, Col, Divider, Form, Input, Drawer, DatePicker, Typography, TreeSelect, Modal, Button, Space
} from 'antd';
import { useLocation } from 'react-router-dom';
import { PlusSquareOutlined, EnterOutlined, FolderViewOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import API from '../../../API'
import { Button as MyButton, Status } from '../../../Components';
import AccountInputGroup from './AccountInputGroup';
import dayjs from 'dayjs';
import { Languages, Permission } from '../../../Config';
// import { Signature } from '../../../Config';
const { Signature } = Permission
const innerText = Languages.SelectLanguage("AccountTransactions")
const { Text, Title } = Typography;
const isEdit = true
const Update = ({ onClose, data, open, convertToNull, renderView }) => {
    const [showData, setShowData] = useState(null)
    const [debetList, setDebetList] = useState(null)
    const [creditList, setCreditList] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [subDebetList, setSubDebetList] = useState(null)
    const [subCreditList, setSubCreditList] = useState(null)
    const [currencyList, setCurrencyList] = useState(null)
    const [debetProdOptionArr, setDebetProdOptionArr] = useState(null)
    const [creditProdOptionArr, setCreditProdOptionArr] = useState(null)
    const [accountInputGroup, setAccountInputGroup] = useState([])
    const [buttonList, setButtonList] = useState([])
    const [trnData, setTrnData] = useState([])
    const [trnUuidList, setTrnUuidList] = useState([])
    const [isFieldChanged, setIsFieldChanged] = useState(false)
    const [isEditable, setIsEditable] = useState(true)
    const [dataStatus, setDataStatus] = useState(data?.transaction?.status_type?.key)
    const [requiredFields, setRequiredFileds] = useState([])
    const [disabledFields, setDisabledFiedls] = useState([])
    const [statusType, setStatusType] = useState(null)
    const [constCurrency, setConstCurrency] = useState(0)
    const location = useLocation()
    const [form] = Form.useForm()
    const formRef = useRef(null)
    let disableButton = useRef(true)
    let _i = 0

    const currentDate = useRef(0)
    useEffect(() => {
        currentDate.current = dayjs().format('DD.MM.YYYY')
    })
    const currencyParams = useRef({
        "date": currentDate.current,
        "currency_id": ""
    })

    const getCurrencyList = () => {
        API.Finance.Picklist.getCurrencyList().then(res => {
            if (res.data.status === 200) {
                setCurrencyList(res.data.data)
            }
        })
    }

    useEffect(() => {
        setDataStatus(data?.transaction?.status_type?.key)
    }, [data?.transaction?.status_type?.key])
    useEffect(() => {
        API.User.getCurrencies({ "date": "08.04.2023", "currency_id": '5031fad3-10b6-4dab-8b3c-be0ec4f8af9f' }).then(res => setConstCurrency(res.data.data))
    }, [])
    const onChangeStatus = (bool) => {
        disableButton.current = bool
        return bool
    }


    const changeToEdit = () => {
        setIsEditable(false)
    }

    const onFinish = (value) => {
        if (accountInputGroup.some(v => v === true)) {
            if (disableButton.current) {
                onChangeStatus(false)
                value.data = value?.data?.filter(v => v)
                value.date = value?.date?.format('YYYY-MM-DD')
                value = convertToNull(value)
                value.data.forEach(v => {
                    delete v?.converting_currency
                    delete v?.currency
                    delete v?.mutual_amount_converted
                    if (v.debet?.products) v.debet.products = v.debet.products.filter(({ product_id, subkonto_chart_of_account_id }) => product_id && subkonto_chart_of_account_id)
                    else v.debet = { ...v.debet, products: [] }
                    if (v.credit?.products) v.credit.products = v.credit.products.filter(({ product_id, subkonto_chart_of_account_id }) => product_id && subkonto_chart_of_account_id)
                    else v.credit = { ...v.credit, products: [] }
                    delete v?.mutual_amount
                })
                API.Finance.AccountTransactions.update(data?.uuid, value).then(res => {
                    if (res.data.status === 201 || res.data.status === 200) {
                        Close()
                        onChangeStatus(true)
                    } else {
                        setTimeout(() => {
                            onChangeStatus(true)
                        }, 1000);
                    }
                })
            }
        } else {
            onChangeStatus(true)
            Modal.error({
                content: innerText.error_insert_data,
            });
        }

    }

    const Close = () => {
        renderView()
        onClose()
        resetModal()
    }

    const getJournals = () => {
        API.Finance.AccountTransactions.journals().then(res => {
            if (res.data.status === 200) {
                setDebetList(res.data.data)
                setCreditList(res.data.data)
            }
        })
    }

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

    const addInputGroup = () => {
        const fields = accountInputGroup
        fields.push(true)
        setAccountInputGroup([...fields])
    }

    const removeInputGroup = (i) => {
        // console.log(subDebetList)

        let fields = accountInputGroup
        delete fields[i]
        setAccountInputGroup([...fields])
    }

    const onDebetChange = (val, i) => {
        if (Array.isArray(val)) {
            const dataDebetList = [];
            const _setDebetList = (_index_ = 0) => {
                if (dataDebetList[_index_]) {
                    const { subkonto_belong } = val[_index_];
                    const { subkonto } = dataDebetList[_index_];
                    const values = [];
                    subkonto_belong?.forEach((_value, _index) => {
                        const { uuid } = _value?.subkonto_chart_account?.subkonto;
                        const index = subkonto.findIndex(val => val.uuid === uuid);

                        values.push(
                            {
                                name: ['data', _index_, 'debet', 'products', index, 'product_id'],
                                value: _value?.product?.uuid
                            },
                            {
                                name: ['data', _index_, 'debet', 'products', index, 'uuid'],
                                value: _value?.uuid
                            },
                            {
                                name: ['data', _index_, 'debet', 'products', index, 'subkonto_chart_of_account_id'],
                                value: _value?.subkonto_chart_account?.subkonto?.uuid
                            }
                        );
                    });

                    form.setFields(values);
                }
                if (++_index_ < val.length) _setDebetList(_index_);
            }
            const _recursiveOnTestChange = (v, r) => {
                API.Finance.SubKonto.getSubkontoList(v?.account_plan?.uuid).then(res => {
                    dataDebetList.push(res.data.data);
                    if (++r < val.length) {
                        _recursiveOnTestChange(val[r], r);
                    } else {
                        setSubDebetList([...dataDebetList])
                        _setDebetList()
                    }
                });
            }
            _recursiveOnTestChange(val[0], 0);
        } else {
            onSingleDebetChange(val, i)
        }
    }
    const onSingleDebetChange = (val, index) => {
        let dataDebetList = []
        if (subDebetList && subDebetList?.length) dataDebetList = [...subDebetList]

        API.Finance.SubKonto.getSubkontoList(val).then(res => {
            if (res.data.status === 200) {
                dataDebetList[index] = res.data.data

                const values = []
                dataDebetList?.forEach((val, ind) => {
                    if (index === ind) {
                        val?.subkonto?.forEach((v, i) => {
                            values.push(
                                {
                                    value: null,
                                    name: ['data', ind, 'debet', 'products', i, 'product_id']
                                },
                                {
                                    value: v?.uuid,
                                    name: ['data', ind, 'debet', 'products', i, 'subkonto_chart_of_account_id']
                                },
                                {
                                    value: null,
                                    name: ['data', ind, 'debet', 'quantity']
                                },
                                {
                                    value: null,
                                    name: ['data', ind, 'debet', 'currency_id']
                                }
                            )
                        })
                    }
                })
                form.setFields(values)
            }
            setSubDebetList(dataDebetList)
        })
    }

    const onCreditChange = (val, i) => {
        if (Array.isArray(val)) {
            const dataCreditList = [];
            const _setCreditList = (_index_ = 0) => {
                if (dataCreditList[_index_]) {
                    const { subkonto_belong } = val[_index_];
                    const { subkonto } = dataCreditList[_index_];
                    const values = [];
                    subkonto_belong.forEach((_value, _index) => {
                        const { uuid } = _value?.subkonto_chart_account?.subkonto;
                        const index = subkonto.findIndex(val => val.uuid === uuid);
                        values.push(
                            {
                                name: ['data', _index_, 'credit', 'products', index, 'product_id'],
                                value: _value?.product?.uuid
                            },
                            {
                                name: ['data', _index_, 'credit', 'products', index, 'uuid'],
                                value: _value?.uuid
                            },
                            {
                                name: ['data', _index_, 'credit', 'products', index, 'subkonto_chart_of_account_id'],
                                value: _value?.subkonto_chart_account?.subkonto?.uuid
                            }
                        );
                    });
                    form.setFields(values)
                }
                if (++_index_ < val.length) _setCreditList(_index_);
            }
            const _recursiveOnTestChange = (v, r) => {
                API.Finance.SubKonto.getSubkontoList(v?.account_plan?.uuid).then(res => {
                    dataCreditList.push(res.data.data);
                    if (++r < val.length) {
                        _recursiveOnTestChange(val[r], r);
                    } else {
                        setSubCreditList([...dataCreditList])
                        _setCreditList()
                    }
                });
            }
            _recursiveOnTestChange(val[0], 0);
        } else {
            onSingleCreditChange(val, i)
        }
    }

    const onSingleCreditChange = (val, index) => {
        let dataCreditList = []
        if (subCreditList && subCreditList?.length) dataCreditList = [...subCreditList]
        API.Finance.SubKonto.getSubkontoList(val).then(res => {
            if (res.data.status === 200) {
                dataCreditList[index] = res.data.data

                const values = []
                dataCreditList?.forEach((val, ind) => {
                    if (index === ind) {
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
                                },
                                {
                                    value: null,
                                    name: ['data', ind, 'credit', 'currency_id']
                                }
                            )
                        })
                    }
                })
                form.setFields(values)
            }
            setSubCreditList(dataCreditList)
        })
    }

    const onCancelClick = () => {
        onClose()
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
                API.Com.Column.listData(val?.uuid).then(res => {
                    if (res.data.status === 200) {
                        prodOptionD.push(res.data.data)
                        if (valueD && valueD?.subkonto?.length - 1 === ind) debetProdGroup[index] = prodOptionD
                    }
                    setDebetProdOptionArr([...debetProdGroup])
                })
            })

            valueC?.subkonto?.forEach((val, ind) => {
                API.Com.Column.listData(val?.uuid).then(res => {
                    if (res.data.status === 200) {
                        prodOptionC.push(res.data.data)
                        if (valueC && valueC?.subkonto?.length - 1 === ind) creditProdGroup[index] = prodOptionC
                    }
                    setCreditProdOptionArr([...creditProdGroup])
                })
            })

        })

    }, [subDebetList, subCreditList])

    const resetModal = () => {
        form.resetFields()
        setIsFieldChanged(false)
        setDebetList([])
        setCreditList([])
        setSubDebetList([])
        setSubCreditList([])
        setCurrencyList([])
        setDebetProdOptionArr([])
        setCreditProdOptionArr([])
        setIsEditable(true)
    }

    const setTrn_dataList = (data, status) => {
        const trnUuids = []
        let st_uuid

        trnUuids.push(data?.transaction?.uuid)
        status.forEach(val => val?.content ? st_uuid = val.content.uuid : null)

        const rejectParams = {
            trn_ids: trnUuids
        }
        setTrnUuidList(rejectParams)
        const nextParams = {
            trn_ids: trnUuids,
            status_id: st_uuid
        }
        setTrnData(nextParams)
    }

    const _sub = subCreditList;
    const getShowData = (st) => {
        if (st) {
            getJournals()
            getCurrencyList()
            data?.uuid && API.Finance.AccountTransactions.show(data.uuid).then(res => {
                if (res.data.status === 200 || res.data.status === 201) {
                    const resData = res.data.data
                    // console.log(resData);
                    setStatusType(resData?.transaction?.transaction?.status_type)
                    setCurrentUser(`${resData?.transaction?.employee?.surname_nat} ${resData?.transaction?.employee?.name_nat}`)
                    form.setFields([
                        {
                            name: ['date'],
                            value: dayjs(resData?.transaction?.date)
                        },
                        {
                            name: ['description'],
                            value: resData?.transaction?.description
                        },
                        {
                            name: ['total_amount'],
                            value: `${resData?.transaction?.sum_amount} AZN`
                        },
                        // {
                        //     name: ['total_amount_converted'],
                        //     value: `${parseFloat(resData?.transaction?.sum_amount / constCurrency).toFixed(1)} USD`
                        // },
                        {
                            name: ['status_type'],
                            value: resData?.transaction?.transaction?.status_type?.name
                        }
                    ])

                    const dataCount = []
                    if (resData) {
                        const { data } = resData
                        setShowData(data)
                        const values = []
                        const debetUuidList = []
                        const creditUuidList = []
                        data?.map(value => {
                            debetUuidList.push(value?.debet)
                            creditUuidList.push(value?.credit)
                        })
                        if (debetUuidList?.length) onDebetChange(debetUuidList)
                        if (creditUuidList?.length) onCreditChange(creditUuidList)
                        data?.map((value, index) => {
                            dataCount.push(true)
                            if (value?.debet) {
                                // console.log(value?.debet);
                                if (value?.debet?.currency?.uuid && value?.debet?.currency?.key == 'usd' && value?.debet?.amount) {
                                    // console.log(currencyParams.current);
                                    currencyParams.current.currency_id = value?.debet?.currency?.uuid
                                    API.User.getCurrencies(currencyParams.current).then(res => {
                                        const _amount = parseFloat(value?.debet?.amount * res.data.data).toFixed(1)
                                        // console.log(_amount);
                                        form.setFieldValue(["data", index, 'mutual_amount_converted'], `${_amount}`)
                                        form.setFieldValue(["data", index, "currency"], value?.debet?.currency?.name)
                                        form.setFieldValue(["data", index, "converting_currency"], 'AZN')


                                        // {
                                        //     name:["data", index, 'mutual_amount_converted'],
                                        //     value: value
                                        // }
                                    })
                                }
                                values.push(
                                    {
                                        name: ['data', index, 'uuid'],
                                        value: value?.uuid
                                    },
                                    {
                                        name: ['data', index, 'mutual_amount'],
                                        value: value?.debet?.amount
                                    },
                                    {
                                        name: ['data', index, 'debet', 'uuid'],
                                        value: value?.debet?.uuid
                                    },
                                    {
                                        name: ['data', index, 'debet', 'chart_of_account_id'],
                                        value: value?.debet?.account_plan?.uuid
                                    },
                                    {
                                        name: ['data', index, 'debet', 'quantity'],
                                        value: value?.debet?.quantity
                                    },
                                    {
                                        name: ['data', index, 'currency_id'],
                                        value: value?.debet?.currency?.uuid
                                    },
                                    {
                                        name: ['data', index, 'debet', 'amount'],
                                        value: value?.debet?.amount
                                    }

                                )
                            }
                            if (value?.credit) {
                                values.push(
                                    {
                                        name: ['data', index, 'credit', 'uuid'],
                                        value: value?.credit?.uuid
                                    },
                                    {
                                        name: ['data', index, 'credit', 'chart_of_account_id'],
                                        value: value?.credit?.account_plan?.uuid
                                    },
                                    {
                                        name: ['data', index, 'credit', 'quantity'],
                                        value: value?.credit?.quantity
                                    },
                                    {
                                        name: ['data', index, 'currency_id'],
                                        value: value?.credit?.currency?.uuid
                                    },
                                    {
                                        name: ['data', index, 'credit', 'amount'],
                                        value: value?.credit?.amount
                                    }
                                    // {
                                    //     name: ['data', index, 'credit', 'amount'],
                                    //     value: value?.credit?.amount
                                    // }
                                )
                            }

                        })
                        form.setFields(values)
                        setAccountInputGroup(dataCount)
                    }
                }

            })
            data?.transaction?.uuid && API.Signature.Signature.show(data.transaction.uuid).then(res => {
                setTrn_dataList(data, res.data.data)
                setButtonList(res.data.data)
            })

            const trn_id = data.transaction.uuid
            data?.transaction?.uuid && API.General.Setting.required_main_field(trn_id).then(res => {
                setRequiredFileds(res.data.data)
            })
            data?.transaction?.uuid && API.General.Setting.disabled_main_field(trn_id).then(res => {
                setDisabledFiedls(res.data.data)
            })
        } else {
            resetModal()
        }
    }

    const formOnChange = (changeFields, allFields) => {
        if (changeFields) setIsFieldChanged(true)
    }
    return (
        <Drawer
            title={
                <Row gutter={8} justify='space-between' align='center'>
                    <Col>
                        <Title style={{ margin: 0 }} level={4}>{innerText.title_view}</Title>
                    </Col>
                    {
                        isEditable ? (
                            <Col>
                                <Space size={8}>
                                    {
                                        <MyButton icon={<EditOutlined />} onClick={changeToEdit}>{innerText.btn_edit}</MyButton>
                                    }
                                    <MyButton href={`${location.pathname}/show/${data?.uuid}`} target='_blank'> {innerText.btn_view} <FolderViewOutlined /></MyButton>
                                </Space>
                            </Col>
                        ) : (
                            <MyButton href={`${location.pathname}/show/${data?.uuid}`} target='_blank'> {innerText.btn_view} <FolderViewOutlined /></MyButton>
                        )
                    }
                </Row>
            }
            width="calc(100% - 200px)"
            onClose={Close}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={getShowData}
        // extra={<MyButton href={`${location.pathname}/show/${data?.uuid}`} target='_blank'> {innerText.btn_view} <FolderViewOutlined /></MyButton>}
        >
            <Form
                disabled={isEditable}
                ref={formRef}
                form={form}
                layout="vertical"
                onFinish={onFinish} onFieldsChange={formOnChange}
                className='acc-trans-update'
            >
                <Row gutter={16}>
                    <Col span={24} >
                        <Row gutter={16}>
                            <Col span={24} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "1rem" }}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: requiredFields.Required('date'),
                                            message: innerText.error_insert_data,
                                        }
                                    ]}
                                    style={{ width: '200px', marginRight: '1%', display: 'inline-block' }}
                                    label={innerText.date}
                                    name='date'
                                >
                                    <DatePicker
                                        disabled={isEditable || disabledFields.Disabled('date')}
                                    />
                                </Form.Item>
                                <Form.Item label=' '>
                                    <Input
                                        style={{ width: '200px' }}
                                        value={currentUser}
                                        disabled
                                        placeholder={innerText.input_placeholder}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '200px', marginRight: '1%', display: 'inline-block' }}
                                    label={innerText.description}
                                    name='description'
                                    rules={[
                                        {
                                            required: requiredFields.Required('description'),
                                            message: innerText.error_insert_data,
                                        }
                                    ]}
                                >
                                    <Input
                                        disabled={isEditable || disabledFields.Disabled('description')}
                                        placeholder={innerText.input_placeholder}
                                    />
                                </Form.Item>
                                {/* <Form.Item> */}
                                <Form.Item
                                    // style={{ width: '50%', margin: 0 }}
                                    label={innerText.total_amount}
                                    name={['total_amount']}
                                >
                                    <Input
                                        disabled
                                        style={{ border: 'none', backgroundColor: 'transparent', padding: 0, margin: 0 }}
                                        type='textarea'
                                    />
                                </Form.Item>
                                {/* <Form.Item
                                        label=' '
                                        style={{ width: '50%', margin: 0 }}
                                        // initialValue={'0'}
                                        name={['total_amount_converted']}
                                    >
                                        <Input
                                            disabled
                                            style={{ border: 'none', backgroundColor: 'transparent', padding: 0, margin: 0 }}
                                        />
                                    </Form.Item> */}
                                {/* </Form.Item> */}
                                <Status name={statusType?.key} title={statusType?.name} />
                            </Col>
                            {
                                accountInputGroup?.map((v, i) => {
                                    return (
                                        v && <AccountInputGroup
                                            _i={++_i}
                                            key={i}
                                            index={i}
                                            showData={showData}
                                            isEdit={isEdit}
                                            form={form}
                                            removeField={removeInputGroup}
                                            debetList={debetList}
                                            creditList={creditList}
                                            currencyList={currencyList}
                                            subDebetList={subDebetList}
                                            subCreditList={subCreditList}
                                            onDebetChange={onDebetChange}
                                            onCreditChange={onCreditChange}
                                            debetProdOptions={debetProdOptionArr}
                                            creditProdOption={creditProdOptionArr}
                                            // onChangeAmount={onChangeAmount}
                                            // onChangeCurrency={onChangeCurrency}
                                            renderTreeNodes={renderTreeNodes}
                                            isEditable={isEditable}
                                            requiredFields={requiredFields}
                                            disabledFields={disabledFields}
                                            dataStatus={dataStatus}
                                            currentDate={currentDate.current}
                                        />
                                    )
                                })
                            }
                            {
                                dataStatus === 'draft' && <Row justify='center' style={{ width: '100%' }}>
                                    <Col>
                                        <MyButton icon={<PlusSquareOutlined />} onClick={addInputGroup} />
                                    </Col>
                                </Row>
                            }
                        </Row>
                        <Row align='end' gutter={8}>
                            <Divider />
                            {
                                isFieldChanged ? (
                                    <>
                                        <Col>
                                            <MyButton disabled={!disableButton.current} htmlType="submit">{innerText.btn_save}</MyButton>
                                        </Col>
                                        <Col>
                                            <MyButton onClick={onCancelClick}>{innerText.btn_cancel}</MyButton>
                                        </Col>
                                    </>
                                ) : (
                                    buttonList?.map((value, index) => (
                                        <Col key={index}>
                                            <Signature
                                                value={value}
                                                trn_data={trnData}
                                                trn_list={trnUuidList}
                                                callback={Close}
                                                form={form}
                                            />
                                        </Col>
                                    ))
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default Update;