import React, { useEffect, useState, useRef } from 'react'
import main from '../../style.module.scss'
import styles from './style.module.scss'

import { useLocation } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { EditOutlined } from '@ant-design/icons'
import { Row, Col, Button, Form, Input, Drawer, Select, Typography } from 'antd';
import { Languages } from "../../../Config";
import API from '../../../API'
const { Title } = Typography;
const { Option } = Select;
const innerText = Languages.SelectLanguage("BankGroups");
const defaultCorr = { uuid: null, name: '', currency_id: '' }
const defaultBranch = { uuid: null, name: '', code: '', name_eng: '', name_nat: '', city_id: '' }
const repeatedData = {
   corr: [defaultCorr],
   branch: [defaultBranch]
}
let cityList = []
// let currencyList = []
let corr_ids = []
let address_ids = []
let branch_ids = []
function Index({ open, data, onClose, showDataTable }) {
   const location = useLocation()
   const [bankInfo, setBankInfo] = useState([])
   const [bankBranch, setBankBranch] = useState([])
   const [currencyList, setCurrencyList] = useState([])

   const form = useRef()
   let obj = useRef({})

   const onFinish = (value) => {
      //remove undefined items
      value.corr = value.corr.filter(corr => corr !== undefined)
      value.branch = value.branch.filter(branch => branch !== undefined)
      //insert uuids
      value.corr = value.corr?.map((item, i) => ({ ...item, uuid: corr_ids[i] || null }))
      value.branch = value.branch?.map((item, i) => ({ ...item, uuid: branch_ids[i] || null }))
      value.branch?.map((item, i) => {
         item.address = { ...item.address, uuid: address_ids[i] || null }
      })
      update(value)
   };

   const Close = () => {
      onClose();
      form.current.resetFields();
      corr_ids = []
      address_ids = []
      branch_ids = []
      repeatedData.corr = [defaultCorr]
      repeatedData.branch = [defaultBranch]
      setBankInfo([...repeatedData.corr])
      setBankBranch([...repeatedData.branch])
      showDataTable()
   }
   // const onChangeDate = (date, dateString) => console.log(date, dateString);

   // ** APIs
   const getCity = () => {
      API.Com.City.list().then(res => {
         if (res.status === 200) {
            cityList = [...res.data.data]
         }
      })
   }
   const getCurrency = (currency) => {
      API.Finance.Picklist.getCurrencyList(JSON.stringify(currency)).then(res => {
         if (res.status === 200) {
            setCurrencyList([...res.data.data])
         }
      })
   }
   const setFormError = (name, errors) => {
      name = name.split('.').map((v) => (Number(v) || Number(v) === 0 ? Number(v) : v));
      form.current.setFields([{ name, errors }]);
   }
   const setItem = (value) => {
      form.current.setFieldsValue(value);
   }
   const getRowData = () => {
      getCurrency()

      API.Finance.BankGeneral.show(data.base.uuid).then(res => {
         if (res.status === 200) {
            const resData = res.data.data
            setBankInfo([])
            corr_ids = []
            branch_ids = []
            address_ids = []

            form.current.setFieldsValue({
               name: resData.base?.name,
               swift: resData.base?.swift,
               voen: resData.base?.voen
            })
            resData.base.corr?.map((corr, i) => {
               setItem({ 'corr': { [i]: { 'name': corr.name } } })
               setItem({ 'corr': { [i]: { 'currency_id': corr.currency.uuid } } })
               corr_ids.push(corr?.uuid)
               obj.current[i] = corr.currency.uuid
            })
            resData.branch?.map((item, i) => {
               setItem({ 'branch': { [i]: { 'name': item.branch?.name } } })
               setItem({ 'branch': { [i]: { 'code': item.branch?.code } } })
               setItem({ 'branch': { [i]: { 'address': { 'name_eng': item.branch?.address?.name_eng } } } })
               setItem({ 'branch': { [i]: { 'address': { 'name_nat': item.branch?.address?.name_nat } } } })
               setItem({ 'branch': { [i]: { 'address': { 'city_id': item.branch?.address?.city?.uuid } } } })
               address_ids.push(item.branch?.address?.uuid)
               branch_ids.push(item.branch?.uuid)
            })
            repeatedData.corr = resData.base.corr
            repeatedData.branch = resData.branch
            setBankInfo([...repeatedData.corr])
            setBankBranch([...repeatedData.branch])
         }
      })
   }

   const update = (value) => {
      API.Finance.BankGeneral.update(data.base.uuid, value).then(res => {
         if (res.status === 200) {
            Close();
            form.current.resetFields()
         } else {
            const resData = res.data.data
            if (!resData.hasOwnProperty('error')) {
               for (let key in resData) {
                  setFormError(key, resData[key])
               };
            }

         }
      })
   }

   const deleteBranch = uuid => {
      const data = {
         uuid: [uuid],
         status: 0
      }
      API.Finance.BankGeneral.branchUpdate(data).then(res => { })
   }
   const selectCurrency = (val, ind) => {
      if (val) {
         obj.current[ind] = val
         getCurrency(obj.current)
      } else {
         delete obj.current[ind]
         getCurrency(obj.current)
      }
   }
   const focusCurrency = () => {
      getCurrency(obj.current)
   }
   useEffect(() => {
      getCity()
      getCurrency()
   }, [])

   useEffect(() => {
      if (open) getRowData()
   }, [open])
   return (
      <Drawer
         title={innerText.updateTitle}
         width={'65%'}
         className='c-drawer'
         // className={styles.modalUpdateBankGroup}
         onClose={Close}
         open={open}
         bodyStyle={{ paddingBottom: 80 }}
         extra={<Button href={`${location.pathname}/show/${data?.base?.uuid}`} style={{ width: 150, marginLeft: 5 }} type='primary' > {innerText.view} <EditOutlined /></Button>}
      >
         <Form ref={form} layout="vertical" onFinish={onFinish}>
            <Title style={{ margin: 0 }} level={3}>{innerText.addingBanks}</Title>
            <Row style={{ flexDirection: 'column' }}>
               <Row>
                  <Col span={24}>
                     <Title style={{ color: '#1e81b0' }} level={5}>{innerText.bankInfos}</Title>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col lg={6} md={8}>
                     <Form.Item
                        label={innerText.bankName}
                        name='name'
                        rules={[{
                           required: true,
                           message: `${innerText.bankName} ${innerText.inputPlaceholder.toLowerCase()}`
                        }]}
                        className='c-form-item'
                     >
                        <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                     </Form.Item>
                  </Col>
                  <Col lg={6} md={8}>
                     <Form.Item
                        label={innerText.swift}
                        name='swift'
                        rules={[{
                           required: true,
                           message: `${innerText.swift} ${innerText.inputPlaceholder.toLowerCase()}`
                        }]}
                        className='c-form-item'
                     >
                        <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                     </Form.Item>
                  </Col>
                  <Col lg={6} md={8}>
                     <Form.Item
                        label={innerText.voen}
                        name='voen'
                        rules={[{
                           required: true,
                           message: `${innerText.voen} ${innerText.inputPlaceholder.toLowerCase()}`
                        }]}
                        className='c-form-item'
                     >
                        <Input className='c-input' type='number' placeholder={innerText.inputPlaceholder} />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16} style={{ marginBottom: 20 }}>
                  {bankInfo?.map((val, i) => (
                     val && <Col md={12} key={i}>
                        <Row gutter={16} align='bottom' style={{ marginBottom: 16 }}>
                           <Col span={12}>
                              <Form.Item
                                 label={innerText.bankAccount}
                                 name={['corr', i, 'name']}
                                 rules={[{
                                    required: true,
                                    message: `${innerText.bankAccount} ${innerText.inputPlaceholder.toLowerCase()}`
                                 }]}
                                 style={{ marginBottom: 0 }}
                                 className='c-form-item'
                              >
                                 <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                              </Form.Item>
                           </Col>
                           <Col span={8}>
                              <Form.Item
                                 label={innerText.currency}
                                 name={['corr', i, 'currency_id']}
                                 rules={[{
                                    required: true,
                                    message: `${innerText.currency} ${innerText.selectPlaceholder.toLowerCase()}`
                                 }]}
                                 style={{ marginBottom: 0 }}
                                 className='c-form-item'
                              >
                                 <Select
                                    className='c-select'
                                    allowClear
                                    showSearch
                                    filterOption={false}
                                    placeholder={innerText.selectPlaceholder}
                                    onChange={(e) => selectCurrency(e, i)}
                                    onFocus={focusCurrency}
                                 >
                                    {currencyList?.map((currency, i) => (
                                       <Option key={i} value={currency.uuid}>
                                          {currency.name}
                                       </Option>
                                    ))}
                                 </Select>
                              </Form.Item>
                           </Col>
                           <Col span={4} >
                              {bankInfo.filter(elm => elm !== undefined).length > 1 && (
                                 <Button
                                    className={main.btnDecrease}
                                    onClick={() => {
                                       corr_ids.splice(i, 1)
                                       delete repeatedData.corr[i]
                                       setBankInfo([...repeatedData.corr])
                                       delete obj.current[i]
                                    }}
                                 >
                                    <AiOutlineMinus />
                                 </Button>
                              )}
                           </Col>
                        </Row>
                     </Col>
                  ))}
               </Row>
               <Row>
                  <Col span={24}>
                     <Button
                        className={main.btnIncrease}
                        style={{ margin: 'auto' }}
                        onClick={() => {
                           repeatedData.corr.push(defaultCorr)
                           setBankInfo([...repeatedData.corr])
                        }}
                     >
                        <AiOutlinePlus />
                     </Button>
                  </Col>
               </Row>
            </Row>
            <Row>
               <Col >
                  <Title style={{ color: '#1e81b0' }} level={5}>{innerText.bankBranchs}</Title>
               </Col>
               <Col span={24}>
                  {bankBranch?.map((val, i) => (
                     val && <Row gutter={16} key={i} justifyContent='between'>
                        <Col lg={4} style={{ display: 'flex' }} >
                           <Form.Item
                              label={innerText.branchName}
                              name={['branch', i, 'name']}
                              rules={[{
                                 required: true,
                                 message: `${innerText.branchName} ${innerText.inputPlaceholder.toLowerCase()}`
                              }]}
                              className='c-form-item'
                           >
                              <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                           </Form.Item>
                        </Col>
                        <Col lg={4}>
                           <Form.Item
                              label={innerText.branchCode}
                              name={['branch', i, 'code']}
                              rules={[{
                                 required: true, message: `${innerText.branchCode} ${innerText.inputPlaceholder.toLowerCase()}`
                              }]}
                              className='c-form-item'
                           >
                              <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                           </Form.Item>
                        </Col>
                        <Col lg={4}>
                           <Form.Item
                              label={innerText.city}
                              name={['branch', i, 'address', 'city_id']}
                              rules={[{
                                 required: true,
                                 message: `${innerText.city} ${innerText.inputPlaceholder.toLowerCase()}`
                              }]}
                              className='c-form-item'
                           >
                              <Select
                                 className='c-select'
                                 showSearch
                                 filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                 placeholder={innerText.selectPlaceholder}
                              >
                                 {cityList?.map((city, i) => {
                                    return (
                                       <Option key={i} value={city.uuid}>
                                          {city.name}
                                       </Option>
                                    )
                                 })}
                              </Select>
                           </Form.Item>
                        </Col>
                        <Col lg={4}>
                           <Form.Item
                              label={innerText.addressNative}
                              name={['branch', i, 'address', 'name_nat']}
                              rules={[{
                                 required: true,
                                 message: `${innerText.addressNative} ${innerText.inputPlaceholder.toLowerCase()}`
                              }]}
                              className='c-form-item'
                           >
                              <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                           </Form.Item>
                        </Col>
                        <Col lg={4}>
                           <Form.Item
                              label={innerText.addressEng}
                              name={['branch', i, 'address', 'name_eng']}
                              rules={[{
                                 required: true,
                                 message: `${innerText.addressEng} ${innerText.inputPlaceholder.toLowerCase()}`
                              }]}
                              className='c-form-item'
                           >
                              <Input className='c-input' placeholder={innerText.inputPlaceholder} />
                           </Form.Item>
                        </Col>
                        <Col lg={2} style={{ display: 'flex', alignItems: 'center' }}>
                           {bankBranch.filter(elm => elm !== undefined).length >= 1 &&
                              <Button
                                 className={main.btnDecrease}
                                 onClick={() => {
                                    deleteBranch(repeatedData.branch[i].branch.uuid)
                                    branch_ids.splice(i, 1)
                                    address_ids.splice(i, 1)
                                    delete repeatedData.branch[i]
                                    setBankBranch([...repeatedData.branch])
                                 }}
                              >
                                 <AiOutlineMinus />
                              </Button>
                           }
                        </Col>
                     </Row>

                  ))}
                  <Row justify='center'>
                     <Col>
                        <Button
                           className={main.btnIncrease}
                           onClick={() => {
                              repeatedData.branch.push(defaultBranch)
                              setBankBranch([...repeatedData.branch])
                           }}
                        >
                           <AiOutlinePlus />
                        </Button>
                     </Col>
                  </Row>
               </Col>
            </Row>
            <Row align='end' style={{ marginTop: 30 }} className='fixed-submit-buttons' >
               <Button style={{ width: 150, marginLeft: 5 }} htmlType="submit" type='primary' className='c-btn c-btn--primary'>{innerText.save}</Button>
               <Button style={{ width: 150, marginRight: 5 }} className='c-btn c-btn--secondary' onClick={Close}>{innerText.close}</Button>
            </Row>
         </Form >
      </Drawer >
   )
}
export default Index