import React, { useState, useEffect, useRef, useMemo } from 'react'
import View from './View';
import Insert from './Insert';
import Update from './Update';
import Filter from './Filter'
import { Excel } from "antd-table-saveas-excel";
import {
   PlusOutlined, FilterFilled, ClearOutlined,
   FileExcelOutlined,
} from '@ant-design/icons';
import {
   Layout, Row, Col,
   Button, Input, Table,
   Collapse, Typography, Space
} from 'antd';
import { BiSearchAlt } from 'react-icons/bi';
import API from '../../API'
import { Loading, Sorter } from '../../Components';
import { Languages } from '../../Config';
const innerText = Languages.SelectLanguage("BankGroups")

const { Content } = Layout;
const { Text } = Typography
let isPaginate = true;
let scrollToTop = 0
let initialScrollLoad = 0
let initialData = null
let expandedRowBranch = []
let expandedData = [];

const Index = () => {
   const [selectedRowKeys, setSelectedRowKeys] = useState([])
   const [selectedRowKeysExpand, setSelectedRowKeysExpand] = useState([])
   const [open, setOpen] = useState(false)
   const [visibleEdit, setVisibleEdit] = useState(false)
   const [dataEdit, setDataEdit] = useState({})
   const [scrollLoad, setScrollLoad] = useState(0)
   const [visibleFilter, setVisibleFilter] = useState(false)
   const [showTableData, setShowTableData] = useState([]);
   const [dataFilter, setDataFilter] = useState([]);
   const [status, setStatus] = useState('active');
   const [inputValue, setInputValue] = useState(null)
   //-----------------------------------------------------------
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
      showdata.current.paginate = 0;
      isPaginate = true;
      changeView('active')
      showDataTable()
   }
   const onSelectChange = (newSelectedRowKeys) => { setSelectedRowKeys(newSelectedRowKeys) }

   const onSelectChangeExpand = (newSelectedRowKeys) => { setSelectedRowKeysExpand(newSelectedRowKeys) }


   const editRow = (record) => {
      setDataEdit(record)
      showdata.current.type === "active" ? setVisibleEdit(true) : setVisibleEdit(false)
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
      showdata.current.paginate = 0;

      // for (let i = 0; i < showdata.current.paginate; i++) {
      //    if (showdata.current.paginate !== 0) showdata.current.paginate = 0
      // }
      isPaginate = true;
      showDataTable()
   }

   const SaveExcel = () => {
      const excel = new Excel();
      excel
         .addSheet("bank-general")
         .addColumns(columns)
         .addDataSource(showTableData, { str2Percent: true })
         .saveAs("bank-general.xlsx");
   }

   const inputOnChange = (e) => {
      const value = e.target.value
      showdata.current.search = value
      showdata.current.search_single = value
      setInputValue(value)
      showDataTable()
   }

   const expandedRowRender = (record, i) => {
      expandedRowBranch = []
      const columns = [
         {
            title: innerText.table[3],
            dataIndex: 'name',
            key: 'name',
         },
         {
            title: innerText.table[4],
            dataIndex: 'code',
            key: 'code',
         },
         {
            title: innerText.table[5],
            key: 'city',
            dataIndex: 'city'
         },
         {
            title: innerText.table[6],
            key: 'address',
            dataIndex: 'address'
         }
      ];
      record.branch = record.branch?.filter(item => item !== null)
      expandedData = []
      record.branch?.map((item, i) => {
         if (item === null) return
         expandedData[i] = {
            key: item.uuid,
            code: item.code,
            name: item.name,
            address: item.address?.name_nat,
            city: item.address?.city?.name_nat
         };
      })
      return (
         <Table
            columns={columns}
            dataSource={expandedData}
            pagination={false}
            rowSelection={{
               selectedRowKeys: selectedRowKeysExpand,
               onChange: onSelectChangeExpand
            }}
         />
      );
   };

   const columns = [
      {
         title: <Sorter title={innerText.table[0]} onClick={() => Sort(0)} />,
         dataIndex: ['base', 'name'],
         key: 'name',
         ellipsis: false,
         width: 100,
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
         dataIndex: ['base', 'voen'],
         key: 'voen',
         ellipsis: false,
         width: 100,
         align: 'center',
         filterDropdown: true,
         sorter: {
            multiple: 1
         },
         filterIcon: <>
            <FilterFilled onClick={_ => showFilter(1)} />
         </>
      },
      {
         title: <Sorter title={innerText.table[2]} onClick={() => Sort(2)} />,
         dataIndex: ['base', 'swift'],
         key: 'swift',
         ellipsis: false,
         width: 100,
         align: 'center',
         filterDropdown: true,
         sorter: {
            multiple: 2
         },
         filterIcon: <>
            <FilterFilled onClick={_ => showFilter(2)} />
         </>
      }
   ]

   const onExpand = (bool, record) => { expandedRowBranch = bool ? record.branch : [] }

   const showDataTable = () => {
      for (let k in showdata.current.sort) {
         if (!showdata.current.sort[k]) delete showdata.current.sort[k]
      }

      API.Finance.BankGeneral.index(JSON.stringify(showdata.current)).then(res => {
         if (res.status === 200) {
            let newData;
            if (showdata.current.type === "subdeactive") {
               newData = res.data.filter(v => v.branch.length > 0)
               setShowTableData([...newData])
            } else {
               setShowTableData([...res.data])
            }
         }
      })
   }

   const showDataTableScroll = () => {
      API.Finance.BankGeneral.index(JSON.stringify(showdata.current)).then(res => {
         const { data } = res;
         if (data.length) {
            isPaginate = true;
         }
         const scrollLoad = 0;
         setScrollLoad({ scrollLoad })
         setShowTableData(prev => [...prev, ...data])
      });
   }

   const Close = () => {
      showdata.current.paginate = 0;
      isPaginate = true;
      showDataTable()
   }

   const clearFilter = () => {
      showdata.current.filter_by = {};
      isPaginate = true
      for (let i = 0; i < showdata.current.paginate; i++) {
         if (showdata.current.paginate !== 0) showdata.current.paginate = 0
      }
      showDataTable()
   }

   const changeView = (status) => {
      setStatus(status)
      showdata.current.type = status;
      clearFilter();
      setSelectedRowKeys([])
      setSelectedRowKeysExpand([])
   }

   const changeBranch = (subStatus) => {
      setStatus(subStatus)
      showdata.current.type = subStatus;
      clearFilter();
      setSelectedRowKeys([])
      setSelectedRowKeysExpand([])
   }

   const changeStatus = () => {
      const sts = status === 'active' ? 0 : 1
      let data = {
         uuid: selectedRowKeys,
         status: sts
      }
      API.Finance.BankGeneral.activity(data).then(() => {
         setSelectedRowKeys([])
         setSelectedRowKeysExpand([])
         showDataTable()
      })
   }

   const changeBranchStatus = () => {
      const sts = status === 'active' ? 0 : 1
      let data = {
         uuid: selectedRowKeysExpand,
         status: sts
      }
      API.Finance.BankGeneral.branchUpdate(data).then(() => {
         setSelectedRowKeys([])
         setSelectedRowKeysExpand([])
         showDataTable()
      })
   }

   const onChangeSearch = (e) => {
      const { value } = e.target
      showdata.current.search = value.length ? value : null;
      showdata.current.paginate = 0;
      isPaginate = true;
      showDataTable();
   }

   useEffect(() => {
      setShowTableData([])
      showDataTable()
   }, [])

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

   return (
      <Layout className='c-wrapper'>
         <Content style={{ position: 'relative' }}>
            {(selectedRowKeys.length > 0 || selectedRowKeysExpand.length > 0) &&
               <Row className='status-box'>
                  <Col>
                     {selectedRowKeys.length > 0 && (
                        <Text className='status-box__text'> {selectedRowKeys.length || selectedRowKeysExpand.length} data seçildi</Text>
                     )}
                  </Col>
                  {(selectedRowKeys.length > 0 && selectedRowKeysExpand.length == 0) &&
                     <Col>
                        <Button onClick={changeStatus} type="primary" className={`c-btn ${status === 'active' ? 'c-btn--danger' : 'c-btn--success'}`}>
                           {status === 'active' ? innerText.setDeactive : innerText.setActive}
                        </Button>
                     </Col>
                  }
                  {(selectedRowKeys.length == 0 && selectedRowKeysExpand.length > 0) &&
                     <Col>
                        <Button onClick={changeBranchStatus} type="primary" className={`c-btn ${status === 'active' ? 'c-btn--danger' : 'c-btn--success'}`}>
                           {status === 'active' ? innerText.setSubDeactive : innerText.setActive}
                        </Button>
                     </Col>
                  }
                  {
                     (selectedRowKeys.length > 0 && selectedRowKeysExpand.length > 0) &&
                     <Col>
                        <Text className='status-box__text'> Bank və filial eyni anda seçilə bilməz!</Text>
                     </Col>
                  }
               </Row>
            }

            <Row className='c-table-header' justify="space-between" align='middle' gutter={[{ md: 8 }, { md: 8 }]}>
               <Col >
                  <Input
                     className='c-input c-input--solid'
                     value={inputValue}
                     onChange={inputOnChange}
                     prefix={<BiSearchAlt size={18} />}
                     placeholder={innerText.searchPlaceHolder}
                  />
               </Col>
               <Col >
                  <Space>
                     {/* <Button onClick={searchBoxOpen} className={styles.none} icon={<SearchOutlined />} /> */}
                     <Row >
                        <Button onClick={_ => changeView('active')} className={'c-btn active-button' + ' ' + (status === 'active' ? 'active' : '')}>{innerText.active}</Button>
                        <Button onClick={_ => changeView('deactive')} className={'c-btn deactive-button' + ' ' + (status === 'deactive' ? 'active' : '')}>{innerText.deactive}</Button>
                        <Button onClick={_ => changeBranch('subdeactive')} className={'c-btn subdeactive-button' + ' ' + (status === 'subdeactive' ? 'active' : '')}>{innerText.subDeactive}</Button>
                     </Row>
                     <Button className='c-btn c-btn--icon c-btn--excel' onClick={SaveExcel}><FileExcelOutlined /></Button>
                     <Button className='c-btn c-btn--purple' onClick={clearFilter} icon={<ClearOutlined />}>{innerText.clearFilter}</Button>
                     <Button className='c-btn c-btn--primary' type='primary' onClick={showDrawer} icon={<PlusOutlined />}>{innerText.insert}</Button>
                  </Space>
               </Col>
            </Row>
            <Row justify='center'>
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
                     y: window.innerHeight - 300 - scrollLoad
                  }}
                  rowSelection={{
                     selectedRowKeys: selectedRowKeys,
                     onChange: onSelectChange,
                     getCheckboxProps: (record) => {
                        if (showdata.current.type == "subdeactive")
                           return {
                              disabled: true,
                           }
                     },
                  }}
                  pagination={false}
                  expandable={{
                     expandedRowRender,
                     onExpand: (expanded, record) => onExpand(expanded, record),
                     columnWidth: '25px',
                     showExpandColumn: true
                  }}
                  columns={columns}
                  dataSource={showTableData}
                  rowKey={record => record.base.uuid}
                  onRow={(record, rowIndex) => ({ onClick: () => editRow(record, rowIndex) })}
                  footer={_ => scrollLoad > 0 && <Loading message={innerText.sign_loading} />}

               />
            </Row>
         </Content>
         <Insert
            open={open}
            onClose={onClose}
         />
         <Filter visibleFilter={visibleFilter} data={dataFilter} onClose={filterClose} />
         <Update
            open={visibleEdit}
            data={dataEdit}
            onClose={editClose}
            showDataTable={showDataTable}
         />
      </Layout >
   )
}

Index.View = () => <View />

export default Index