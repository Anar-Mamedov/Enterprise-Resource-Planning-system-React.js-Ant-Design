import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Drawer, Checkbox, Input } from 'antd';
import API from '../../../API'
import { Loading } from '../../../Components';
import { BillTableContext, useContext } from '../Context/context';
let isPaginate = true
let initialData = []
let scrollToTop = 0

function Index() {
    const { onCloseFilter, visibleFilter, dataFilter, searchValue } = useContext(BillTableContext)
    const [data, setData] = useState(null)
    const [inputValue, setInputValue] = useState(searchValue)
    const [oldFilter, setOldFilter] = useState(null)
    const [scrollLoad, setScrollLoad] = useState(0)
    const [form] = Form.useForm()
    const onFinish = (value) => {
        console.log(value)
        if (value.filter) {
            const index = value.filter.map((val, ind) => val && ind).filter(v => Number.isInteger(v));
            const filter = index.map(v => data[v].name);
            Close(filter)
        }
    }
    const clearFilter = () => {
        dataFilter.filter_by[dataFilter.index] = [];
        dataFilter.single_paginate = 0;
        dataFilter.search_single = ''
        isPaginate = true;
        selectFilter(dataFilter);
    }
    const inputOnChange = (e) => {
        const value = e.target.value
        dataFilter.search_single = value
        setInputValue(value)
        selectFilter(dataFilter)
    }
    const selectFilter = (data) => {
        API.Finance.Bill.index(JSON.stringify(data)).then(res => {
            if (res.data.status === 200) {
                setData([...res.data.data])
                initialData = [...res.data.data]
            }
        })
    }
    const selectFilterScroll = (data) => {
        API.Finance.Bill.index(JSON.stringify(data)).then(res => {
            if (res.data.status === 200) {
                setData([...initialData, ...res.data.data])
                initialData = [...initialData, ...res.data.data]
                isPaginate = true
            }
            setScrollLoad(0)
        })
    }
    const Close = (filter) => {
        form.resetFields();
        resetFilter();
        setData([])
        initialData = []
        onCloseFilter(filter)
    }
    const resetFilter = () => {
        setInputValue(null)
        dataFilter.search_single = inputValue;
        dataFilter.single_paginate = 0;
        isPaginate = true;
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
        }

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
    useEffect(() => {
        dataFilter && API.Finance.Bill.index(JSON.stringify(dataFilter)).then(res => {
            if (res.data.status === 200) {
                setData(res.data.data)
            }
        })
        searchValue && dataFilter && setInitialSearchValue()
    }, [dataFilter, searchValue])
    return (
        <Drawer
            title="Filter"
            width={400}
            className='comp-modal-filter-by'
            onClose={onCloseFilter}
            open={visibleFilter}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterOpenChange}
            extra={<Input value={inputValue} onChange={inputOnChange} placeholder="Search" style={{ width: 250 }} />}
        >
            <Form form={form} layout="vertical" onFinish={onFinish} >
                <Row onScroll={onScroll} style={{ maxHeight: (window.innerHeight - 245 - scrollLoad), overflow: 'auto' }} gutter={24} justify='left'>
                    <Col span={24}>
                        {
                            oldFilter?.map((value, i) =>
                                <Form.Item key={i} name={["filter", i]} valuePropName="checked" style={{ marginBottom: '10px' }}>
                                    <Checkbox value={value.name}>{value.name || 'Boşdur'}</Checkbox>
                                </Form.Item>
                            )
                        }
                        {
                            data?.map((value, i) =>
                                <Form.Item key={i} name={["filter", i]} valuePropName="checked" style={{ marginBottom: '10px' }}>
                                    <Checkbox value={value.name}>{value.name || 'Boşdur'}</Checkbox>
                                </Form.Item>
                            )
                        }
                    </Col>
                </Row>
                {scrollLoad > 0 && <Loading message="Yüklənir..." />}
                <Row align='center' style={{ marginTop: 30 }}>
                    <Button htmlType="submit" type='primary' className='filtered'>Filtrlə</Button>
                    <Button htmlType='reset' onClick={clearFilter} type='danger' className='reset'>Təmizlə</Button>
                </Row>
            </Form>
        </Drawer >
    )
}
export default Index;