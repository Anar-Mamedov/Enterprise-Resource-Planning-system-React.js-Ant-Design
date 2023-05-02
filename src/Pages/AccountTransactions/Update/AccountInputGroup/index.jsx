import {
    Form, Input, InputNumber, Typography, Modal, Col, Select, Button, TreeSelect
} from 'antd';
import './style.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useEffect, useState, useRef } from 'react';
import API from '../../../../API';
import { Languages } from '../../../../Config';
const innerText = Languages.SelectLanguage("AccountTransactions")
const { Text, Title } = Typography;
const { Option } = Select;


const AccountInputGroup = (
    { index, removeField, debetProdOptions, creditProdOption, onDebetChange,
        onCreditChange, renderTreeNodes, subDebetList, subCreditList, debetList,
        isEditable, currencyList, isEdit, showData, form, _i, requiredFields,
        disabledFields, dataStatus, accountInputGroup, currentDate }
) => {
    const currencyParams = useRef({
        "date": currentDate,
        "currency_id": ""
    })
    const currentCurrencyList = useRef([])

    useEffect(() => {
        getExistingCurrencies()
    }, [accountInputGroup])

    const getExistingCurrencies = () => {
        const _currentCurrencyList = []
        let { data } = form.getFieldsValue()
        data?.forEach(val => {
            _currentCurrencyList.push(val?.currency_id)
        })
        currentCurrencyList.current = _currentCurrencyList
    }

    const getTotalAmount = () => {
        getExistingCurrencies()
        const { data } = form.getFieldsValue()
        let _sumLocal = 0
        let _sumConverted = 0
        // let isUSD = false
        // isUSD = data?.some(val => val?.currency === 'USD')

        data?.forEach((val, ind) => {
            if (!val?.currency && val?.mutual_amount) {
                _sumLocal += parseFloat(val?.mutual_amount)
                form.setFieldValue('total_amount', `${_sumLocal} AZN`)
                // isUSD ? form.setFieldValue('total_amount_converted', `${(_sumLocal / constCurrency).toFixed(1)} USD`) : form.setFieldValue('total_amount_converted', 0)
            }
            switch (val?.currency) {
                case 'AZN':
                    _sumLocal += parseFloat(val?.mutual_amount)
                    _sumLocal && form.setFieldValue('total_amount', `${_sumLocal} AZN`)
                    // console.log('az _sumloca', _sumLocal);
                    // isUSD ? _sumConverted = parseFloat(_sumLocal / constCurrency).toFixed(1) : _sumConverted = _sumConverted
                    // console.log('az _sumconverted', _sumConverted);
                    // _sumConverted && form.setFieldValue('total_amount_converted', `${_sumConverted} USD`)
                    break;
                case 'USD':
                    currencyParams.current.currency_id = val?.currency_id
                    API.User.getCurrencies(currencyParams.current).then(res => {
                        _sumLocal += parseFloat(val?.mutual_amount * res.data.data)
                        _sumLocal && form.setFieldValue('total_amount', `${_sumLocal} AZN`)
                    })
                    // console.log('us _sumloca', _sumLocal);
                    // _sumConverted = parseFloat(_sumLocal / constCurrency).toFixed(1)
                    // console.log('us _sumconverted', _sumConverted);
                    // isUSD && _sumConverted ? form.setFieldValue('total_amount_converted', `${_sumConverted} USD`) : form.setFieldValue('total_amount_converted', 0)
                    break;
                default:
                    break;
            }
        })
        currencyParams.current.currency_id = ''
    }

    const onChangeAmount = (e, index) => {
        const _currentCurrencyId = form.getFieldValue(["data", index, "currency_id"])
        const _currentCurrency = currencyList.find(v => v?.uuid === _currentCurrencyId)
        let _convertedAmount = 0

        if (_currentCurrency?.uuid && _currentCurrency?.name !== 'AZN') {
            currencyParams.current.currency_id = _currentCurrency?.uuid
            API.User.getCurrencies(currencyParams.current).then(res => {
                const currencyOdd = res.data.data
                _convertedAmount = (parseFloat(e) * parseFloat(currencyOdd)).toFixed(2)
                form.setFields([
                    {
                        name: ['data', index, 'debet', 'amount'],
                        value: e
                    },
                    {
                        name: ['data', index, 'credit', 'amount'],
                        value: e
                    },
                    {
                        name: ['data', index, 'mutual_amount'],
                        value: e
                    },
                    {
                        name: ["data", index, 'mutual_amount_converted'],
                        value: _convertedAmount
                    }
                ])
            })
        } else {
            form.setFields([
                {
                    name: ['data', index, 'debet', 'amount'],
                    value: e
                },
                {
                    name: ['data', index, 'credit', 'amount'],
                    value: e
                },
                {
                    name: ['data', index, 'mutual_amount'],
                    value: e
                }
            ])
        }
        currencyParams.current.currency_id = ''
        setTimeout(() => {
            getTotalAmount(index)
        }, 300);
    }

    const onChangeCurrency = (value, el, index, bool) => {
        getExistingCurrencies()
        const _currentCurrency = currencyList.find(v => v?.uuid === value)
        const _currentValue = form.getFieldValue(['data', index, 'mutual_amount'])
        let _convertedMutualAmount = 0

        if (_currentCurrency?.uuid && _currentCurrency?.name !== 'AZN') {
            currencyParams.current.currency_id = _currentCurrency?.uuid
            API.User.getCurrencies(currencyParams.current).then(res => {
                const currencyOdd = res.data.data
                if (_currentValue) _convertedMutualAmount = parseFloat(_currentValue) * parseFloat(currencyOdd)
                form.setFieldValue(["data", index, 'mutual_amount_converted'], _convertedMutualAmount)
                form.setFieldValue(["data", index, "converting_currency"], 'AZN')
            })
        }
        else {
            form.setFieldValue(["data", index, 'mutual_amount_converted'], 0)
            form.setFieldValue(["data", index, "converting_currency"], '')
        }
        form.setFieldValue(["data", index, "currency"], _currentCurrency?.name)
        currencyParams.current.currency_id = ''
        setTimeout(() => {
            getTotalAmount(index)
        }, 300);
    }

    useEffect(() => {
        const values = []
        subDebetList?.map((val, ind) => {
            if (val) {
                const { subkonto } = val
                subkonto?.map((v, i) => {
                    values.push(
                        {
                            name: ['data', ind, 'debet', 'products', i, 'subkonto_chart_of_account_id'],
                            value: v?.uuid
                        }
                    )
                })
            }

        })

        subCreditList?.map((val, ind) => {
            if (val) {
                const { subkonto } = val
                subkonto?.map((v, i) => {
                    values.push(
                        {
                            name: ['data', ind, 'credit', 'products', i, 'subkonto_chart_of_account_id'],
                            value: v?.uuid
                        }
                    )
                })
            }

        })
        form.setFields(values)
    }, [subDebetList, subCreditList])

    const onDebetProdIdChange = (index, ind) => {
        subDebetList?.[index]?.subkonto?.map((v, i) => {
            form.setFields([
                {
                    name: ['data', index, 'debet', 'products', i, 'subkonto_chart_of_account_id'],
                    value: v?.uuid
                }
            ])
        })
    }

    const onCreditProdIdChange = (index, ind) => {
        subCreditList?.[index]?.subkonto?.map((v, i) => {
            form.setFields([
                {
                    name: ['data', index, 'credit', 'products', i, 'subkonto_chart_of_account_id'],
                    value: v?.uuid
                }
            ])
        })
    }

    const removePart = (ind) => {
        if (!isEdit) {
            removeField(ind)
        } else {
            if (showData?.[ind]) {
                const { uuid } = showData[ind]
                API.Finance.AccountTransactions.delete(uuid).then(res => {
                    if (res.data.status === 200) {
                        removeField(ind)
                        Modal.success({
                            content: 'Əməliyyat uğurludur',
                        });
                    }
                })
            } else {
                removeField(ind)
            }
        }
        setTimeout(() => {
            getTotalAmount()
        }, 300);
    }

    return (
        <Col
            span={24}
            style={
                {
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', border: '1px solid #D8D6DE',
                    padding: '1rem', gap: '1rem', marginBottom: '1rem'
                }
            }
            className='inputgroup-container'
        >
            <Col style={{ padding: 0 }} lg={3} md={1}>
                <Text>No{_i}</Text>
            </Col>
            <Col style={{ padding: 0 }} lg={6} md={8}>
                {
                    isEdit && (
                        <>
                            <Form.Item
                                hidden={true}
                                name={['data', index, 'uuid']}
                            >
                                <Select
                                    options={[
                                        {
                                            value: 'uuid',
                                            label: 'uuid'
                                        }
                                    ]}
                                >
                                </Select>
                            </Form.Item>
                            <Form.Item hidden={true} name={['data', index, 'debet', 'uuid']}>
                                <Select
                                    options={[
                                        {
                                            value: 'uuid',
                                            label: 'uuid'
                                        }
                                    ]}
                                >
                                </Select>
                            </Form.Item>
                        </>
                    )
                }
                <Form.Item
                    name={['data', index, 'debet', 'chart_of_account_id']}
                    rules={[
                        {
                            required: requiredFields.Required(['data', index, 'debet', 'chart_of_account_id']),
                            message: innerText.error_insert_data,
                        }
                    ]}
                >
                    <TreeSelect
                        showSearch
                        placeholder={innerText.debet}
                        allowClear
                        treeDefaultExpandAll
                        onChange={_ => onDebetChange(_, index)}
                        disabled={isEditable || disabledFields.Disabled(['data', index, 'debet', 'chart_of_account_id'])}
                    >
                        {renderTreeNodes(debetList)}
                    </TreeSelect>
                </Form.Item>
                <Col style={{ padding: 0 }}>
                    <Col style={{ padding: 0 }} span={24} className='inner-inputs'>
                        <Form.Item
                            name={['data', index, 'debet', 'quantity']}
                            label={innerText.quantity}
                            className='upper-input'
                            rules={[
                                {
                                    required: requiredFields.Required(['data', index, 'debet', 'quantity']),
                                    message: innerText.error_insert_data,
                                }
                            ]}
                        >
                            <Input
                                disabled={isEditable || disabledFields.Disabled(['data', index, 'debet', 'quantity']) || !subDebetList?.[index]?.kontoplan?.amount_accounting}
                                placeholder={innerText.input_placeholder}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['data', index, 'debet', 'amount']}
                            label={innerText.amount}
                            className='upper-input'
                            rules={[
                                {
                                    required: requiredFields.Required(['data', index, 'debet', 'amount']),
                                    message: innerText.error_insert_data,
                                }
                            ]}
                        >
                            <InputNumber
                                disabled={isEditable || disabledFields.Disabled(['data', index, 'debet', 'amount'])}
                                type='number'
                                min={0}
                                style={{ padding: '2px' }}
                                onChange={e => onChangeAmount(e, index)} placeholder={innerText.input_placeholder}
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', padding: 0 }}
                        className='inner-input-group'
                    >
                        {
                            subDebetList?.[index]?.subkonto?.map((sub, ind) => {
                                return (
                                    <Col
                                        key={sub?.uuid}
                                        span={24}
                                        style={{ padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <Form.Item
                                            hidden={true}
                                            name={['data', index, 'debet', 'products', ind, 'subkonto_chart_of_account_id']}
                                            rules={[
                                                {
                                                    required: requiredFields.Required(['data', index, 'debet', 'products', ind, 'subkonto_chart_of_account_id']),
                                                    message: innerText.error_insert_data,
                                                }
                                            ]}
                                        >
                                            <Input
                                                disabled={isEditable || disabledFields.Disabled(['data', index, 'debet', 'products', ind, 'subkonto_chart_of_account_id'])}
                                            />
                                        </Form.Item>
                                        {
                                            isEdit && (
                                                <Form.Item hidden={true} name={['data', index, 'debet', 'products', ind, 'uuid']}>
                                                    <Select
                                                        options={[
                                                            {
                                                                value: 'uuid',
                                                                label: 'uuid'
                                                            }
                                                        ]}
                                                    >
                                                    </Select>
                                                </Form.Item>
                                            )
                                        }
                                        <Form.Item
                                            label={sub?.name}
                                            name={['data', index, 'debet', 'products', ind, 'product_id']}
                                            style={{ width: '244px', margin: 0 }}
                                            rules={[
                                                {
                                                    required: requiredFields.Required(['data', index, 'debet', 'products', ind, 'product_id']),
                                                    message: innerText.error_insert_data,
                                                }
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                                placeholder={innerText.select_placeholder}
                                                onChange={_ => onDebetProdIdChange(index, ind)}
                                                disabled={isEditable || disabledFields.Disabled(['data', index, 'debet', 'products', ind, 'product_id'])}
                                            >
                                                {
                                                    debetProdOptions && debetProdOptions?.[index]?.[ind]?.map((product) => {
                                                        return <Option key={product.uuid}>
                                                            {product.name}
                                                        </Option>
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                )
                            })
                        }
                    </Col>
                </Col>
            </Col>
            <Col lg={6} md={8}>
                {
                    isEdit && (
                        <Form.Item hidden={true} name={['data', index, 'credit', 'uuid']}>
                            <Select
                                options={[
                                    {
                                        value: 'uuid',
                                        label: 'uuid'
                                    }
                                ]}
                            >
                            </Select>
                        </Form.Item>
                    )
                }
                <Form.Item
                    name={['data', index, 'credit', 'chart_of_account_id']}
                    rules={[
                        {
                            required: requiredFields.Required(['data', index, 'credit', 'chart_of_account_id']),
                            message: innerText.error_insert_data,
                        }
                    ]}
                >
                    <TreeSelect
                        showSearch
                        placeholder={innerText.credit}
                        allowClear
                        treeDefaultExpandAll
                        onChange={_ => onCreditChange(_, index)}
                        disabled={isEditable || disabledFields.Disabled(['data', index, 'credit', 'chart_of_account_id'])}
                    >
                        {renderTreeNodes(debetList)}
                    </TreeSelect>
                </Form.Item>
                <Col style={{ padding: 0 }}>
                    <Col style={{ padding: 0 }} span={24} className='inner-inputs'>
                        <Form.Item
                            name={['data', index, 'credit', 'quantity']}
                            label={innerText.quantity}
                            className='inner-input'
                            rules={[
                                {
                                    required: requiredFields.Required(['data', index, 'credit', 'quantity']),
                                    message: innerText.error_insert_data,
                                }
                            ]}
                        >
                            <Input
                                disabled={isEditable || disabledFields.Disabled(['data', index, 'credit', 'quantity']) || !subCreditList?.[index]?.kontoplan?.amount_accounting}
                                placeholder={innerText.input_placeholder}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['data', index, 'credit', 'amount']}
                            label={innerText.amount}
                            className='inner-input'
                            rules={[
                                {
                                    required: requiredFields.Required(['data', index, 'credit', 'amount']),
                                    message: innerText.error_insert_data,
                                }
                            ]}
                        >
                            <InputNumber
                                disabled={isEditable || disabledFields.Disabled(['data', index, 'credit', 'amount'])}
                                type='number' min={0} style={{ padding: '2px' }}
                                onChange={e => onChangeAmount(e, index)}
                                placeholder={innerText.input_placeholder}
                            />
                        </Form.Item>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', padding: 0 }} className='inner-input-group'>
                        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', padding: 0 }} className='inner-input-group'>
                            {
                                subCreditList?.[index]?.subkonto?.map((sub, ind) => {
                                    return (
                                        <Col key={sub?.uuid} span={24} style={{ padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {/* {console.log('subkonto_chart_of_account_id crdt', requiredFields.Required(['data', index, 'debet', 'credit', ind, 'subkonto_chart_of_account_id']))} */}
                                            <Form.Item
                                                name={['data', index, 'credit', 'products', ind, 'subkonto_chart_of_account_id']}
                                                hidden={true}
                                                rules={[
                                                    {
                                                        required: requiredFields.Required(['data', index, 'credit', 'currency_id']),
                                                        message: innerText.error_insert_data,
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    disabled={isEditable || disabledFields.Disabled(['data', index, 'credit', 'currency_id'])}
                                                />
                                            </Form.Item>
                                            {
                                                isEdit && (
                                                    <Form.Item hidden={true} name={['data', index, 'credit', 'products', ind, 'uuid']}>
                                                        <Select
                                                            options={[
                                                                {
                                                                    value: 'uuid',
                                                                    label: 'uuid'
                                                                }
                                                            ]}
                                                        >
                                                        </Select>
                                                    </Form.Item>
                                                )
                                            }
                                            <Form.Item
                                                label={sub?.name}
                                                name={['data', index, 'credit', 'products', ind, 'product_id']}
                                                style={{ width: '244px', margin: 0 }}
                                                rules={[
                                                    {
                                                        required: requiredFields.Required(['data', index, 'credit', 'products', ind, 'product_id']),
                                                        message: innerText.error_insert_data,
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    allowClear
                                                    placeholder={innerText.select_placeholder}
                                                    onChange={_ => onCreditProdIdChange(index, ind)}
                                                    disabled={isEditable || disabledFields.Disabled(['data', index, 'credit', 'products', ind, 'product_id'])}
                                                >
                                                    {
                                                        creditProdOption && creditProdOption?.[index]?.[ind]?.map((product) => {
                                                            return <Option key={product.uuid}>
                                                                {product.name}
                                                            </Option>
                                                        })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    )
                                })
                            }
                        </Col>
                    </Col>
                </Col>
            </Col>
            <Col>
                <Form.Item
                    name={['data', index, 'currency_id']}
                    className='upper-input'
                    rules={[
                        {
                            required: requiredFields.Required(['data', index, 'currency_id']),
                            message: innerText.error_insert_data,
                        }
                    ]}
                >
                    <Select
                        allowClear
                        placeholder={innerText.currency_placeholder}
                        style={{ width: '106px' }}
                        disabled={isEditable || disabledFields.Disabled(['data', index, 'currency_id']) || !subDebetList?.[index]?.kontoplan?.currency_accounting && !subCreditList?.[index]?.kontoplan?.currency_accounting}
                        onChange={(v, child) => onChangeCurrency(v, child, index, subCreditList?.[index]?.kontoplan?.currency_accounting)}
                    >
                        {
                            currencyList && currencyList.map((currency) => {
                                return <Option key={currency.uuid}>
                                    {currency.name}
                                </Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col style={{ padding: 0 }} lg={3} md={3}>
                <Form.Item label={innerText.price} ></Form.Item>
                <Form.Item name={['data', index, 'mutual_amount']}>
                    <InputNumber
                        addonAfter={
                            <Form.Item style={{ margin: 0, width: '30px' }} name={["data", index, "currency"]}>
                                <Input
                                    disabled
                                    style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
                                />
                            </Form.Item>
                        }
                        disabled
                        type='number'
                        min={0}
                        style={{ margin: '2px 0', padding: '1px' }}
                        onChange={e => onChangeAmount(e, index)} placeholder='00'
                    />
                </Form.Item>
                <Form.Item name={["data", index, 'mutual_amount_converted']}>
                    <InputNumber
                        addonAfter={
                            <Form.Item style={{ margin: 0, width: '30px' }} name={["data", index, "converting_currency"]}>
                                <Input
                                    disabled
                                    style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
                                />
                            </Form.Item>
                        }
                        style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}
                        disabled
                        placeholder='0'
                    />
                </Form.Item>
            </Col>
            {
                dataStatus === 'draft' && <Col md={1}>
                    <Button onClick={_ => removePart(index)} icon={<CloseOutlined style={{ fontSize: '16px' }} />} />
                </Col>
            }

        </Col>
    )
}

export default AccountInputGroup;