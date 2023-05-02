import React, { useState, useRef } from 'react'
import style from './style.module.scss';
import {
    Row, Col, Button,
    Form, Drawer, Checkbox,
    Input
} from 'antd';
import API from '../../../API'
import {
    ClearOutlined
} from '@ant-design/icons';
import { Loading } from '../../../Components';
import { Languages } from "../../../Config";
const innerText = Languages.SelectLanguage("ChartOfAccount");


const Index = ({ visibleFilter, onClose, data }) => {
    const [disabled, setDisabled] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const [value, setValue] = useState(null)
    const [filter, setFilter] = useState([])
    const [oldFilter, setOldFilter] = useState([])
    const [scrollLoad, setScrollLoad] = useState(0)

    const form = useRef();
    let isPaginate = true;
    const scrollTop = 0;

    const afterVisibleChange = (visible) => {
        if (visible) {
            data.single_paginate = 0;
            isPaginate = true;
            selectFilter(data);
            const oldFilter = data.filter_by[data.index];
            setOldFilter(oldFilter)
        } else {
            resetFilter();
        }

    }

    const resetFilter = () => {
        const value = null;
        setValue(value);
        data.search_single = value;
        data.single_paginate = 0;
        isPaginate = true;
        form.current.resetFields();
    }

    const selectFilter = (data) => {
        setIsLoad(true)
        API.Finance.KontoPlans.getKontoPlan(JSON.stringify(data)).then(res => {
            const filter = res.data.data;
            setFilter(filter)
            setIsLoad(false)
        });
    }

    const selectFilterScroll = (data) => {
        setIsLoad(true)
        API.Finance.KontoPlans.getKontoPlan(JSON.stringify(data)).then(res => {
            setIsLoad(false)

            if (res.data.data.length) {
                const filter2 = [...filter, ...res.data.data];
                setFilter(filter2)
                isPaginate = true;
            }
            setScrollLoad(0)
        });
    }

    const clearFilter = () => {
        data.filter_by[data.index] = [];
        data.single_paginate = 0;
        isPaginate = true;
        selectFilter(data);
    }

    const Close = (filter) => {
        form.current.resetFields();
        resetFilter();
        setDisabled(false)
        setFilter([])
        onClose(filter);
    }

    const onFinish = (values) => {
        if (values.filter) {
            setDisabled(true)
            const index = values.filter.map((val, ind) => val && ind).filter(v => Number.isInteger(v));
            const filteredFilter = index.map(v => filter[v].name);
            Close(filteredFilter);
        }
    }

    const onSearch = (e) => {
        const { value } = e.target;
        setIsLoad(true)
        setValue(value)
        data.search_single = (value && value.length) ? value : null;
        data.single_paginate = 0;
        isPaginate = true;
        selectFilter(data);
    }

    const onScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        let scrollTop_2 = 0

        if (scrollTop_2 != scrollTop) {

            scrollTop_2 = scrollTop;

            const bottom = scrollHeight - scrollTop - clientHeight;

            if (bottom <= 10 && isPaginate) {
                data.single_paginate++;
                isPaginate = false;
                const scrollLoad = 72;
                setScrollLoad(56);
                selectFilterScroll(data);

            }
        }
    }

    return (
        <Drawer
            title={innerText.filter}
            width={500}
            className='comp-modal-filter-by'
            onClose={onClose}
            open={visibleFilter}
            bodyStyle={{ paddingBottom: 80 }}
            afterOpenChange={afterVisibleChange}
            extra={<Input value={value} onChange={onSearch} placeholder="Search" style={{ width: 250 }} />}
        >
            <Form layout="vertical" onFinish={onFinish} ref={form}>
                <Row gutter={16} onScroll={onScroll} style={{ maxHeight: (window.innerHeight - 175), overflow: 'auto' }}>
                    <Col span={24} >
                        {filter?.map((val, ind) => (
                            <Form.Item name={["filter", ind]} key={ind} valuePropName="checked" style={{ marginBottom: '20px' }}>
                                <Checkbox value={val.name}>{val.name || '[boş]'}</Checkbox>
                            </Form.Item>
                        ))}
                    </Col>
                </Row>
                {scrollLoad > 0 && <Loading message="Yüklənir..." />}
                <Row align='center' style={{ marginTop: 30, position: 'fixed', bottom: '2%' }}>
                    <Button onClick={clearFilter} type="primary" style={{ marginRight: 5, backgroundColor: '#1d1545' }} icon={<ClearOutlined />}>{innerText.clear_filter_btn}</Button>
                    <Button htmlType="submit" type='primary' className={' '} disabled={disabled} icon={<ClearOutlined />}>{innerText.filtering}</Button>
                    <Button htmlType='reset' type='danger' disabled={disabled} className={style.reset}>{innerText.clear_filter}</Button>

                </Row>

            </Form>
            {/* <Loader loading={isLoad} /> */}

        </Drawer >
    )
}

export default Index