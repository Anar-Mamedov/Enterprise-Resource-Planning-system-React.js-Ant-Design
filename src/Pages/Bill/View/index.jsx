import React from 'react'
import './style.scss';
import { Col, Typography, Layout, Row, Tabs } from 'antd';
import { CheckOutlined, CloseOutlined, EnterOutlined, FileExcelOutlined } from '@ant-design/icons';
const { Text } = Typography;
const TabPane = Tabs.TabPane;
function Index() {
    const callback = (key) => console.log(key);
    const printShow = () => alert('Məhsullar çap edildi');
    const sendToManager = () => alert('Menecere gonderildi');
    return (
        <Layout>
            <Row>
                <Col span={24} style={{ marginBottom: '20px', paddingRight: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#28C76F' }} className='title'>Əsas məlumatlar</Text>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ color: '#28C76F' }} onClick={printShow} className='excelShow'><FileExcelOutlined className='excelIcon' /></Text>
                        <Text className='managerShowBtn' onClick={sendToManager}><EnterOutlined style={{ transform: 'rotate(180deg)', marginRight: '10px' }} />Təsdiq üçün göndər</Text>
                    </div>
                </Col>
            </Row>
            <Row style={{ display: 'inline-block', marginBottom: '3rem' }}>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Qeydiyyat listi: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Təşkilat: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Təchizatçı: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Ödəniş: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Qəbul edən hesab: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Invoyn nömrəsi: </Text><Text>Lorem ipsum</Text>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik yazılışı: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Mühasibatlıq tarixi: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Ödənişin qəbul tarixi: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Ödənişin order nömrəsi: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Valyuta: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Jurnal: </Text><Text>Lorem ipsum</Text>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>İstiqamət: </Text><Text>Lorem ipsum</Text>
                    </Col>
                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>E-taxes: </Text><Text>Lorem ipsum</Text>
                    </Col>
                </Row>
            </Row>
            <Row style={{ display: 'inline-block' }}>
                <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                >
                    <TabPane tab="Mal" key="1">
                        <ol>
                            <li style={{ marginBottom: '2rem' }}>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Mal: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Təsnifatı: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Uçot hesabı: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Ölçü vahidi: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik ölçü: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Miqdar: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik miqdar: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Qiymət: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik qiyməti: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV dərəcəsi: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik ƏDV dərəcəsi: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV-li məbləğ: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV uçotu: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Anbarda qəbul olunmuş: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Bank zəmanətinin müddəti: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Qəbul edilən öhdəlik: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Mal: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Təsnifatı: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Uçot hesabı: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Ölçü vahidi: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik ölçü: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Miqdar: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik miqdar: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Qiymət: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik qiyməti: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV dərəcəsi: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Öhdəlik ƏDV dərəcəsi: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV-li məbləğ: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV uçotu: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Anbarda qəbul olunmuş: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Bank zəmanətinin müddəti: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Qəbul edilən öhdəlik: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                            </li>
                        </ol>
                    </TabPane>
                    {/*  */}
                    <TabPane tab="Jurnal" key="2">
                        <ol>
                            <li style={{ marginBottom: '2rem' }}>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Debet: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Kredit: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Alt hesab: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Məbləğ: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                            </li>
                            <li style={{ marginBottom: '2rem' }}>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Debet: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Kredit: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Alt hesab: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Məbləğ: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                </Row>
                            </li>
                        </ol>
                    </TabPane>
                    {/*  */}
                    <TabPane tab="Əlavə xərc növü" key="3">
                        <ol>
                            <li style={{ marginBottom: '2rem' }}>
                                <Row style={{ marginBottom: '1rem' }}>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Təşkilat: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Növ: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏX Bölünmə: </Text><Text>Lorem ipsum</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Məbləğ: </Text><Text>100</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>Əlavə xərc nömrəsi: </Text><Text>100</Text>
                                    </Col>
                                    <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Text style={{ marginRight: '6px' }} type="secondary" className='label'>ƏDV-dən azad: </Text><Text><CheckOutlined /><CloseOutlined /></Text>
                                    </Col>
                                </Row>
                            </li>
                        </ol>
                    </TabPane>
                    {/*  */}
                </Tabs>
            </Row>
        </Layout>
    )
}

export default Index;