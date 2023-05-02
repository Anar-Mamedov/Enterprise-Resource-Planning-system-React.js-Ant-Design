import React, { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { Excel } from "antd-table-saveas-excel";
import {
    PlusOutlined, FilterOutlined, PrinterOutlined,
    FileExcelOutlined, CheckOutlined,
    CloseOutlined, ClearOutlined
} from '@ant-design/icons';
import Sorter from '../../Components/Sorter'
import { BiSearchAlt } from 'react-icons/bi'
import {
    Layout, Row,
    Col, Button, Input,
    Table, Typography,Space
} from 'antd';
import { Languages } from "../../Config";
import Loader from '../../Components/Loader';
import API from '../../API'

const { Content } = Layout;
const { Text } = Typography
let isPaginate = true;
const innerText = Languages.SelectLanguage("ChartOfAccount");


const Index = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchBox, setSearchBox] = useState('');
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [scrollLoad, setScrollLoad] = useState(0);
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [showTableData, setShowTableData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [status, setStatus] = useState('active');

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

    const showDrawer = () => { setOpen(true) }

    const onClose = () => {
        setOpen(false)
        showdata.current.paginate = 0;
        isPaginate = true;
        changeView('active')
        showDataTable()
    }

    const onSelectChange = (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) }

    const searchBoxOpen = () => { setSearchBox(searchBox === '' ? 'search' : '') }

    const editRow = (record, rowIndex) => {
        setDataEdit(record)
        if (showdata.current.type === "active") {
            setVisibleEdit(true)
        } else {
            setVisibleEdit(false)
        }
    }

    const editClose = () => {
        setVisibleEdit(false)
        showDataTable()
    }

    const SaveExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("chart-of-account")
            .addColumns(columns)
            .addDataSource(showTableData, { str2Percent: true })
            .saveAs("chart-of-account.xlsx");
    }

    const columns = [
        {
            dataIndex: 'number',
            ellipsis: false,
            width: 170,
            align: 'center',
            sorter: {
                multiple: 0
            },
            filterDropdown: true,
            title: <Sorter title={innerText.table[0]} onClick={_ => sorter(0)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(0)} />
        },
        {
            dataIndex: 'name',
            ellipsis: false,
            width: 230,
            align: 'center',
            sorter: {
                multiple: 1
            },
            filterDropdown: true,
            title: <Sorter title={innerText.table[1]} onClick={_ => sorter(1)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(1)} />
        },
        {
            dataIndex: 'sub_accounts',
            ellipsis: false,
            width: 150,
            align: 'center',
            render: (text) => (`${text[0]?.name ? text[0]?.name : ''}`),
            sorter: {
                multiple: 2
            },
            filterDropdown: true,
            title: <Sorter title={innerText.table[2]} onClick={_ => sorter(2)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(2)} />
        },
        {
            dataIndex: 'sub_accounts',
            ellipsis: false,
            width: 150,
            align: 'center',
            render: (text) => (`${text[1]?.name ? text[1]?.name : ''}`),
            sorter: {
                multiple: 3
            },
            filterDropdown: true,
            title: <Sorter title={innerText.table[3]} onClick={_ => sorter(3)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(3)} />
        },
        {
            dataIndex: 'sub_accounts',
            ellipsis: false,
            width: 150,
            align: 'center',
            render: (text) => (`${text[2]?.name ? text[2]?.name : ''}`),
            sorter: {
                multiple: 4
            },
            filterDropdown: true,
            title: <Sorter title={innerText.table[4]} onClick={_ => sorter(4)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(4)} />
        },
        {
            dataIndex: 'type',
            ellipsis: false,
            width: 150,
            align: 'center',
            sorter: {
                multiple: 5
            },
            filterDropdown: true,
            title: <Sorter title={innerText.table[5]} onClick={_ => sorter(5)} />,
            render: (text) => (text === 1 ? 'Aktiv' : text === 0 ? 'Passiv' : 'Aktiv/Passiv'),
            filterIcon: <FilterOutlined onClick={_ => filter(5)} />
        },
        {
            dataIndex: 'currency_accounting',
            ellipsis: false,
            width: 150,
            align: 'center',

            filterDropdown: true,
            render: (text) => (text === 1 ? <CheckOutlined style={{ color: '#7367F0' }} /> : <CloseOutlined style={{ color: '#B9B9C3' }} />),
            title: <Sorter title={innerText.table[6]} onClick={_ => sorter(6)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(6)} />
        },
        {
            dataIndex: 'amount_accounting',
            ellipsis: false,
            width: 150,
            align: 'center',
            // sorter: {
            //     multiple: 6
            // },
            filterDropdown: true,
            render: (text) => (text === 1 ? <CheckOutlined style={{ color: '#7367F0' }} /> : <CloseOutlined style={{ color: '#B9B9C3' }} />),
            title: <Sorter title={innerText.table[7]} onClick={_ => sorter(7)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(7)} />
        },
        {
            dataIndex: 'tax_accounting',
            ellipsis: false,
            width: 150,
            align: 'center',
            // sorter: {
            //     multiple: 6
            // },
            filterDropdown: true,
            render: (text) => (text === 1 ? <CheckOutlined style={{ color: '#7367F0' }} /> : <CloseOutlined style={{ color: '#B9B9C3' }} />),
            title: <Sorter title={innerText.table[8]} onClick={_ => sorter(8)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(8)} />
        },
        {
            dataIndex: 'division_accounting',
            ellipsis: false,
            width: 150,
            align: 'center',
            // sorter: {
            //     multiple: 6
            // },
            filterDropdown: true,
            render: (text) => (text === 1 ? <CheckOutlined style={{ color: '#7367F0' }} /> : <CloseOutlined style={{ color: '#B9B9C3' }} />),
            title: <Sorter title={innerText.table[9]} onClick={_ => sorter(9)} />,
            filterIcon: <FilterOutlined onClick={_ => filter(9)} />
        }
    ];

    const showDataTable = () => {
        API.Finance.KontoPlans.getKontoPlan(JSON.stringify(showdata.current)).then(res => {
            setIsLoad(false)
            setShowTableData([...res.data.data])
        })
    }

    const showDataTableScroll = () => {
        API.Finance.KontoPlans.getKontoPlan(JSON.stringify(showdata.current)).then(res => {
            const { data } = res.data;
            if (data.length) {
                // data.push(...data);
                isPaginate = true;
            }
            const scrollLoad = 0;
            setScrollLoad({ scrollLoad })
            setShowTableData(prev => [...prev, ...data])
        });
    }

    const changeView = (status) => {
        setStatus(status)
        showdata.current.type = status;
        clearFilter();
        setSelectedRowKeys([])
    }

    const clearFilter = () => {
        showdata.current.filter_by = {};
        showdata.current.paginate = 0;
        isPaginate = true;
        showDataTable();
    }

    const handleReset = () => { clearFilter(); }

    const filterClose = (filter) => {
        setVisibleFilter(false)
        showdata.current.view = "all";
        if (Array.isArray(filter)) {
            const { index } = showdata.current;
            showdata.current.paginate = 0;
            isPaginate = true;
            showdata.current.filter_by[index] = filter;
            showDataTable();
        }
    }

    const sorter = (index) => {
        const { sort } = showdata.current;
        console.log(sort)
        if (sort) {
            let val = sort[index];
            console.log(val)

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

        showdata.current.paginate = 0;
        isPaginate = true;
        showDataTable();
    }

    const filter = (index) => {
        showdata.current.view = "single";
        showdata.current.index = index;
        // showdata.current.sort = { [index]: null }
        if (!showdata.current.filter_by[index]) showdata.current.filter_by[index] = [];
        setDataFilter(showdata.current)
        // const visibleFilter = !visibleFilter;
        // setVisibleFilter(visibleFilter)
        setVisibleFilter(true)

    }

    const changeStatus = () => {
        let data = {
            "uuids": selectedRowKeys,
        }
        if (status === 'active') {
            data.status = 0
        } else {
            data.status = 1
        }
        setIsLoad(true)
        API.Finance.KontoPlans.activity(data).then(res => {
            showDataTable()

        })
    }

    const onSearch = (e) => {
        const { value } = e.target
        showdata.current.search = value.length ? value : null;
        showdata.current.paginate = 0;
        isPaginate = true;
        showDataTable();
    }

    const Print = () => {
        const printColumns = columns.map(v => [v.dataIndex, v.render]);
        const data = showTableData;

        const table = `
            <table border='1' cellspacing='0'>
                <tr>${columns.map(col => `<th>${col.title}</th>`).join('')}</tr>
                ${data.map(val => `<tr>${columns.map(key => `<td>${val[key.dataIndex]}</td>`.replace('null', '')).join('')}</tr>`).join("")}
            </table>
            `;

        const _window_ = window.open('', '');
        _window_.document.write('<html><body >');
        _window_.document.write(table);
        _window_.document.write('</body></html>');

        _window_.print();
        _window_.close();

    }

    useEffect(() => {
        const table = document.querySelector('.ant-table-body');
        table.addEventListener('scroll', (e) => {
            let scrollTop1 = 0;
            const { scrollHeight, scrollTop, clientHeight } = e.target;

            if (scrollTop1 != scrollTop) {

                scrollTop1 = scrollTop;

                const bottom = scrollHeight - scrollTop - clientHeight;

                if (bottom <= 10 && isPaginate) {
                    showdata.current.paginate++;
                    isPaginate = false;
                    const scrollLoad = 72;
                    setScrollLoad({ scrollLoad })
                    showDataTableScroll();

                }
            }
        });
    }, [visibleEdit])

    useEffect(() => {
        showDataTable()
        console.log(style);
    }, [])

    return (
        <Layout className='c-wrapper'>
            <Content className={style.content}>Yeni
                {selectedRowKeys.length !== 0 &&
                    <Row className='status-box'>
                        <Col>
                            <Text className='status-box__text'>{selectedRowKeys.length} {innerText.data_choosed}</Text>
                        </Col>
                        <Col>
                            <Button
                                onClick={changeStatus}
                                type="primary"
                                className={`c-btn${status === 'active' ? 'c-btn--danger' : 'c-btn--success'}`}
                                style={{ width: 'max-content' }}
                            >
                                {status === 'active' ? 'Deaktiv et' : 'Aktiv et'}
                            </Button>
                        </Col>
                    </Row>
                }
                <Row className='c-table-header' justify="space-between" align='middle'>
                    <Col>
                        <Input className='c-input c-input--solid' onChange={onSearch} prefix={<BiSearchAlt />} placeholder={innerText.search_placeholder} />
                    </Col>
                    <Col >
                        <Space>
                            <Row>
                                <Button onClick={() => changeView('active')} className={'active-button' + ' ' + (status === 'active' ? 'active' : '')}>{innerText.active_btn}</Button>
                                <Button onClick={() => changeView('deactive')} className={'deactive-button' + ' ' + (status === 'deactive' ? 'active' : '')}>{innerText.deactive_btn}</Button>
                            </Row>
                            <Button onClick={Print} icon={<PrinterOutlined />} className='c-btn c-btn--icon c-btn-outline-secondary'></Button>
                            <Button onClick={SaveExcel} icon={<FileExcelOutlined />} className='c-btn c-btn--icon c-btn--excel'></Button>
                            <Button onClick={showDrawer} type="primary" icon={<PlusOutlined />} className='c-btn c-btn--primary' > {innerText.new_btn}</Button>
                            <Button onClick={handleReset} icon={<ClearOutlined />} className='c-btn c-btn--purple'>{innerText.clear_filter_btn}</Button>
                            {/* <Button onClick={searchBoxOpen} className={style.none} icon={<SearchOutlined />} /> */}
                        </Space>
                    </Col>
                </Row>

                {/* <Row justify='center' className={style.search} >
                    <Col span={24} style={{ 'flex': 1 }}>
                        <CollapseSearch tagKey="search" showArrow={false} onChange={onSearch} activeKey={searchBox} />
                    </Col>
                </Row> */}
                <Row justify='center'>
                    <Table
                        // style={{ width: '98%', cursor: 'pointer' }}
                        size="small"
                        className='c-table'
                        filterMultiple={true}
                        scroll={{
                            x: 750,
                            y: window.innerHeight - 220 - scrollLoad
                        }}
                        rowSelection={{
                            selectedRowKeys: selectedRowKeys,
                            onChange: onSelectChange
                        }}
                        rowClassName={(record, index) => {
                            if (index % 2 !== 0) return 'bg-table-splitted c-table-body'
                            return 'c-table-body'
                         }}
                        pagination={false}
                        columns={columns}
                        dataSource={showTableData}
                        rowKey={record => record.uuid}
                        onRow={(record, rowIndex) => ({ onClick: () => editRow(record, rowIndex) })}
                    />
                </Row>
            </Content>
            <Loader loading={isLoad} />
            <Insert open={open} onClose={onClose} />
            <Filter visibleFilter={visibleFilter} data={dataFilter} onClose={filterClose} />
            <Update
                open={visibleEdit}
                data={dataEdit}
                onClose={editClose}
            />
        </Layout >
    )
}

Index.View = () => <View />

export default Index
