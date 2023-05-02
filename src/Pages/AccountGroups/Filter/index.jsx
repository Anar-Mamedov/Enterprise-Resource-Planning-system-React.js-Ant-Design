import React, { useState, useEffect } from 'react'
import './style.scss';
import {
    Row, Col, Button,
    Form, Drawer, Checkbox,
    Input
} from 'antd';
import API from '../../../API'
import { Loading } from '../../../Components';
import { GrClose } from 'react-icons/gr';

const { Search } = Input;
let isPaginate = true
let initialData = []
let scrollToTop = 0
let initialScrollLoad = 0
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
        API.Finance.KontoGroups.index(JSON.stringify(data)).then(res => {
            if (res.data.status === 200) {
                setData([...res.data.data])
                initialData = [...res.data.data]
            }
        })
    }

    const selectFilterScroll = (data) => {
        API.Finance.SubKonto.index(JSON.stringify(data)).then(res => {
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
        onClose(filter)
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
            setInputValue('')
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
        dataFilter && API.Finance.KontoGroups.index(JSON.stringify(dataFilter)).then(res => {
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
            className='c-drawer'
            onClose={onClose}
            closeIcon={<GrClose size={18} style={{ display: 'inherit' }} />}
            open={visibleFilter}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={{ padding: 24, backgroundColor: 'rgba(51, 48, 60, 0.04)' }}
            afterOpenChange={afterOpenChange}
            extra={<Input className='c-input ' value={inputValue} onChange={inputOnChange} placeholder="Search"  />}
        >
            <Form form={form} layout="vertical" onFinish={onFinish} >
                <Row onScroll={onScroll} style={{ maxHeight: (window.innerHeight - 200 - scrollLoad), overflow: 'auto' }} gutter={24} justify='left'>
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
                {scrollLoad > 0 && <Loading message="Yüklənir..." />}
                <Row align='end'  className='fixed-submit-buttons' >
                    <Button htmlType="submit" type='primary' className='c-btn c-btn--primary'>Filtrlə</Button>
                    <Button htmlType='reset' onClick={clearFilter} className='c-btn c-btn--danger'>Təmizlə</Button>
                </Row>
            </Form>
        </Drawer >
    )
}

export default Index