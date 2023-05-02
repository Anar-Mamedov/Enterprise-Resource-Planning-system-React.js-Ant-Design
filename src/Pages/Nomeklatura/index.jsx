import React, { useState } from 'react'
import './style.scss'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter';
import { PlusOutlined, FilterFilled, PrinterOutlined, FileExcelOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Input, Table, Collapse } from 'antd';
const { Content } = Layout;
const { Panel } = Collapse;
const { Search } = Input;
const Index = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [open, setOpen] = useState(false)
    const [searchBox, setSearchBox] = useState('')
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [scrollLoad, setScrollLoad] = useState(0)
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [tableButtonStatus, setTableButtonStatus] = useState(1)
    const [data, setData] = useState([
        {
            key: '1',
            id: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            id: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            id: 3,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ])
    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
    const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);
    const editClose = () => setVisibleEdit(false);
    const showFilter = (i) => setVisibleFilter(true);
    const onCloseFilter = () => setVisibleFilter(false);
    const Sort = (i) => console.log(i);
    const editRow = (record, rowIndex) => {
        setDataEdit(record)
        setVisibleEdit(true)
    }
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            id: 1,
            ellipsis: false,
            width: 30,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(0)} />
            </>
        },
        {
            title: 'Sənəd nömrəsi',
            dataIndex: 'name',
            key: 'name',
            id: 2,
            ellipsis: false,
            width: 100,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(1)} />
                <FilterFilled onClick={_ => showFilter(0)} />
            </>
        },
        {
            title: 'Təchizatçı',
            dataIndex: 'age',
            key: 'age',
            id: 3,
            ellipsis: false,
            width: 100,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(2)} />
                <FilterFilled onClick={_ => showFilter(1)} />
            </>
        },
        {
            title: 'Öhdəlik tarixi',
            dataIndex: 'address',
            key: 'address',
            id: 4,
            ellipsis: false,
            width: 120,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(3)} />
                <FilterFilled onClick={_ => showFilter(2)} />
            </>
        },
        {
            title: 'Ödənişin qəbul tarixi',
            dataIndex: 'sub_account_3',
            ellipsis: false,
            width: 120,
            id: 5,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(4)} />
                <FilterFilled onClick={_ => showFilter(3)} />
            </>
        },
        {
            title: 'Total məbləğ',
            dataIndex: 'account_type',
            ellipsis: false,
            width: 90,
            id: 6,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(5)} />
                <FilterFilled onClick={_ => showFilter(4)} />
            </>
        },
        {
            title: 'Status',
            dataIndex: 'article',
            ellipsis: false,
            width: 60,
            id: 7,
            align: 'center',
            filterDropdown: true,
            filterIcon: <>
                <SortDescendingOutlined className='sortIcon' onClick={() => Sort(6)} />
                <FilterFilled onClick={_ => showFilter(5)} />
            </>
        }
    ];
    const handleTableButton = (statusNum) => setTableButtonStatus(statusNum);
    return (
        <Layout className='page-document-type'>
            <Content className='content'>
                <Row className="table-header" justify="space-between">
                    <Col span={16} style={{ display: 'flex', gap: '20px' }}>
                        <Button style={{ width: '25%', fontSize: '12px' }} type={`${tableButtonStatus === 1 ? 'primary' : ''}`} onClick={() => handleTableButton(1)}>Maliyyə uçotu</Button>
                        <Button style={{ width: '25%', fontSize: '12px' }} type={`${tableButtonStatus === 2 ? 'primary' : ''}`} onClick={() => handleTableButton(2)}>Vergi uçotu</Button>
                        <Button style={{ width: '25%', fontSize: '12px' }} type={`${tableButtonStatus === 3 ? 'primary' : ''}`} onClick={() => handleTableButton(3)}>ƏDV uçot hesabları</Button>
                        <Button style={{ width: '25%', fontSize: '12px' }} type={`${tableButtonStatus === 4 ? 'primary' : ''}`} onClick={() => handleTableButton(4)}>Sifarişçinin materiallarının uçot hesabı</Button>
                    </Col>
                    <Col className='buttonGroup'>
                        <Row style={{ marginRight: '.5rem' }} className='dataType'>
                            <Button style={{ width: '8rem' }} type="primary" className="activeBtn">Active</Button>
                            <Button style={{ width: '8rem' }} type="primary" className="deactiveBtn">Deactive</Button>
                        </Row>
                        <Button type="primary" icon={<PrinterOutlined />} className="print"></Button>
                        <Button type="primary" icon={<FileExcelOutlined />} className="excel"></Button>
                        <Button onClick={showDrawer} className="new" icon={<PlusOutlined />}>Yeni</Button>
                    </Col>
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
            <Insert open={open} onClose={onClose} />
            <Filter visibleFilter={visibleFilter} onClose={onCloseFilter} />
            <Update
                open={visibleEdit}
                data={dataEdit}
                onClose={editClose}
            />
        </Layout >
    )
}
Index.View = () => <View />;
export default Index;