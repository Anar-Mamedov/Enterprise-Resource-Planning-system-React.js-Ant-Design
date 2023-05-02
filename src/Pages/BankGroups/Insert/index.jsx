import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import main from '../../style.module.scss'
import { Languages } from "../../../Config";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Row, Col, Button, Form, Input, Drawer, Select, Typography } from 'antd';
import API from '../../../API'
const { Title } = Typography;
const { Option } = Select;
const defaultCorr = { name: '', currency_id: '' }
const defaultBranch = { name: '', code: '', address: { name_eng: '', name_nat: '', city_id: '' } }
const repeatedData = {
   corr: [defaultCorr],
   branch: [defaultBranch]
}
const innerText = Languages.SelectLanguage("BankGroups");

let cityList = []
let scrollToTop = 0

function Index({ onClose, open }) {
   const [bankInfo, setBankInfo] = useState(repeatedData.corr)
   const [bankBranch, setBankBranch] = useState(repeatedData.branch)
   const [scrollLoad, setScrollLoad] = useState(0)
   const [currencyList, setCurrencyList] = useState([])
   let form = useRef()
   let obj = useRef({})
   const onFinish = (value) => {
      API.Finance.BankGeneral.store(value).then(res => {
         if (res.status === 201) {
            Close()
            form.current.resetFields()
         } else {
            const messages = res.data.data;
            for (let key in messages) setFormError(key, messages[key]);
         }
      })
   };
   const Close = (uuid) => { onClose(); form.current.resetFields() }
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

   const afterOpenChange = () => {
      form.current.resetFields()
      repeatedData.corr = [defaultCorr]
      repeatedData.branch = [defaultBranch]
      setBankInfo([...repeatedData.corr])
      setBankBranch([...repeatedData.branch])
   }
   useEffect(() => {
      getCity()
      getCurrency()
   }, [])
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
   const onScroll = (e) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      if (scrollToTop != scrollTop) {
         scrollToTop = scrollTop;
         const bottom = scrollHeight - scrollTop - clientHeight;
         if (bottom <= 10) {
            setScrollLoad(56)
         }
      }
   }
   return (
      <Drawer
         title={innerText.insertTitle}
         width={'65%'}
         className='c-drawer'
         onClose={Close}
         open={open}
         bodyStyle={{ paddingBottom: 80 }}
         afterOpenChange={afterOpenChange}

      >
         <Form ref={form} layout="vertical" onFinish={onFinish} style={{ height: '100%' }}>
            <Row onScroll={onScroll} style={{ maxHeight: (window.innerHeight - 90 - scrollLoad), overflow: 'hidden auto' }}>
               <Row style={{ width: '100%', flexDirection: 'column' }}>
                  <Title style={{ margin: 0 }} level={3}>{innerText.addingBanks}</Title>
                  <Row>
                     <Col span={24}>
                        <Title style={{ color: 'blue' }} level={5}>{innerText.bankInfos}</Title>
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
                           <Input className='c-input' placeholder='Daxil edin' />
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
                  <Row gutter={16}>
                     {bankInfo?.map((val, i) => (
                        val && <Col md={12} key={i} >
                           <Row gutter={16} align='middle' >
                              <Col span={12}>
                                 <Form.Item
                                    label={innerText.bankAccount}
                                    name={['corr', i, 'name']}
                                    rules={[{
                                       required: true,
                                       message: `${innerText.bankAccount} ${innerText.inputPlaceholder.toLowerCase()}`
                                    }]}
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
                                    className='c-form-item'
                                 >
                                    <Select
                                       allowClear
                                       showSearch
                                       className='c-select'
                                       onChange={(e) => selectCurrency(e, i)}
                                       onFocus={focusCurrency}
                                       filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                       placeholder={innerText.selectPlaceHolder}>
                                       {currencyList?.map((currency, i) => {
                                          return (
                                             <Option key={i} value={currency.uuid}>
                                                {currency.name}
                                             </Option>
                                          )
                                       })}
                                    </Select>
                                 </Form.Item>
                              </Col>
                              <Col span={4}>
                                 {bankInfo.filter(elm => elm !== undefined).length > 1 &&
                                    <Button
                                       className={main.btnDecrease}
                                       onClick={() => {
                                          delete repeatedData.corr[i]
                                          setBankInfo([...repeatedData.corr])
                                          delete obj.current[i]
                                       }}
                                    >
                                       <AiOutlineMinus />
                                    </Button>
                                 }
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
                  <Col>
                     <Title style={{ color: 'blue' }} level={5}>{innerText.bankBranchs}</Title>
                  </Col>
                  <Col span={24}>
                     {bankBranch?.map((val, i) => (
                        val && (
                           <Row gutter={16} key={i} >
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
                                    type='number'
                                    rules={[{
                                       required: true,
                                       message: `${innerText.branchCode} ${innerText.inputPlaceholder}`
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
                                       message: `${innerText.city} ${innerText.selectPlaceholder.toLowerCase()}`
                                    }]}
                                    className='c-form-item'
                                 >
                                    <Select
                                       allowClear
                                       showSearch
                                       className='c-select'
                                       filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                       placeholder={innerText.selectPlaceholder} >
                                       {cityList?.map((city, i) => (<Option key={i} value={city.uuid}>{city.name}</Option>))}
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
                                    <Input className='c-input' placeholder='Daxil edin' />
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
                                    <Input className='c-input' placeholder='Daxil edin' />
                                 </Form.Item>
                              </Col>
                              {bankBranch.filter(elm => elm !== undefined).length > 1 &&
                                 <Col lg={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                       className={main.btnDecrease}
                                       onClick={() => {
                                          delete repeatedData.branch[i]
                                          setBankBranch([...repeatedData.branch])
                                       }}
                                    >
                                       <AiOutlineMinus />
                                    </Button>
                                 </Col>
                              }
                           </Row>
                        )
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
            </Row>
            <Row align='end' className={styles.insertFooter}>
               <Button style={{ width: 150, marginLeft: 5 }} htmlType="submit" type='primary' className={styles.submit}>{innerText.save}</Button>
               <Button style={{ width: 150, marginRight: 5 }} className={styles.cancel} onClick={Close}>{innerText.close}</Button>
            </Row>
         </Form >
      </Drawer >
   )
}
export default Index