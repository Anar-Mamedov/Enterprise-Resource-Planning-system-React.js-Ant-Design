import React from 'react'
import './style.scss';
import { Col, Typography, Layout, Row } from 'antd';
import { useNavigate } from 'react-router';
const { Text } = Typography;

function Index() {
    const navigate = useNavigate()
    const showEditModal = () => {
        navigate('/finance/accounting/contract-and-appendix')
    }
    return (
        <Layout sytle={{ background: 'transparent' }}>
            <Row className='title' style={{ display: 'flex', marginBottom: '20px' }}>
                <Col span={3}><Text className='statusTitle'>Status</Text></Col>
                <Col span={3}><Text className='statusType'>Gözləmədə</Text></Col>
                <Col onClick={showEditModal} span={3}><Text className='showEditBtn'>Düzəliş et</Text></Col>
            </Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}><Col className='showText' style={{ marginBottom: '3px' }} span={3}><Text type="secondary">Müqavilənin nömrəsi: </Text></Col><Col span={20}><Text>1234567890</Text></Col></Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}><Col className='showText' style={{ marginBottom: '3px' }} span={3}><Text type="secondary">Əlavə tarixi:</Text></Col><Col span={20}><Text>Lorem İpsum</Text></Col></Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}><Col className='showText' style={{ marginBottom: '3px' }} span={3}><Text type="secondary">Məbləğ:</Text></Col><Col span={20}><Text>Lorem İpsum</Text></Col></Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}><Col className='showText' style={{ marginBottom: '3px' }} span={3}><Text type="secondary">Müştəri:</Text></Col><Col span={20}><Text>Lorem İpsum</Text></Col></Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}><Col className='showText' style={{ marginBottom: '3px' }} span={3}><Text type="secondary">Təşkilat:</Text></Col><Col span={20}><Text>Lorem İpsum</Text></Col></Row>
        </Layout >
    )
}

export default Index