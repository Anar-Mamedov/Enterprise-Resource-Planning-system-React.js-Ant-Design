import React, { useState, useEffect } from 'react'
import './style.scss';
import API from '../../../API'
import {
    Row, Col, Button,
    Form, Drawer, Checkbox,
    Input
} from 'antd';
import { Loading, Button as MyButton } from '../../../Components';
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("AccountTransactions")
const { Search } = Input;
let initialData = []
let isPaginate = true
let scrollToTop = 0
function Index({ onClose, visibleFilter, dataFilter, searchValue }) {
    const [disabled, setDisabled] = useState(false)

    const [data, setData] = useState(null)
    const [inputValue, setInputValue] = useState(null)
    const [oldFilter, setOldFilter] = useState(null)
    const [scrollLoad, setScrollLoad] = useState(0)
    const [form] = Form.useForm()
    const onFinish = (value) => {
        if (value.filter) {
            const index = value.filter.map((val, ind) => val && ind).filter(v => Number.isInteger(v));
            const filter = index.map(v => data[v].name);

            Close(filter)
            // console.log(filter)
        }
    }

    const Close = (filter) => {
        // console.log(filter)

        form.resetFields();
        resetFilter();
        setData([])
        initialData = []
        onClose(filter)
    }

    const resetFilter = () => {
        setInputValue(null)
        dataFilter.search_single = inputValue;
        dataFilter.single_paginate = 0;
        isPaginate = true;
    }

    const selectFilter = (data) => {
        console.log(data)
        API.Finance.AccountTransactions.index(JSON.stringify(data)).then(res => {
            if (res.data.status === 200) {
                setData([...res.data.data])
                initialData = [...res.data.data]
            }
        })
    }

    const selectFilterScroll = (data) => {
        API.Finance.AccountTransactions.index(JSON.stringify(data)).then(res => {
            if (res.data.status === 200) {
                setData([...initialData, ...res.data.data])
                initialData = [...initialData, ...res.data.data]
                isPaginate = true
            }
            setScrollLoad(0)
        })
    }

    const clearFilter = () => {
        dataFilter.filter_by[dataFilter.index] = [];
        dataFilter.single_paginate = 0;
        dataFilter.search_single = ''
        isPaginate = true;
        selectFilter(dataFilter);
    }

    const afterOpenChange = (visible) => {
        if (visible) {
            dataFilter.single_paginate = 0;
            isPaginate = true;
            selectFilter(dataFilter);
            searchValue && setInitialSearchValue()
            const oldFilter = dataFilter?.filter_by[data?.index];
            setOldFilter(oldFilter)
        } else {
            form.resetFields()
            dataFilter.search_single = null
            setInputValue('')
        }

    }

    const inputOnChange = (e) => {
        const { value } = e.target
        // console.log('--', value)
        setInputValue(value)
        dataFilter.search_single = value
        selectFilter(dataFilter)
    }

    const setInitialSearchValue = () => {
        form.setFields([{
            name: ["single_search"],
            value: searchValue
        }])
    }

    const onScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollToTop != scrollTop) {
            scrollToTop = scrollTop;
            const bottom = scrollHeight - scrollTop - clientHeight;
            if (bottom <= 10 && isPaginate) {
                dataFilter.single_paginate++;
                isPaginate = false;
                setScrollLoad(56)
                selectFilterScroll(dataFilter)
            }
        }
    }
    // console.log(data)
    useEffect(() => {
        dataFilter && API.Finance.AccountTransactions.index(JSON.stringify(dataFilter)).then(res => {
            if (res.data.status === 200) {
                setData(res.data.data)
            }
        })

        searchValue && dataFilter && setInitialSearchValue()
    }, [dataFilter, searchValue])


    return (
        <Drawer
            title={innerText.filter}
            width={400}
            onClose={onClose}
            open={visibleFilter}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterOpenChange}
            extra={
                <Input value={inputValue} onChange={inputOnChange} placeholder={innerText.search_placeholder} style={{ width: 250 }} />
            }
        >
            <Form form={form} layout="vertical" onFinish={onFinish} >
                <Row onScroll={onScroll} span={19} style={{ maxHeight: (window.innerHeight - 245 - scrollLoad), overflow: 'auto' }} >
                    <Col span={24}>
                        {
                            oldFilter?.map((value, i) => value?.name &&
                                <Form.Item key={i} name={["filter", i]} valuePropName="checked" style={{ marginBottom: '20px' }}>
                                    <Checkbox value={value.name}>{value.name || ''}</Checkbox>
                                </Form.Item>
                            )
                        }
                        {
                            data?.map((value, i) => value?.name &&
                                <Form.Item key={i} name={["filter", i]} valuePropName="checked" style={{ marginBottom: '20px' }}>
                                    <Checkbox value={value.name}>{value.name || ''}</Checkbox>
                                </Form.Item>
                            )
                        }
                    </Col>
                </Row>
                {scrollLoad > 0 && <Loading message={innerText.sign_loading} />}
                <Row align='center' style={{ marginTop: 30 }} gutter={8} >
                    <Col>
                        <MyButton htmlType="submit" >{innerText.filtering}</MyButton>
                    </Col>
                    <Col>
                        <MyButton htmlType='reset' onClick={clearFilter}>{innerText.btn_clear_filter}</MyButton>
                    </Col>
                </Row>
            </Form>
        </Drawer >
    )
}

export default Index