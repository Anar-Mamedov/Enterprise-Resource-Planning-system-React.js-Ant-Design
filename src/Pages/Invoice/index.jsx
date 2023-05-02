import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { PlusOutlined, PrinterOutlined, FileExcelOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Input, Table, Collapse, notification } from 'antd';
import { Sorter, FilterIcon, Loading } from '../../Components'
import { Button as MyButton } from '../../Components'
import API from '../../API'
import { Languages } from "../../Config"
import styles from './style.module.scss'
const { Content } = Layout;
const { Panel } = Collapse;
const { Search } = Input;

const innerText = Languages.SelectLanguage("Invoice")

let isPaginate = true;
let scrollToTop = 0
let initialScrollLoad = 0
let initialData = null
const Index = () => {
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

    const data = [
        {
            uuid: '1',
            key: '1',
            company: 'Resource planning',
            supplier: 'Atgeotech',
            number: '443099',
            type: 'lorem ipsum',
            start_date: '21.02.2023',
            invoice_number: '19912011001',
            invoice_date: '01.04.2022',
            payment_date: '12.04.2022',
            sumAmount: '5564',
            currency: 'AZN',
            status: 'gözləmədə'
        },
        {
            uuid: '2',
            key: '2',
            company: 'Nokia',
            supplier: 'Taiwan llc',
            number: '4220349',
            type: 'lorem ipsum dolor omet',
            start_date: '22.02.2023',
            invoice_number: '6699122301',
            invoice_date: '12.03.2022',
            payment_date: '02.03.2022',
            sumAmount: '8364',
            currency: 'USD',
            status: 'təsdiqlənib'
        },
        {
            uuid: '3',
            key: '3',
            company: 'Ikea',
            supplier: 'Amazon',
            number: '122093',
            type: 'auth',
            start_date: '22.02.2023',
            invoice_number: '49952011001',
            invoice_date: '27.07.2023',
            payment_date: '12.07.2023',
            sumAmount: '5324',
            currency: 'USD',
            status: 'qaralama'
        }
    ]

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
                <FilterIcon onClick={_ => showFilter(0)} />
            </>
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
                <FilterIcon onClick={_ => showFilter(1)} />
            </>
        },
        {
            title: <Sorter title={innerText.table[2]} onClick={() => Sort(2)} />,
            dataIndex: 'number',
            key: 'number',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(2)} />
            </>
        },
        {
            title: <Sorter title={innerText.table[3]} onClick={() => Sort(3)} />,
            dataIndex: 'invoice_number',
            key: 'invoice_number',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(3)} />
            </>
            // render: (text) => <> {text.table_name} </>
        },
        {
            title: <Sorter title={innerText.table[4]} onClick={() => Sort(4)} />,
            dataIndex: 'invoice_date',
            key: 'invoice_date',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 4,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(4)} />
            </>
            // render: (text) => <> {text.table_name} </>
        },
        {
            title: <Sorter title={innerText.table[5]} onClick={() => Sort(5)} />,
            dataIndex: 'payment_date',
            key: 'payment_date',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 5,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(5)} />
            </>
            // render: (text) => <> {text.table_name} </>
        },
        {
            title: <Sorter title={innerText.table[6]} onClick={() => Sort(6)} />,
            dataIndex: 'sumAmount',
            key: 'sumAmount',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 6,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(6)} />
            </>
            // render: (text) => <> {text.table_name} </>
        },
        {
            title: <Sorter title={innerText.table[7]} onClick={() => Sort(7)} />,
            dataIndex: 'currency',
            key: 'currency',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 7,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(7)} />
            </>
            // render: (text) => <> {text.table_name} </>
        },
        {
            title: <Sorter title={innerText.table[8]} onClick={() => Sort(8)} />,
            dataIndex: 'status',
            key: 'status',
            ellipsis: false,
            width: 170,
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 7,
            },
            filterIcon: <>
                <FilterIcon onClick={_ => showFilter(8)} />
            </>
            // render: (text) => <> {text.table_name} </>
        }
    ];
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
    const showFilter = (i) => {

        // showdata.current.view = "single";
        // showdata.current.index = i;
        // if (!showdata.current.filter_by[i]) showdata.current.filter_by[i] = [];
        // setDataFilter(showdata.current)
        setVisibleFilter(true)

    }

    const renderTableView = () => {
        for (let k in showdata.current.sort) {
            if (!showdata.current.sort[k]) delete showdata.current.sort[k]
        }

        // API.Finance.SubKonto.index(JSON.stringify(showdata.current)).then(res => {
        //     if (res.data.status === 200) {
        //         setShowTableData([...res.data.data])
        //         initialData = [...res.data.data]
        //     }
        // })
    }
    const onSelectChange = (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) }
    const changeStatus = (status) => {
        if (selectedRowKeys.length) {
            const params = {
                "uuid": selectedRowKeys,
                "status": status
            };

            API.Finance.SubKonto.activity(params).then(res => {
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
    const Close = () => {
        showdata.current.paginate = 0;
        isPaginate = true;
        renderTableView()
    }
    const inputOnChange = (e) => {
        const value = e.target.value
        showdata.current.search = value
        showdata.current.search_single = value
        setInputValue(value)
        renderTableView()
    }
    const changeView = (status) => {
        setSelectedRowKeys([])
        showdata.current.type = status;
        setActiveView(status)
        clearFilter()
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

    const showDrawer = () => setOpen(true)
    const editRow = (record, rowIndex) => {
        setDataEdit(record)
        setVisibleEdit(true)
    }
    const onClose = () => {
        setOpen(false)
        Close()
    }
    const editClose = () => {
        setVisibleEdit(false)
        Close()
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
    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Row className={styles.tableHeader} justify="end">
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
                                            <Button onClick={_ => changeStatus(1)} type='dashed' size='small'> {innerText.btn_activate} </Button>
                                        ) : (
                                            <Button onClick={_ => changeStatus(0)} type='dashed' size='small'>{innerText.btn_deactivate}</Button>
                                        )
                                    }
                                </Row>
                            ) : null
                        }
                    </Col> */}
                    <Col className={styles.buttonGroup}>
                        {/* <Row className={styles.dataType}>
                            <Button onClick={_ => changeView('active')} className={"activeBtn " + (activeView === 'active' ? activeView : '')}>{innerText.btn_active}</Button>
                            <Button onClick={_ => changeView('deactive')} className={"deactiveBtn " + (activeView === 'deactive' ? 'active' : '')}>{innerText.btn_deactivate}</Button>
                        </Row> */}
                        <MyButton icon={<PrinterOutlined />} />
                        <MyButton icon={<FileExcelOutlined />} />
                        <MyButton onClick={clearFilter} icon={<PlusOutlined />}>{innerText.btn_clear_filter}</MyButton>
                        <MyButton onClick={showDrawer} icon={<PlusOutlined />}>{innerText.btn_new}</MyButton>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Table
                        style={{ width: '98%', cursor: 'pointer' }}
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
                        dataSource={data}
                        rowKey={record => record.uuid}
                        onRow={(record, rowIndex) => ({ onClick: () => activeView === 'active' ? editRow(record, rowIndex) : null })}
                        footer={_ => scrollLoad > 0 && <Loading message={`${innerText.sign_loading}`} />}
                    />
                </Row>
            </Content>
            <Insert
                renderTableView={renderTableView}
                open={open}
                onClose={onClose}
                filters={showdata.current}
            />
            <Filter dataFilter={dataFilter} searchValue={inputValue} visibleFilter={visibleFilter} onClose={onCloseFilter} />
            <Update
                renderTableView={renderTableView}
                open={visibleEdit}
                data={dataEdit}
                onClose={editClose}
                filters={showdata.current}
            />
        </Layout >
    )
}

Index.View = () => <View />

export default Index
