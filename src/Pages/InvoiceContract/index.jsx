import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { PlusOutlined, FilterFilled, PrinterOutlined, FileExcelOutlined, ClearOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Input, Table, Collapse, notification, Space, Typography } from 'antd';
import Sorter from '../../Components/Sorter'
import API from '../../API'
import { Loading, Button as MyButton } from '../../Components';
import { BiSearchAlt } from 'react-icons/bi'
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("InvoiceContract")
const { Content } = Layout;
const { Panel } = Collapse;
const { Search } = Input;
const { Text } = Typography;
let isPaginate = true;
let scrollToTop = 0
let initialScrollLoad = 0
let initialData = null

const Index = () => {
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [open, setOpen] = useState(false)
    const [searchBox, setSearchBox] = useState('')
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [scrollLoad, setScrollLoad] = useState(0)
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [showTableData, setShowTableData] = useState([]);
    const [dataFilter, setDataFilter] = useState(null);
    const [activeView, setActiveView] = useState('active')
    const [inputValue, setInputValue] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const showdata = useRef({
        "search": null,
        "sort": null,
        "paginate": 0,
        "type": "active",
        "filter_by": {},
        "search_single": null,
        "view": "all",
        "index": 0,
        "single_sort": "asc",
        "single_paginate": 0
    });
    const showDrawer = () => setOpen(true)
    const onClose = () => {
        setOpen(false)
        Close()
    }
    // const handleReset = (clearFilters) => { clearFilters(); }
    const onSelectChange = (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) }
    // const searchBoxOpen = () => { setSearchBox(searchBox === '' ? 'search' : '') }
    const editRow = (record, rowIndex) => {
        setUpdateId(record?.uuid);
        setDataEdit(record)
        setVisibleEdit(true)
    }
    const editClose = () => {
        setVisibleEdit(false)
        Close()
    }
    const showFilter = (i) => {
        showdata.current.view = "single";
        showdata.current.index = i;
        if (!showdata.current.filter_by[i]) showdata.current.filter_by[i] = [];
        setDataFilter(showdata.current)

        setVisibleFilter(true)
    }
    const onCloseFilter = (filter) => {
        setVisibleFilter(false)

        showdata.current.view = "all";

        if (Array.isArray(filter)) {
            const { index } = showdata.current;
            showdata.current.paginate = 0;
            isPaginate = true;
            showdata.current.filter_by[index] = filter;
            renderTableView()
        }
    }
    const Sort = (i) => {
        const { sort } = showdata.current;
        if (sort) {
            let val = sort[i];
            switch (val) {
                case 'desc': val = 'asc'; break;
                case 'asc': val = null; break;
                default: val = 'desc';
            }
            sort[i] = val;
            showdata.current.sort = sort;
        } else {
            const key = i;
            showdata.current.sort = { [key]: "desc" };
        }

        for (let i = 0; i < showdata.current.paginate; i++) {
            if (showdata.current.paginate !== 0) showdata.current.paginate = 0
        }
        isPaginate = true;
        renderTableView()
    }
    const filterClose = (filter) => {

        showdata.current.view = "all";

        if (Array.isArray(filter)) {
            const { index } = showdata.current;
            showdata.current.paginate = 0;
            isPaginate = true;
            showdata.current.filter_by[index] = filter;
            renderTableView()
        }
    }
    const columns = [
        {
            title: <Sorter title={innerText.table[0]} onClick={() => Sort(0)} />,
            dataIndex: 'company',
            key: "company",
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 1,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(0)} />
            </>,
            render: (text) => <> {text?.name} </>
        },
        {
            title: <Sorter title={innerText.table[1]} onClick={() => Sort(1)} />,
            dataIndex: 'supplier',
            key: 'supplier',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 2,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(1)} />
            </>,
            render: (text) => <> {text?.name}</>
        },
        {
            title: <Sorter title={innerText.table[2]} onClick={() => Sort(2)} />,
            dataIndex: 'contract_no',
            key: 'contract_no',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(2)} />
            </>
        },
        {
            title: <Sorter title={innerText.table[3]} onClick={() => Sort(3)} />,
            dataIndex: 'contract_type',
            key: 'contract_type',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(3)} />
            </>,
            render: (text) => <> {text?.name}</>
        },
        {
            title: <Sorter title={innerText.table[4]} onClick={() => Sort(4)} />,
            dataIndex: 'start_date',
            key: 'start_date',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(4)} />
            </>,
        },
        {
            title: <Sorter title={innerText.table[5]} onClick={() => Sort(5)} />,
            dataIndex: 'end_date',
            key: 'end_date',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(5)} />
            </>,
        },
        {
            title: <Sorter title={innerText.table[6]} onClick={() => Sort(6)} />,
            dataIndex: 'total_amount',
            key: 'total_amount',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(6)} />
            </>,
        },
        {
            title: <Sorter title={innerText.table[7]} onClick={() => Sort(7)} />,
            dataIndex: 'transaction',
            key: 'transaction',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(7)} />
            </>,
            render: (text) => <> {text?.status_type?.name} </>
        },
    ];
    const renderTableView = () => {
        for (let k in showdata.current.sort) {
            if (!showdata.current.sort[k]) delete showdata.current.sort[k]
        }
        API.Acc.FacturaContract.index(JSON.stringify(showdata.current)).then(res => {
            setLoading(true)
            if (res.data.status === 200) {
                setLoading(false)
                setShowTableData([...res.data.data])
                initialData = [...res.data.data]
            }
        })
    }
    const renderScrollTableView = () => {
        setLoading(true)
        API.Acc.FacturaContract.index(JSON.stringify(showdata.current)).then(res => {
            setLoading(false)
            const data = res.data.data
            if (data.length) {
                setShowTableData([...initialData, ...data])
                initialData = [...initialData, ...data]
                isPaginate = true
            }
            initialScrollLoad = 0
            setScrollLoad(0)
        })
    }
    const Close = () => {
        showdata.current.paginate = 0;
        isPaginate = true;
        renderTableView()
    }
    const clearFilter = () => {
        showdata.current.filter_by = {};
        isPaginate = true
        for (let i = 0; i < showdata.current.paginate; i++) {
            if (showdata.current.paginate !== 0) showdata.current.paginate = 0
        }
        setInputValue('')
        showdata.current.search = null
        renderTableView()
        document.querySelector('.ant-table-body').scrollTo(0, 0);
    }
    const changeStatus = (status) => {
        if (selectedRowKeys.length) {
            const params = {
                "uuids": selectedRowKeys,
                "status": status
            };
            API.Acc.FacturaContract.activity(params).then(res => {
                if (res.status == 200) {
                    notification.success({ key: 1, message: 'Status mesaj', description: res.data.messages });
                    setSelectedRowKeys([])
                    Close();
                }
            })
        } else {
            notification.warning({ key: 2, message: 'Status mesaj', description: "Zəhmət olmazsa müqavilə seçin" });
        }
    }
    const changeView = (status) => {
        setSelectedRowKeys([])
        showdata.current.type = status;
        setActiveView(status)
        clearFilter()
    }
    const inputOnChange = (e) => {
        // console.log(dataFilter)
        const value = e.target.value
        showdata.current.search = value
        showdata.current.search_single = value
        setInputValue(value)
        renderTableView()
    }
    useEffect(() => {
        renderTableView()
        const table = document.querySelector('.ant-table-body');
        table.addEventListener('scroll', (e) => {
            const { scrollHeight, scrollTop, clientHeight } = e.target;
            if (scrollToTop != scrollTop) {
                scrollToTop = scrollTop;
                const bottom = scrollHeight - scrollTop - clientHeight;
                if (bottom <= 10 && isPaginate) {
                    showdata.current.paginate++;
                    isPaginate = false;
                    const scrollToLoad = 72
                    initialScrollLoad = 72
                    setScrollLoad(scrollToLoad)
                    renderScrollTableView()
                }
            }
        });
    }, [])
    return (
        <Layout className='c-wrapper'>
            <Content style={{ position: 'relative' }}>
                {selectedRowKeys.length > 0 &&
                    <Row className='status-box'>
                        <Col>
                            <Text className='status-box__text'>{selectedRowKeys.length} {innerText.data_selected}</Text>
                        </Col>
                        <Col>
                            <Button onClick={() => changeStatus(activeView === 'active' ? 0 : 1)} type="primary" className={`c-btn ${activeView === 'active' ? 'c-btn--danger' : 'c-btn--success'}`}>
                                {activeView === 'active' ? innerText.btn_deactivate : innerText.btn_activate}
                            </Button>
                        </Col>
                    </Row>
                }
                <Row className='c-table-header' justify='space-between' align='middle'>
                    <Col>
                        <Input className='c-input c-input--solid' value={inputValue} onChange={inputOnChange} prefix={<BiSearchAlt />} placeholder={innerText.search_placeholder} />
                    </Col>
                    <Col>
                        <Space>
                            {/* <Button onClick={searchBoxOpen} className={styles.none} icon={<SearchOutlined />} /> */}
                            <Row>
                                <Button onClick={_ => changeView('active')} className={'active-button' + ' ' + (activeView === 'active' ? 'active' : '')}>{innerText.btn_active}</Button>
                                <Button onClick={_ => changeView('deactive')} className={'deactive-button' + ' ' + (activeView === 'deactive' ? 'active' : '')}>{innerText.btn_deactive}</Button>
                            </Row>
                            <Button className='c-btn c-btn--icon c-btn--excel'><FileExcelOutlined /></Button>
                            <Button className='c-btn c-btn--icon c-btn-outline-secondary' ><PrinterOutlined /></Button>
                            <Button className='c-btn c-btn--purple' onClick={clearFilter} icon={<ClearOutlined />}>{innerText.btn_clear_filter}</Button>
                            <Button className='c-btn c-btn--primary' type='primary' onClick={showDrawer} icon={<PlusOutlined />}>{innerText.btn_new}</Button>
                        </Space>
                    </Col>
                </Row>
                {/* </Row> */}
                {/* <Row className={styles.search} justify='center'>
               <Collapse style={{ width: '98%' }} activeKey={searchBox}>
                  <Panel showArrow={false} key="search">
                     <Search value={inputValue} onChange={inputOnChange} placeholder="input search text" enterButton="Search" size="large" loading />
                  </Panel>
               </Collapse>
            </Row> */}
                <Table
                    className='c-table'
                    rowClassName={(record, index) => {
                        if (index % 2 !== 0) return 'bg-table-splitted c-table-body'
                        return 'c-table-body'
                    }}
                    size="small"
                    filterMultiple={true}
                    scroll={{
                        x: 750,
                        y: window.innerHeight - 220 - scrollLoad,
                        // scrollToFirstRowOnChange: scrollToFirstRow
                    }}
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        onChange: onSelectChange
                    }}
                    // scrollToFirstRowOnChange={true}
                    pagination={false}
                    columns={columns}
                    dataSource={initialData}
                    rowKey={record => record.uuid}
                    onRow={(record, rowIndex) => ({ onClick: () => activeView === 'active' ? editRow(record, rowIndex) : null })}
                    footer={_ => scrollLoad > 0 && <Loading message={innerText.sign_loading} />}
                    loading={loading}
                />
            </Content>
            <Insert
                renderTableView={renderTableView}
                open={open}
                onClose={onClose}
                filters={showdata.current}
                loading={loading}
                setLoading={setLoading}
            />
            <Filter dataFilter={dataFilter} searchValue={inputValue} visibleFilter={visibleFilter} onClose={onCloseFilter} />
            <Update
                updateId={updateId}
                setUpdateId={setUpdateId}
                renderTableView={renderTableView}
                open={visibleEdit}
                // data={dataEdit}
                onClose={editClose}
                filters={showdata.current}
                loading={loading}
                setLoading={setLoading}
            />
        </Layout >
    )
}

Index.View = () => <View />

export default Index
