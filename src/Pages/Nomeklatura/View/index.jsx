import React from 'react'
import './style.scss';
import { Col, Typography, Layout, Row } from 'antd';
const { Text } = Typography;

function Index() {
    return (
        <Layout sytle={{ background: 'transparent' }}>
            <Row>
                <Col span={24} style={{ marginBottom: '20px', paddingRight: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                    <Text type='success' className='title'>Əsas məlumatlar</Text>
                </Col>
            </Row>
            <Row style={{ marginBottom: '2rem' }}>
                <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ marginRight: '6px' }} type="secondary">Təşkilat: </Text><Text>Resource Planing</Text>
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ marginRight: '6px' }} type="secondary">Nomeklatura: </Text><Text>Məhsul 2</Text>
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ marginRight: '6px' }} type="secondary">Anbar: </Text><Text>Mərkəzi</Text>
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ marginRight: '6px' }} type="secondary">Anbarın ünvanı: </Text><Text>Xırdalan</Text>
                </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Col style={{ border: '1px solid lightgray', width: '49%', marginBottom: '2rem', borderRadius: '5px', padding: '10px' }}>
                    <Row>
                        <Col>
                            <Text>Maliyyə uçotunun hesabları:</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '1rem 0' }}>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Uçot hesabı: </Text><Text style={{ marginRight: '20px' }}>12345</Text>
                            <Text style={{ marginRight: '4px' }} type="secondary">Uçot hesab transferi: </Text><Text>12345</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Sifarişdən gələn gəlirlərin uçotu: </Text><Text style={{ marginRight: '20px' }}>12345</Text>
                            <Text style={{ marginRight: '4px' }} type="secondary">Xərclərin uçot hesabı: </Text><Text>12345</Text>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ border: '1px solid lightgray', width: '49%', marginBottom: '2rem', borderRadius: '5px', padding: '10px' }}>
                    <Row>
                        <Col>
                            <Text>Vergi uçotunun hesabları:</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '1rem 0' }}>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Uçot hesabı: </Text><Text style={{ marginRight: '20px' }}>12345</Text>
                            <Text style={{ marginRight: '4px' }} type="secondary">Uçot hesab transferi: </Text><Text>12345</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Sifarişdən gələn gəlirlərin uçotu: </Text><Text style={{ marginRight: '20px' }}>12345</Text>
                            <Text style={{ marginRight: '4px' }} type="secondary">Xərclərin uçot hesabı: </Text><Text>12345</Text>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ border: '1px solid lightgray', width: '49%', marginBottom: '2rem', borderRadius: '5px', padding: '10px' }}>
                    <Row>
                        <Col>
                            <Text>ƏDV uçot hesabları:</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '1rem 0' }}>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Təqdim edilmiş ƏDV uçot hesabı: </Text><Text style={{ marginRight: '20px' }}>12345</Text>
                            <Text style={{ marginRight: '4px' }} type="secondary">Satış üzrə uçot hesabı: </Text><Text>12345</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Gömrük üzrə uçot hesabı: </Text><Text>12345</Text>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ border: '1px solid lightgray', width: '49%', marginBottom: '2rem', borderRadius: '5px', padding: '10px' }}>
                    <Row>
                        <Col>
                            <Text>Sifarişçi materiallarının uçot hesabı:</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '1rem 0' }}>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Emala qəbul olunmuş materiallar: </Text><Text>Lorem ipsum dolor sit amet</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{ marginRight: '4px' }} type="secondary">Sifarişçinin istehsalatda olan materialları: </Text><Text>Lorem ipsum dolor sit amet</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout>
    )
}

export default Index