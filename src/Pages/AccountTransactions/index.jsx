import React, { useState, useEffect, useRef } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { Excel } from "antd-table-saveas-excel";
import {
    PlusOutlined, FilterFilled, PrinterOutlined,
    FileExcelOutlined, SortDescendingOutlined, SearchOutlined
} from '@ant-design/icons';
import {
    Layout, Row,
    Col, Button, Input,
    Table, Collapse, Typography
} from 'antd';
import API from '../../API'
import { Loading, Sorter, Button as MyButton, Status } from '../../Components';
import styles from "./style.module.scss"
import CollapseSearch from '../../Components/SearchBox/style'
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("AccountTransactions")
const { Text } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;
const { Search } = Input;

let isPaginate = true;
let scrollToTop = 0
let initialScrollLoad = 0
let initialData = null

const Index = () => {
    const [open, setOpen] = useState(false);
    const [searchBox, setSearchBox] = useState('');
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [scrollLoad, setScrollLoad] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [showTableData, setShowTableData] = useState([]);
    const [dataFilter, setDataFilter] = useState(null);
    const [visibleFilter, setVisibleFilter] = useState(false)
    const [inputValue, setInputValue] = useState(null)
    const [activeView, setActiveView] = useState('active')

    const showdata = useRef({
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
    });
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
    const showFilter = (i) => {

        showdata.current.view = "single";
        showdata.current.index = i;

        if (!showdata.current.filter_by[i]) showdata.current.filter_by[i] = [];

        setDataFilter(showdata.current)
        setVisibleFilter(true)
    }
    const searchBoxOpen = () => { setSearchBox(searchBox === '' ? 'search' : '') }

    const columns = [
        {
            title: <Sorter title={innerText.table[0]} onClick={() => Sort(0)} />,
            dataIndex: 'date',
            ellipsis: false,
            width: 170,
            key: 'date',
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 0,
            },
            filterIcon: (
                <>
                    <FilterFilled onClick={_ => showFilter(0)} />
                </>
            )
        },
        {
            title: <Sorter title={innerText.table[1]} onClick={() => Sort(1)} />,
            dataIndex: 'description',
            ellipsis: false,
            width: 170,
            key: 'description',
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 1,
            },
            filterIcon: (
                <>
                    <FilterFilled onClick={_ => showFilter(1)} />
                </>
            )
        },
        {
            title: <Sorter title={innerText.table[2]} onClick={() => Sort(2)} />,
            dataIndex: 'transaction',
            ellipsis: false,
            width: 170,
            key: 'transaction',
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 2,
            },
            filterIcon: (
                <>
                    <FilterFilled onClick={_ => showFilter(2)} />
                </>

            ),
            render: (d) => <Status name={d?.status_type?.key} title={d?.status_type?.name} />
            // render: (d) => <Text> {d?.status_type?.name} </Text>,
        },
        {
            title: <Sorter title={innerText.table[3]} onClick={() => Sort(3)} />,
            dataIndex: 'sum_amount',
            ellipsis: false,
            width: 170,
            key: 'sum_amount',
            align: 'center',
            filterDropdown: true,
            sorter: {
                multiple: 3,
            },
            filterIcon: (
                <>
                    <FilterFilled onClick={_ => showFilter(3)} />
                </>
            )
            // render: (d) => <Text> {d?.status_type?.name} </Text>,
        }
    ];

    const renderView = () => {
        API.Finance.AccountTransactions.index(JSON.stringify(showdata.current)).then(res => {
            if (res.data.status === 200) {
                setShowTableData([...res.data.data])
                initialData = [...res.data.data]
            }
        })
    }

    const renderTableView = () => {
        for (let k in showdata.current.sort) {
            if (!showdata.current.sort[k]) delete showdata.current.sort[k]
        }
        // e2c9ca11-cc72-11ed-a7f2-00155d0a970a
        renderView()
    }

    const editRow = (record, rowIndex) => {
        // setTrUuid()
        // console.log(record);
        setDataEdit(record)
        setVisibleEdit(true)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys)
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

    const editClose = () => {
        setVisibleEdit(false)
        showdata.paginate = 0;
        isPaginate = true;
        changeView('active')
    }


    const onClose = () => {
        setOpen(false)
        showdata.paginate = 0;
        isPaginate = true;
        changeView('active')
    }

    const showDrawer = () => {
        setOpen(true)
    }


    const changeView = (status) => {
        showdata.current.type = status;
        setActiveView(status)
        clearFilter()
    }

    const SaveExcel = () => {
        // const excel = new Excel();
        // excel
        //     .addSheet("hesab-emeliyyalari")
        //     .addColumns(columns)
        //     .addDataSource(showTableData, { str2Percent: true })
        //     .saveAs("hesab-emeliyyatlari");
    }

    const convertToNull = (obj) => {
        for (let i in obj) {
            if (typeof obj[i] !== 'object') obj[i] = obj[i] === undefined ? null : obj[i];
            else convertToNull(obj[i])
        }
        return obj;
    }
    const Sort = (index) => {
        const { sort } = showdata.current;
        if (sort) {
            let val = sort[index];
            switch (val) {
                case 'desc': val = 'asc'; break;
                case 'asc': val = null; break;
                default: val = 'desc';
            }
            sort[index] = val;
            showdata.current.sort = sort;
        } else {
            const key = index;
            showdata.current.sort = { [key]: "desc" };
        }

        for (let i = 0; i < showdata.current.paginate; i++) {
            if (showdata.current.paginate !== 0) showdata.current.paginate = 0
        }
        isPaginate = true;
        renderTableView();
    }

    const renderScrollTableView = () => {
        API.Finance.AccountTransactions.index(JSON.stringify(showdata.current)).then(res => {
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

    const inputOnChange = (e) => {
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
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Row className={styles.tableHeader} justify="space-between">
                    <Col>
                    </Col>
                    <Col className={styles.buttonGroup}>
                        <MyButton onClick={searchBoxOpen} icon={<SearchOutlined />} />
                        <MyButton icon={<PrinterOutlined />}></MyButton>
                        <MyButton onClick={SaveExcel} icon={<FileExcelOutlined />}></MyButton>
                        <MyButton onClick={clearFilter} icon={<PlusOutlined />}>{innerText.btn_clear_filter}</MyButton>
                        <MyButton onClick={showDrawer} icon={<PlusOutlined />}>{innerText.btn_new}</MyButton>
                    </Col>
                </Row>
                <Row className={styles.search} justify='center'>
                    <CollapseSearch tagKey="search" showArrow={false} onChange={inputOnChange} activeKey={searchBox} />
                    {/* <Collapse style={{ width: '98%' }} activeKey={searchBox}>
                        <Panel showArrow={false} key="search">
                            <Search onChange={inputOnChange} placeholder="input search text" enterButton="Search" size="large" loading={false} />
                        </Panel>
                    </Collapse> */}
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
                        // rowSelection={{
                        //     selectedRowKeys: selectedRowKeys,
                        //     onChange: onSelectChange
                        // }}
                        pagination={false}
                        columns={columns}
                        dataSource={showTableData}
                        rowKey={record => record.uuid}
                        onRow={(record, rowIndex) => ({ onClick: () => editRow(record, rowIndex) })}
                        footer={_ => scrollLoad > 0 && <Loading message={innerText.sign_loading} />}
                    />
                </Row>
            </Content>
            <Insert
                convertToNull={convertToNull}
                open={open}
                onClose={onClose}
                renderView={renderView}
            />
            <Update
                convertToNull={convertToNull}
                open={visibleEdit}
                data={dataEdit}
                onClose={editClose}
                renderView={renderView}
            />
            <Filter dataFilter={dataFilter} searchValue={inputValue} visibleFilter={visibleFilter} onClose={onCloseFilter} />
        </Layout >
    )
}

Index.View = () => <View />

export default Index
