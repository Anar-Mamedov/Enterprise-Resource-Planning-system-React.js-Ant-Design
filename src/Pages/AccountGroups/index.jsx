import React, { useState, useEffect, useRef } from 'react'
// import './style.scss'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { PlusOutlined, FilterFilled, PrinterOutlined, FileExcelOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button, Input, Table, Collapse, notification, Typography, Space } from 'antd';
import Sorter from '../../Components/Sorter'
import API from '../../API'
import { Loading, Button as MyButton } from '../../Components';
import styles from './style.module.scss'
import { Languages } from '../../Config';
import { BiSearchAlt } from 'react-icons/bi';
const innerText = Languages.SelectLanguage("AccountGroups")
const { Content } = Layout;
const { Panel } = Collapse;
const { Search } = Input;
const { Text } = Typography;
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
   // const [scrollToFirstRow, setScrollToFirstRow] = useState(false)
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
   }
   const editClose = () => {
      setVisibleEdit(false)
      Close()
   }
   const showFilter = (i) => {
      showdata.current.view = "single";
      showdata.current.index = i;
      // showdata.current.sort = { [i]: null }

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
         dataIndex: 'name_eng',
         key: 'name_eng',
         ellipsis: false,
         width: 170,
         align: 'center',
         filterDropdown: true,
         sorter: {
            multiple: 0
         },
         filterIcon: <>
            <FilterFilled onClick={_ => showFilter(0)} />
         </>
      },
      {
         title: <Sorter title={innerText.table[1]} onClick={() => Sort(1)} />,
         dataIndex: 'name_nat',
         key: "name_nat",
         ellipsis: false,
         width: 170,
         align: 'center',
         filterDropdown: true,
         sorter: {
            multiple: 1,
         },
         filterIcon: <>
            <FilterFilled onClick={_ => showFilter(1)} />
         </>
      },
      {
         title: <Sorter title={innerText.table[3]} onClick={() => Sort(3)} />,
         dataIndex: 'abb_eng',
         key: 'abb_eng',
         ellipsis: false,
         width: 170,
         align: 'center',
         filterDropdown: true,
         // sortDirections: ['descend', 'ascend'],
         sorter: {
            // compare: (a, b) => b.abb_eng.localeCompare(a.abb_eng),
            multiple: 3,
         },
         filterIcon: <>
            <FilterFilled onClick={_ => showFilter(3)} />
         </>
      },
      {
         title: <Sorter title={innerText.table[2]} onClick={() => Sort(2)} />,
         dataIndex: 'abb_az',
         key: 'abb_az',
         ellipsis: false,
         width: 170,
         align: 'center',
         filterDropdown: true,
         // sortDirections: ['descend', 'ascend'],
         sorter: {
            // compare: (a, b) => b.abb_az.localeCompare(a.abb_az),
            multiple: 2,
         },
         filterIcon: <>
            <FilterFilled onClick={_ => showFilter(2)} />
         </>
      }
   ];

   const renderTableView = () => {
      for (let k in showdata.current.sort) {
         if (!showdata.current.sort[k]) delete showdata.current.sort[k]
      }

      API.Finance.KontoGroups.index(JSON.stringify(showdata.current)).then(res => {
         if (res.data.status === 200) {
            setShowTableData([...res.data.data])
            initialData = [...res.data.data]
         }
      })
   }
   // console.log('default', showTableData)

   const renderScrollTableView = () => {
      API.Finance.KontoGroups.index(JSON.stringify(showdata.current)).then(res => {
         const data = res.data.data
         if (data.length) {
            // console.log('initial', initialData, 'data', data)
            setShowTableData([...initialData, ...data])
            initialData = [...initialData, ...data]
            isPaginate = true
         }
         initialScrollLoad = 0
         setScrollLoad(0)
      })
   }

   const onChangeTable = (pagination, filters, sorter, extra) => {
      // console.log('table changed', sorter);
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
      // console.log(showdata.current)
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

         API.Finance.KontoGroups.activity(params).then(res => {
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
                     <Text className='status-box__text'>{selectedRowKeys.length} data seçildi</Text>
                  </Col>
                  <Col>
                     <Button onClick={() => changeStatus(activeView === 'active' ? 0 : 1)} type="primary" className={`c-btn ${activeView === 'active' ? 'c-btn--danger' : 'c-btn--success'}`}>
                        {activeView === 'active' ? 'Deaktiv et' : 'Aktiv et'}
                     </Button>
                  </Col>
               </Row>
            }
            <Row className='c-table-header' justify="space-between" align='middle' gutter={[{ md: 8 }, { md: 8 }]}>
               <Col >
                  {/* Table search  */}
                  <Input className='c-input c-input--solid' value={inputValue} onChange={inputOnChange} prefix={<BiSearchAlt size={18} />} placeholder="Search" />
               </Col>
               <Col >
                  <Space>
                     {/* <Button onClick={searchBoxOpen} className={styles.none} icon={<SearchOutlined />} /> */}
                     <Row >
                        <Button onClick={_ => changeView('active')} className={'c-btn active-button' + ' ' + (activeView === 'active' ? 'active' : '')}>Aktiv</Button>
                        <Button onClick={_ => changeView('deactive')} className={'c-btn deactive-button' + ' ' + (activeView === 'deactive' ? 'active' : '')}>Deaktiv</Button>
                     </Row>
                     <Button className='c-btn c-btn--icon c-btn--excel'><FileExcelOutlined /></Button>
                     <Button className='c-btn c-btn--icon c-btn-outline-secondary' ><PrinterOutlined /></Button>
                     <Button className='c-btn c-btn--purple' onClick={clearFilter} icon={<ClearOutlined />}>{innerText.btn_clear_filter}</Button>
                     <Button className='c-btn c-btn--primary' type='primary' onClick={showDrawer} icon={<PlusOutlined />}>{innerText.btn_new}</Button>
                  </Space>
               </Col>
            </Row>
            {/* <Row className={styles.search} justify='center'>
               <Collapse style={{ width: '98%' }} activeKey={searchBox}>
                  <Panel showArrow={false} key="search">
                     <Search value={inputValue} onChange={inputOnChange} placeholder="input search text" enterButton="Search" size="large" loading />
                  </Panel>
               </Collapse>
            </Row> */}
            <Row justify='center'>
               <Table
                  className='c-table'
                  rowClassName={(record, index) => {
                     if (index % 2 !== 0) return 'bg-table-splitted c-table-row'
                     return 'c-table-row'
                  }}
                  size="small"
                  filterMultiple={true}
                  scroll={{
                     x: 750,
                     y: window.innerHeight - 300 - scrollLoad,
                     // scrollToFirstRowOnChange: scrollToFirstRow
                  }}

                  rowSelection={{
                     selectedRowKeys: selectedRowKeys,
                     onChange: onSelectChange
                  }}
                  // scrollToFirstRowOnChange={true}
                  onChange={onChangeTable}
                  pagination={false}
                  columns={columns}
                  dataSource={initialData}
                  rowKey={record => record.uuid}
                  onRow={(record, rowIndex) => ({ onClick: () => activeView === 'active' ? editRow(record, rowIndex) : null })}
                  footer={_ => scrollLoad > 0 && <Loading message={innerText.sign_loading} />}
               />
            </Row>
         </Content >
         <Insert
            renderTableView={renderTableView}
            open={open}
            onClose={onClose}
         />
         <Filter dataFilter={dataFilter} searchValue={inputValue} visibleFilter={visibleFilter} onClose={onCloseFilter} />
         <Update
            renderTableView={renderTableView}
            open={visibleEdit}
            data={dataEdit}
            onClose={editClose}
         />
      </Layout >
   )
}

Index.View = () => <View />

export default Index
