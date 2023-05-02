import React, { useState } from 'react'
import './style.scss'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { PlusOutlined, FilterFilled, PrinterOutlined, FileExcelOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Input, Table, Collapse, } from 'antd';
const { Content } = Layout;
const { Panel } = Collapse;
const { Search } = Input;

const Index = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [open, setOpen] = useState(false)
    const [searchBox, setSearchBox] = useState('')
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [scrollLoad, setScrollLoad] = useState({})
    const [visibleFilter, setVisibleFilter] = useState(false)
    //-----------------------------------------------------------
    const [billStatus, setBillStatus] = useState(true)
    const [appendixStatus, setAppendixStatus] = useState(false)
    //-----------------------------------------------------------
    const [data, setData] = useState([
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: 3,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ])
    const showdata = {
        "search": null,
        "sort": null,
        "paginate": 0,
        "type": "active",
        "filter_by": {},
        "search_single": null,
        "view": "all",
        "index": 1,
        "single_sort": "asc",
        "single_paginate": 0
    };
    const showDrawer = () => setOpen(true)
    const onClose = () => { setOpen(false) }
    const handleReset = (clearFilters) => { clearFilters(); }
    const onSelectChange = (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) }
    const searchBoxOpen = () => { setSearchBox(searchBox === '' ? 'search' : '') }
    const editRow = (record, rowIndex) => {
        setDataEdit(record)
        setVisibleEdit(true)
    }
    const editClose = () => { setVisibleEdit(false) }
    const showFilter = (i) => setVisibleFilter(true)
    const onCloseFilter = () => setVisibleFilter(false)
    const Sort = (index) => { console.log(index) }
    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            ellipsis: false,
            width: 100,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(0)} />
                <FilterFilled onClick={_ => showFilter(0)} />
            </>
        },
        {
            title: 'Sənəd No',
            dataIndex: 'name',
            key: 'name',
            ellipsis: false,
            width: 100,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(1)} />
                <FilterFilled onClick={_ => showFilter(1)} />
            </>
        },
        {
            title: 'Müqavilə No',
            dataIndex: 'age',
            key: 'age',
            ellipsis: false,
            width: 100,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(2)} />
                <FilterFilled onClick={_ => showFilter(2)} />
            </>
        }
    ];
    const handleBillStatus = () => {
        setBillStatus(true)
        setAppendixStatus(false)
    }
    const handleAppendixStatus = () => {
        setBillStatus(false)
        setAppendixStatus(true)
    }
    return (
        <Layout className='page-document-type'>
            <Content className='content'>
                <Row justify='center'>
                    <Row className="table-header" justify="space-between">
                        <Col className='billandappendixParent'>
                            <Button onClick={handleBillStatus} type="primary" className={`billandappendix ${billStatus && 'active'}`}>Müqavilə</Button>
                            <Button onClick={handleAppendixStatus} type="primary" className={`billandappendix ${appendixStatus && 'active'}`}>Əlavə</Button>
                        </Col>
                        <Col className='buttonGroup'>
                            <Row className='dataType'>
                                <Button type="primary" className="activeBtn">Active</Button>
                                <Button type="primary" className="deactiveBtn">Deactive</Button>
                            </Row>
                            <Button type="primary" icon={<PrinterOutlined />} className="print"></Button>
                            <Button type="primary" icon={<FileExcelOutlined />} className="excel"></Button>
                            <Button onClick={showDrawer} className="new" icon={<PlusOutlined />}>Yeni</Button>
                        </Col>
                    </Row>
                </Row>
                <Row className='search' justify='center'>
                    <Collapse style={{ width: '98%' }} activeKey={searchBox}>
                        <Panel showArrow={false} key="search">
                            <Search placeholder="input search text" enterButton="Search" size="large" loading />
                        </Panel>
                    </Collapse>
                </Row>
                <Row justify='center'>
                    <Table
                        style={{ width: '98%', cursor: 'pointer' }}
                        size="small"
                        filterMultiple={true}
                        scroll={{
                            x: 750,
                            y: window.innerHeight - 220 - scrollLoad
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedRowKeys,
                            onChange: onSelectChange
                        }}
                        pagination={false}
                        columns={columns}
                        dataSource={data}
                        rowKey={record => record.id}
                        onRow={(record, rowIndex) => ({ onClick: () => editRow(record, rowIndex) })}
                    />
                </Row>
            </Content>
            <Insert open={open} onClose={onClose} billStatus={billStatus} appendixStatus={appendixStatus} />
            <Filter visibleFilter={visibleFilter} onClose={onCloseFilter} />
            <Update
                open={visibleEdit}
                data={dataEdit}
                onClose={editClose}
                billStatus={billStatus}
                appendixStatus={appendixStatus}
            />
        </Layout >
    )
}

Index.View = () => <View />

export default Index