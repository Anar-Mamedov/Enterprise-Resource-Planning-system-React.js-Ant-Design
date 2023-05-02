import { useState } from 'react';
import { Modal, Button, Space, Row, Col, Collapse, Tooltip, Empty, Typography } from 'antd';
import { BillUpdateContext, useContext } from '../../Context/context';
import { MinusOutlined } from '@ant-design/icons';
import FileInput from '../FileInput';
import EtaxesSelects from '../EtaxesSelects';
import API from '../../../../API';
const { Panel } = Collapse;
const { Text } = Typography;
const Index = () => {
    const { eTaxesCheck, openModal, setOpenModal, newProductTab, prfSelectedProducts, allPrf, valueSelectedPrfs, updateId } = useContext(BillUpdateContext);
    const [etaxesData, setEtaxesData] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [combineData, setCombineData] = useState(null);
    const [openShowModal, setOpenShowModal] = useState(false);
    const [showModalData, setShowModalData] = useState(null)
    const handleOk = () => {
        let temporary = { ...combineData }
        console.log('temporary', temporary);
        const output = {
            bill_id: temporary.bill_id,
            data: temporary.data.map((item) => ({
                bill_product_id: item.bill_product_id,
                etax_products: item.etax_products
                    .filter((etax) => etax.status)
                    .map((etax) => ({
                        ...etax
                    }))
            }))
        };
        const filteredData = {
            bill_id: output.bill_id,
            ...etaxesData?.etaxes,
            type: allPrf,
            data: output.data.filter(item => item.etax_products.length > 0)
        };
        console.log(filteredData);
        setConfirmLoading(true);
        API.Finance.Bill.eTaxesMerging(filteredData).then(res => {
            console.log(res);
            if (res?.status === 201) {
                setEtaxesData(null);
                setOpenModal(false);
                setConfirmLoading(false);
            } else {
                setConfirmLoading(false);
            }
        })
    };
    const handleCancel = () => {
        setOpenModal(false);
        setEtaxesData(null)
    };
    const handleCancelShow = () => {
        setOpenShowModal(false)
    };
    const handleGetShowEtaxes = () => {
        API.Finance.Bill.eTaxesShow(updateId).then(res => {
            setShowModalData(res.data.data);
        })
        setOpenShowModal(true)
        setOpenModal(false)
    };
    const handleDeleteEtaxes = () => {
        API.Finance.Bill.eTaxesDelete(updateId).then(res => {
            if (res.status === 200) {
                setOpenShowModal(false)
            }
        })
    }
    // console.log(showModalData);
    return (
        <>
            <Modal
                title='E-Taxes'
                open={openModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText='Birləşdir'
                cancelText="Bağla"
                width={etaxesData ? 1800 : 800}
                style={etaxesData && { top: 20 }}
                bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <>
                    {etaxesData
                        ?
                        <EtaxesSelects eTaxesCheck={eTaxesCheck} combineData={combineData} setCombineData={setCombineData} updateId={updateId} allPrf={allPrf} valueSelectedPrfs={valueSelectedPrfs} prfSelectedProducts={prfSelectedProducts} newProductTab={newProductTab} etaxesData={etaxesData} />
                        :
                        <Space>
                            <Button onClick={() => handleGetShowEtaxes()} type='primary'>Fayllara bax</Button>
                            <FileInput setEtaxesData={setEtaxesData} />
                        </Space>

                    }
                </>
            </Modal >
            <Modal title='E-Taxes Məlumatları'
                open={openShowModal}
                onCancel={handleCancelShow}
                width={1500}
                footer={['']} >
                {showModalData ? <>
                    <Collapse accordion>
                        <Panel header={<b style={{ color: '#28a745' }}>E-Taxes Qaiməsi</b>} key="1">
                            <Row>
                                <Col span={10}>
                                    <Row>
                                        <Col span={24}>Alan tərəfin adı</Col>
                                        <Col span={24}>Alan tərəfin VÖEN-i</Col>
                                        <Col span={24}>Satan tərəfin adı</Col>
                                        <Col span={24}>Qaimə nömrəsi</Col>
                                        <Col span={24}>Satan tərəfin VÖEN-i</Col>
                                        <Col span={24}>Malların cəmi qiyməti</Col>
                                        <Col span={24}>Malların aksiz cəmi məbləği</Col>
                                        <Col span={24}>Malların cəmi məbləği</Col>
                                        <Col span={24}>Malların ƏDV-yə cəlb edilən cəmi məbləği</Col>
                                        <Col span={24}>Malların ƏDV-yə cəlb edilməyən cəmi məbləği</Col>
                                        <Col span={24}>ƏDV-dən azan olunan</Col>
                                        <Col span={24}>Malların ƏDV-yə 0 dərəcə ilə cəlb edilən cəmi məbləği</Col>
                                        <Col span={24}>Malların cəmi ödənməli ƏDV məbləği</Col>
                                        <Col span={24}>Yekun məbləğ</Col>
                                        <Col span={24}>Qeyd</Col>
                                        <Col span={24}>Əlavə qeyd</Col>
                                        <Col span={24}>İnvoys nömrəsi</Col>
                                    </Row>
                                </Col>
                                <Col span={10}>
                                    <Row>
                                        <Col span={24}>{showModalData?.recipient_name ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.recipient_voen ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.seller_name ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.invoice_number ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.seller_voen ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_price ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_tax_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_edv_involved_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_edv_not_involved_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_edv_freed_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_edv_attracted_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.products_total_edv_payable_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.total_amount ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.note ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.additional_note ?? '---'}</Col>
                                        <Col span={24}>{showModalData?.invoice_number ?? '---'}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                    <Row style={{ marginTop: '1rem' }}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Tooltip placement='left' title="sil">
                                <Button onClick={() => handleDeleteEtaxes()} danger type="primary" icon={<MinusOutlined />} >Birləşməni sil</Button>
                            </Tooltip>
                        </Col>
                        {showModalData?.items?.map((item, index) => (
                            <Col key={index} span={24} style={{ margin: '.7rem 0' }}>
                                <Text type="primary">{item?.data && `${item?.data?.product?.description?.attribute?.name} ' / ' ${item?.data?.product?.description?.name}`} - {item?.item_name}</Text>
                            </Col>
                        ))}
                    </Row>
                </> : <Empty description="Məlumat yoxdur..." />}
            </Modal >
        </>
    );
};
export default Index;