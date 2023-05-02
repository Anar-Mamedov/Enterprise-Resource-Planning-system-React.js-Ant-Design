import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter';
// import CollapseSearch from '../../Components/SearchBox/style'
import { PlusOutlined, FilterFilled, PrinterOutlined, FileExcelOutlined, ClearOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Table, notification, Input, Space, Form } from 'antd';
import Sorter from '../../Components/Sorter'
import API from '../../API'
import { Loading } from '../../Components';
import { BillTableContext } from './Context/context';
import { BiSearchAlt } from 'react-icons/bi'
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("Bill")
const { Content } = Layout;
let isPaginate = true;
let scrollToTop = 0
let initialScrollLoad = 0
let initialData = null

const Index = () => {
    const [fromRef] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [open, setOpen] = useState(false)
    const [updateId, setUpdateId] = useState(null)
    const [searchBox, setSearchBox] = useState('')
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [scrollLoad, setScrollLoad] = useState(0)
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [showTableData, setShowTableData] = useState([]);
    const [dataFilter, setDataFilter] = useState(null);
    const [activeView, setActiveView] = useState('active')
    const [searchValue, setSearchValue] = useState(null)
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
    const handleReset = (clearFilters) => { clearFilters(); }
    const onSelectChange = (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) }
    const searchBoxOpen = () => { setSearchBox(searchBox === '' ? 'search' : '') }
    const editRow = (record, rowIndex) => {
        setDataEdit(record)
        setVisibleEdit(true)
        setUpdateId(record.uuid)
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
    const sort = (i) => {
        const { sort } = showdata.current;
        console.log('sort', sort)
        if (sort) {
            let val = sort[i];
            switch (val) {
                case 'desc': val = 'asc';
                    break;
                case 'asc': val = null;
                    break;
                default: val = 'desc'
            }
            sort[i] = val;
            showdata.current.sort = sort;
        } else {
            const key = i;
            showdata.current.sort = { [key]: "asc" };
        }

        for (let i = 0; i < showdata.current.paginate; i++) {
            if (showdata.current.paginate !== 0) showdata.current.paginate = 0
        }
        isPaginate = true;
        renderTableView()
    }
    const columns = [
        {
            title: `${innerText.table[0]}`,
            dataIndex: 'index',
            key: "index",
            ellipsis: false,
            width: 60,
            align: 'center',
        },
        {
            title: <Sorter title={innerText.table[1]} onClick={() => sort(0)} />,
            dataIndex: 'transaction',
            key: 'transaction',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 2,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(0)} />
            </>,
            render: (text) => <> {text?.name} </>
        },
        {
            title: <Sorter title={innerText.table[2]} onClick={() => sort(1)} />,
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
            render: (text) => <> {text?.name} </>
        },
        {
            title: <Sorter title={innerText.table[3]} onClick={() => sort(2)} />,
            dataIndex: 'billed_date',
            key: 'billed_date',
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
            title: <Sorter title={innerText.table[4]} onClick={() => sort(3)} />,
            dataIndex: 'accounting_date',
            key: 'accounting_date',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 4,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(3)} />
            </>
        },
        {
            title: <Sorter title={innerText.table[5]} onClick={() => sort(4)} />,
            dataIndex: 'payment_income_date',
            key: 'payment_income_date',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 5,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(4)} />
            </>
        },
        {
            title: <Sorter title={innerText.table[6]} onClick={() => sort(5)} />,
            dataIndex: 'total_amount',
            key: 'total_amount',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 6,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(5)} />
            </>
        },
        {
            title: <Sorter title={innerText.table[7]} onClick={() => sort(6)} />,
            dataIndex: 'transaction',
            key: 'transaction',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 7,
            },
            filterIcon: <>
                <FilterFilled onClick={_ => showFilter(6)} />
            </>,
            render: (text) => <> {text?.status_type?.name} </>
        }
    ];
    const renderTableView = () => {
        for (let k in showdata.current.sort) {
            if (!showdata.current.sort[k]) delete showdata.current.sort[k]
        }
        API.Finance.Bill.index(JSON.stringify(showdata.current)).then(res => {
            if (res.data.status === 200) {
                setShowTableData([...res.data.data])
                initialData = [...res.data.data]
            }
        })
    }
    const renderScrollTableView = () => {
        API.Finance.Bill.index(JSON.stringify(showdata.current)).then(res => {
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
        fromRef.setFieldValue('searchName', '')
        showdata.current.filter_by = {};
        isPaginate = true
        for (let i = 0; i < showdata.current.paginate; i++) {
            if (showdata.current.paginate !== 0) showdata.current.paginate = 0
        }
        setSearchValue('')
        showdata.current.search = null
        renderTableView()
        document.querySelector('.ant-table-body').scrollTo(0, 0);
    }
    // const changeStatus = (status) => {
    //     if (selectedRowKeys.length) {
    //         const params = {
    //             "uuids": selectedRowKeys,
    //             "status": status
    //         };
    //         API.Finance.Bill.activity(params).then(res => {
    //             if (res.status == 200) {
    //                 notification.success({ key: 1, message: 'Status mesaj', description: res.data.messages });
    //                 setSelectedRowKeys([])
    //                 Close();
    //             }
    //         })
    //     } else {
    //         notification.warning({ key: 2, message: 'Status mesaj', description: "Zəhmət olmazsa müqavilə seçin" });
    //     }
    // }

    // const changeView = (status) => {
    //     setSelectedRowKeys([])
    //     showdata.current.type = status;
    //     setActiveView(status)
    //     clearFilter()
    // }
    const inputOnChange = (e) => {
        const value = e.target.value
        showdata.current.search = value
        showdata.current.search_single = value
        showdata.current.paginate = 0
        setSearchValue(value)
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
    const data = {
        open, onClose, loading, setLoading, dataFilter,
        searchValue, visibleFilter, onCloseFilter, visibleEdit,
        updateId, setUpdateId, editClose, loading, setLoading
    }
    return (
        <BillTableContext.Provider value={data}>
            {/* ${styles.layout} */}
            <Form form={fromRef}>
                <Layout className='c-wrapper'>
                    <Content>
                        {/* {styles.tableHeader} */}
                        <Row className='c-table-header' justify="space-between" align='middle'>
                            {/* <Col className={styles.patchTableView}>
                            {
                                selectedRowKeys.length ? (
                                    <Row
                                        style={{
                                            width: 'auto', height: 'auto', gap: '5px'
                                        }}
                                        justify='right'
                                    >
                                        {
                                            activeView === 'deactive' ? (
                                                <Button onClick={_ => changeStatus(1)} type='dashed' size='small'>Aktiv et</Button>
                                            ) : (
                                                <Button onClick={_ => changeStatus(0)} type='dashed' size='small'>Deaktiv et</Button>
                                            )
                                        }
                                    </Row>
                                ) : null
                            }
                        </Col> */}
                            <Col>
                                <Form.Item name='searchName'>
                                    <Input placeholder={innerText?.tableSearchPlaceholder} className='c-input c-input--solid' onChange={inputOnChange} prefix={<BiSearchAlt />} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Space>
                                    {/* <Button onClick={searchBoxOpen} className={styles.none} icon={<SearchOutlined />} /> */}
                                    {/* <Row>
                                    <Button onClick={_ => changeView('active')} className={'active-button' + ' ' + (activeView === 'active' ? 'active' : '')}>Aktiv</Button>
                                    <Button onClick={_ => changeView('deactive')} className={'deactive-button' + ' ' + (activeView === 'deactive' ? 'active' : '')}>Deaktiv</Button>
                                </Row> */}
                                    <Button className="c-btn c-btn--icon c-btn--excel"><FileExcelOutlined /></Button>
                                    <Button className="c-btn c-btn--icon c-btn-outline-secondary"><PrinterOutlined /></Button>
                                    <Button className='c-btn c-btn--purple' onClick={clearFilter} icon={<ClearOutlined />}>{innerText?.clearFilterBtnTable}</Button>
                                    <Button className='c-btn c-btn--primary' type='primary' onClick={showDrawer} icon={<PlusOutlined />}>{innerText?.new_btn}</Button>
                                </Space>
                            </Col>
                        </Row>
                        {/* <Row className={styles.search} justify='center'>
                        <Col span={24}>
                            <CollapseSearch tagKey="search" showArrow={false} onChange={inputOnChange} activeKey={searchBox} />
                        </Col>
                    </Row> */}
                        {/* <Row justify='center'> */}
                        <Table
                            className='c-table'
                            rowClassName={(record, index) => {
                                if (index % 2 !== 0) return 'bg-table-splitted c-table-body'
                                return 'c-table-body'
                            }}
                            style={{ width: '98%', cursor: 'pointer' }}
                            size="small"
                            filterMultiple={true}
                            scroll={{
                                x: 750,
                                y: window.innerHeight - 220 - scrollLoad,
                                // scrollToFirstRowOnChange: scrollToFirstRow
                            }}
                            rowSelection={{
                                type: 'checkbox',
                                hideSelectAll: true,
                                getCheckboxProps: (record) => ({
                                    style: {
                                        display: 'none',
                                    },
                                }),
                                selectedRowKeys: selectedRowKeys,
                                onChange: onSelectChange
                            }}
                            // scrollToFirstRowOnChange={true}
                            pagination={false}
                            columns={columns}
                            dataSource={initialData}
                            rowKey={record => record.uuid}
                            onRow={(record, rowIndex) => ({ onClick: () => activeView === 'active' ? editRow(record, rowIndex) : null })}
                            loading={loading}
                            footer={_ => scrollLoad > 0 && <Loading message="Yüklənir..." />}
                        />
                        {/* </Row> */}
                    </Content>
                    <Insert />
                    <Filter />
                    <Update />
                </Layout >
            </Form>
        </BillTableContext.Provider>
    )
}
Index.View = () => <View />
export default Index