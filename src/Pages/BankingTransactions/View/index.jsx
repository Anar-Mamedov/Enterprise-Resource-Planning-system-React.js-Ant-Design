import React from 'react'
import style from './style.module.scss'
import styled from 'styled-components';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Row, Col, Divider, Typography } from 'antd'
import { Description, Status } from '../../../Components'

const Title = styled(Typography.Title)`margin-top:0;`

const Index = () => {
    return (
        <Row className={style.content}>
            <Col span={20}>
                <Title level={3}>İnformasiyaların siyahısı</Title>
            </Col>
            <Col span={4}>
                <Button icon={<HomeOutlined />}>Ana Səhifə</Button>
            </Col>
            <Divider />
            <Col span={24}>
                <Row align='middle'>
                    <Col span={15}>
                        <Divider orientation="left">Əsas məlumatlar</Divider>
                    </Col>
                    <Col span={9} align='center'>
                        <Description top={0} title='Status'>
                            <Status name="draft" title="Qaralama" />
                        </Description>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={16}>
                    <Col span={2}>
                        <Description left={0} title='№' children="1" />
                    </Col>

                    <Col span={22}>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Description title='Qəbul edən' children="Təşkilat" />
                            </Col>
                            <Col span={12}>
                                <Description title='Qəbul edən bank' children="Kapital bank" />
                            </Col>
                            <Col span={12}>
                                <Description title='Debit hesab' children="" />
                            </Col>
                            <Col span={12}>
                                <Description title='Kredit hesab' children="1234567890" />
                            </Col>

                            <Col span={12}>
                                <Description title='Sənədin tarixi' children="11.11.2023" />
                            </Col>
                            <Col span={12}>
                                <Description title='Xərc maddəsi' children="Maddə 1" />
                            </Col>
                            <Col span={12}>
                                <Description title='Cavabdeh şəxs' children="Aliye Avaz" />
                            </Col>
                            <Col span={12}>
                                <Description title='Layihə' children="Lorem ipsum" />
                            </Col>

                            <Col span={12}>
                                <Description title='Təyinat' children="Lorem" />
                            </Col>
                            <Col span={12}>
                                <Description title='Əməliyyatın hərəkəti' children="Lorem ipsum" />
                            </Col>
                            <Col span={12}>
                                <Description title='Müqavilə' children="Lorem ipsum" />
                            </Col>
                            <Col span={12}>
                                <Description title='Lokal məbləğ' children="Lorem ipsum" />
                            </Col>

                            <Description title='Qeyd' children="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, eligendi saepe temporibus eum laboriosam earum alias? Quasi vero pariatur quisquam, ducimus fugiat vel molestiae neque ullam maiores deserunt autem repellat." />
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Divider orientation="left">Banka nəğd əmanətin qoyulması</Divider>
            </Col>
            <Col span={24}>
                <Row gutter={16}>
                    <Col span={2}>
                        <Description left={0} children="1" />
                    </Col>

                    <Col span={22}>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Description title='Göndərən' children="AT-Geotech" />
                            </Col>
                            <Col span={12}>
                                <Description title='Kassa' children="Lorem ipsum" />
                            </Col>
                            <Col span={12}>
                                <Description title='Təsisçi' children="Lorem ipsum" />
                            </Col>

                            <Col span={12}>
                                <Description title='Məbləğ' children="500000" />
                            </Col>
                            <Col span={12}>
                                <Description title='Bank komissiya faizi' children="10%" />
                            </Col>
                            <Col span={12}>
                                <Description title='Debit' children="1234567890" />
                            </Col>

                            <Col span={12}>
                                <Description title='Kredit' children="123456789" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Index
