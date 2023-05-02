import React, { useState } from 'react'
import { Row, Col, Form, Input, Select, Empty, TreeSelect, Switch, Space, Spin, Collapse } from 'antd';
import API from '../../../../API'
import { BillInsertContext, useContext } from '../../Context/context';
const { Option } = Select;
const { Panel } = Collapse
let dependenceData = []
const Index = () => {
  const {
    allPrf, setStorePrfView, storePrfView, form, itemUnit, taxEdv,
    bankTime, warehouseProductCategory, setItem, journalsTop, renderTreeNodes
  } = useContext(BillInsertContext)
  const [dependenceState, setDependenceState] = useState([])
  const [prfPanelLoad, setPrfPanelLoad] = useState(false)
  const handleClick = () => {
    storePrfView?.forEach((element, index) => {
      dependenceData[index] = { data: [] }
      setItem({ 'prfs': { [index]: { 'id': element.uuid } } })
      element?.products?.forEach((elem, ind) => {
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_id': elem?.attribute.uuid } } } } })
        // setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_product_id': elem?.attribute.uuid } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'description_id': elem?.description?.uuid } } } } })
        // setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_description_id': elem?.description?.uuid } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_idView': elem?.unit?.name } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'unit_id': elem?.unit?.uuid } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'quantity': elem?.quantity } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'amount': elem?.amount } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_amount': elem?.total_amount } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_idView': elem?.tax?.tax_value || null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'tax_id': elem?.tax?.uuid || null } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'total_tax_amount': elem?.total_tax_amount } } } } })
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'note': elem?.note } } } } })
        dependenceData[index].data[ind] = []
        const uuid = { product_attribute_id: form.getFieldValue(['prfs', index, 'products', ind, 'bill_product_id']) }
        API.Warehouse.categoryPropertyDescription.list(uuid).then(res => {
          dependenceData[index].data[ind] = res.data.data
          setDependenceState([...dependenceData])
        })
      })
    })
    setDependenceState([...dependenceData])
  }
  const getCategoryPropertyDescription = (val, index, ind) => {
    setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_description_id': null } } } } })
    if (val === undefined) {
      dependenceData[index].data[ind] = []
      setDependenceState([...dependenceData])
    } else {
      const uuid = { product_attribute_id: form.getFieldValue(['prfs', index, 'products', ind, 'bill_product_id']) }
      API.Warehouse.categoryPropertyDescription.list(uuid).then(res => {
        dependenceData[index].data[ind] = res?.data?.data
        setDependenceState([...dependenceData])
      })
    }
  }
  const handlePanelSelectedPrf = (element, index) => {
    const data = { prf_ids: [element.uuid] }
    if (storePrfView[index].products.length === 0) {
      setPrfPanelLoad(true)
      API.Finance.Bill.prfSelectedProducts(data).then(res => {
        console.log(res.data.data)
        if (res.status === 200) {
          setPrfPanelLoad(false)
          storePrfView[index].collapse = false
          storePrfView[index].products = res?.data?.data?.[0].products
          setStorePrfView([...storePrfView])
          handleClick()
        }
      })
    }
  }
  const handlePanelFragmentedPrf = (index) => {
    storePrfView[index].collapse = false
    setStorePrfView([...storePrfView])
    handleClick()
  }
  const calculateHandleAmount = (e, name, index, ind) => {
    if (parseInt(e.target.value) < 0) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { [name]: 0 } } } } })
    } else if (e.target.value.startsWith('0')) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { [name]: 0 } } } } })
    }
    let aQuantity = form.getFieldValue(['prfs', index, 'products', ind, 'bill_quantity'])
    let bAmount = form.getFieldValue(['prfs', index, 'products', ind, 'bill_amount'])
    if (!aQuantity || !bAmount) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': 0 } } } } })
    }
    if (aQuantity === 0 || bAmount === 0) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': 0 } } } } })
    }
    if (aQuantity && bAmount) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'calculate_amount': aQuantity * bAmount } } } } })
      if (form.getFieldValue(['prfs', index, 'products', ind, 'bill_tax_id'])) {
        let cCalcAmount = form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount'])
        const filtered = taxEdv.filter(a => a.uuid === form.getFieldValue(['prfs', index, 'products', ind, 'bill_tax_id']) && a.name)
        let resCalc = cCalcAmount * filtered[0].name / 100
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': resCalc } } } } })
      } else {
        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': 0 } } } } })
      }
    }
  }
  const handleCalcBillEDVAmount = (_, val, index, ind) => {
    if (val === undefined) {
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': 0 } } } } })
    } else {
      let t = form.getFieldValue(['prfs', index, 'products', ind, 'calculate_amount']);
      setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bill_total_tax_amount': val.children[0] * t / 100 } } } } })
    }
  }
  return (
    <div>
      {storePrfView.length === 0
        ?
        <Row style={{ width: '100%' }}>
          <Col span={24} style={{ height: '18vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Məhsul yoxdur" />
          </Col>
        </Row>
        :
        <Collapse accordion>
          {storePrfView?.map((element, index) => (
            element.status === true && <Panel key={index}
              header={<span
                onClick={() => allPrf === 'selected' ? handlePanelSelectedPrf(element, index) : handlePanelFragmentedPrf(index)}
                style={{ display: 'flex', alignItems: 'center' }}>{element.name} {storePrfView[index].collapse && <b style={{ color: 'crimson', marginLeft: '.7rem' }}>Xana açılmalıdır...</b>}</span>}>
              <Col span={24}>
                <Form.Item className='c-form-item' hidden name={['prfs', index, 'id']}>
                  <Input className='c-input' />
                </Form.Item>
                <div >
                  {prfPanelLoad ?
                    <Space size="middle" style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                      <Spin size="large" />
                    </Space>
                    : element?.products?.map((elem, ind) => (
                      <Row key={ind}>
                        <Col span={24}>
                          <Row gutter={12} style={{ height: '75px' }}>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label={`${ind + 1}. Məhsul:`} name={['prfs', index, 'products', ind, 'product_id']} rules={[{ required: false, message: '' }]}>
                                <Select className='c-select' allowClear disabled>
                                  {warehouseProductCategory?.map(item => (
                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Öhdəlik Məhsul:' name={['prfs', index, 'products', ind, 'bill_product_id']} rules={[{ required: false, message: '' }]}>
                                <Select allowClear showSearch
                                  className='c-select'
                                  filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                  onChange={(value,) => getCategoryPropertyDescription(value, index, ind)} placeholder='Seçim edin'>
                                  {warehouseProductCategory?.map(item => (
                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item className='c-form-item' label='Təsnifatı:' name={['prfs', index, 'products', ind, 'description_id']} rules={[{ required: false, message: '' }]}>
                                <Select allowClear disabled
                                  className='c-select'
                                  showSearch
                                  filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                  placeholder='Seçim edin'>
                                  {dependenceState?.[index]?.data?.[ind]?.map(item => (
                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item className='c-form-item' label='Öhdəlik Təsnifatı:' name={['prfs', index, 'products', ind, 'bill_description_id']} rules={[{ required: false, message: '' }]}>
                                <Select allowClear
                                  className='c-select'
                                  showSearch
                                  filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                  placeholder='Seçim edin'>
                                  {dependenceState?.[index]?.data?.[ind]?.map(item => (
                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item className='c-form-item' label='Uçot hesabı:' name={['prfs', index, 'products', ind, 'accounting_account_id']} rules={[{ required: false, message: '' }]}>
                                <TreeSelect
                                  className='c-select'
                                  showSearch
                                  placeholder="Please select"
                                  allowClear
                                  treeDefaultExpandAll
                                  filterTreeNode={(input, option) => option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                  {renderTreeNodes(journalsTop)}
                                </TreeSelect>
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Miqdar:' name={['prfs', index, 'products', ind, 'quantity']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Ölçü vahidi:' name={['prfs', index, 'products', ind, 'unit_idView']} rules={[{ required: false, message: '' }]}>
                                <Select className='c-select' allowClear disabled
                                  showSearch
                                  filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                  placeholder='Seçim edin'>
                                  <Option className='c-select-option' value=''></Option>
                                </Select>
                              </Form.Item>
                              <Form.Item hidden={true} name={['prfs', index, 'products', ind, 'unit_id']}  >
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={12} style={{ height: '75px' }}>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Öhdəlik miqdar:' name={['prfs', index, 'products', ind, 'bill_quantity']} rules={[{ required: false, message: '' }]}>
                                <Input
                                  className='c-input'
                                  onChange={(e) => calculateHandleAmount(e, 'bill_quantity', index, ind)}
                                  type='number' min='0' placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Öhdəlik ölçü vahidi:' name={['prfs', index, 'products', ind, 'bill_unit_id']} rules={[{ required: false, message: '' }]}>
                                <Select allowClear
                                  className='c-select'
                                  showSearch
                                  filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                  placeholder='Seçim edin'>
                                  {itemUnit?.map(item => (
                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Form.Item className='c-form-item' label='Qiymət:' name={['prfs', index, 'products', ind, 'amount']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Form.Item className='c-form-item' label='Məbləğ:' name={['prfs', index, 'products', ind, 'total_amount']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Form.Item className='c-form-item' label='Öhdəlik qiymət:' name={['prfs', index, 'products', ind, 'bill_amount']} rules={[{ required: false, message: '' }]}>
                                <Input
                                  className='c-input'
                                  onChange={(e) => calculateHandleAmount(e, 'bill_amount', index, ind)}
                                  type='number' min='0'
                                  style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Öhdəlik qiymət məbləğ:' name={['prfs', index, 'products', ind, 'calculate_amount']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled style={{ width: '100%', marginRight: '1rem' }} placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='ƏDV dərəcəsi:' name={['prfs', index, 'products', ind, 'tax_idView']}>
                                {form.getFieldValue(['prfs', index, 'products', ind, 'tax_idView']) === null
                                  ?
                                  <b><i>ƏDV-dən azad</i></b>
                                  :
                                  <Select className='c-select' disabled>
                                    <Option className='c-select-option' value=''></Option>
                                  </Select>
                                }
                              </Form.Item>
                              <Form.Item hidden={true} name={['prfs', index, 'products', ind, 'tax_id']} />
                            </Col>
                            <Col span={3}>
                              <Form.Item
                                className='c-form-item'
                                label='Öhdəlik ƏDV dərəcəsi:'
                                name={['prfs', index, 'products', ind, 'bill_tax_id']} rules={[{ required: false, message: '' }]}>
                                <Select
                                  className='c-select'
                                  allowClear
                                  showSearch
                                  onChange={(e, a) => handleCalcBillEDVAmount(e, a, index, ind)}
                                  filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                  placeholder='Seçim edin'>
                                  {taxEdv?.map((item, i) => (
                                    <Option className='c-select-option' key={item.uuid} value={item.uuid}>{item.name} %</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='ƏDV-li məbləğ:' name={['prfs', index, 'products', ind, 'total_tax_amount']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={12} style={{ height: '75px' }}>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Öhdəlik ƏDV-li məbləğ:' name={['prfs', index, 'products', ind, 'bill_total_tax_amount']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item className='c-form-item' label='ƏDV uçotu:' name={['prfs', index, 'products', ind, 'tax_accounting_account_id']} rules={[{ required: false, message: '' }]}>
                                <TreeSelect
                                  className='c-select'
                                  showSearch
                                  placeholder="Please select"
                                  allowClear
                                  treeDefaultExpandAll
                                  filterTreeNode={(input, option) => option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                  {renderTreeNodes(journalsTop)}
                                </TreeSelect>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item label='Bank zəmanətinin müddəti:'>
                                <Space size={0}>
                                  <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'bank_duration']} rules={[{ required: false, message: '' }]}>
                                    <Input className='c-input' min='0' type='number' onChange={(e) => {
                                      if (e.target.value < 0) {
                                        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration': 0 } } } } })
                                      }
                                      if (e.target.value.startsWith('0')) {
                                        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'bank_duration': 0 } } } } })
                                      }
                                    }} placeholder='Daxil edin...' />
                                  </Form.Item>
                                  <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'bank_duration_id']} rules={[{ required: false, message: '' }]}>
                                    <Select className='c-select' allowClear
                                      showSearch
                                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                      placeholder='Seçim edin'>
                                      {bankTime?.map((item, i) => (
                                        <Option className='c-select-option' key={i} value={item.uuid}>{item.name}</Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item label='Təchizatçı zəmanətinin müddəti:'>
                                <Space size={0}>
                                  <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'supplier_guarantee_date_duration supplier_duration_time_id']} rules={[{ required: false, message: '' }]}>
                                    <Input className='c-input' min='0' type='number' onChange={(e) => {
                                      if (e.target.value < 0) {
                                        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'supplier_guarantee_date_duration': 0 } } } } })
                                      }
                                      if (e.target.value.startsWith('0')) {
                                        setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'supplier_guarantee_date_duration': 0 } } } } })
                                      }
                                    }} placeholder='Daxil edin...' />
                                  </Form.Item>
                                  <Form.Item className='c-form-item' name={['prfs', index, 'products', ind, 'supplier_duration_time_id']} rules={[{ required: false, message: '' }]}>
                                    <Select className='c-select' allowClear
                                      showSearch
                                      filterOption={(input, option) => (option?.children.toLowerCase() ?? '').includes(input.toLowerCase())}
                                      placeholder='Seçim edin'>
                                      {bankTime?.map((item, i) => (
                                        <Option className='c-select-option' key={i} value={item.uuid}>{item.name}</Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Qəbul edilən öhdəlik:' name={['prfs', index, 'products', ind, 'accepted_commitment']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' min='0' type='number' onChange={(e) => {
                                  if (e.target.value < 0) {
                                    setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accepted_commitment': 0 } } } } })
                                  }
                                  if (e.target.value.startsWith('0')) {
                                    setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'accepted_commitment': 0 } } } } })
                                  }
                                }} placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Məhsulun miqdar qalığı:' name={['prfs', index, 'products', ind, 'product_remainder_quantity']} rules={[{ required: false, message: '' }]}>
                                <Input className='c-input' disabled min='0' type='number' onChange={(e) => {
                                  if (e.target.value < 0) {
                                    setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_remainder_quantity': 0 } } } } })
                                  }
                                  if (e.target.value.startsWith('0')) {
                                    setItem({ 'prfs': { [index]: { 'products': { [ind]: { 'product_remainder_quantity': 0 } } } } })
                                  }
                                }} placeholder='Daxil edin' />
                              </Form.Item>
                            </Col>
                            <Col span={3}>
                              <Form.Item className='c-form-item' label='Qeyd:' name={['prfs', index, 'products', ind, 'note']}>
                                <Input className='c-input' disabled />
                              </Form.Item>
                            </Col>
                          </Row>
                          <hr />
                        </Col >
                      </Row>
                    ))}
                </div>
              </Col>
            </Panel>
          ))}
        </Collapse>
      }
    </div >
  )
}
export default Index