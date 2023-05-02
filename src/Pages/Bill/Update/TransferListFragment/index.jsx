import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Card, InputNumber, Empty, Typography } from 'antd';
import styles from './styles.module.scss';
import API from '../../../../API'
import { BillUpdateContext, useContext } from '../../Context/context';
const { Text } = Typography;
let scrollTop = 0;
let originalData = [];

const Index = () => {
    const { fragmentedChooseData, prfSelectedProducts, setPrfSelectedProducts, prfDataTransferState, setCollapseKey, setLoading } = useContext(BillUpdateContext);
    const [leftData, setLeftData] = useState([]);
    const [rightData, setRightData] = useState([]);
    const scrollRef = useRef(null);
    const changeCountLeft = (value, ind, i) => {
        if (+value > originalData[ind].product[i].quantity || value === NaN) {
            value = originalData[ind].product[i].quantity;
        }
        leftData[ind].product[i].quantity = parseInt(value);
        setLeftData([...leftData]);
        rightData[ind].product[i].quantity = originalData[ind].product[i].quantity - leftData[ind].product[i].quantity;
        setRightData([...rightData]);
    };
    const handleResetQuantity = () => {
        const updatedData = prfDataTransferState?.map((item) => {
            const updatedProduct = item?.product?.map((product) => {
                return {
                    ...product,
                    quantity: 0
                };
            });
            return {
                ...item,
                product: updatedProduct
            };
        });
        let result = updatedData.map((data) => {
            let products = data?.product?.map((product) => {
                let matchingProduct = fragmentedChooseData.find((item) => item.prf_id === data.uuid && item.product_id === product.uuid);
                if (matchingProduct) {
                    product.quantity += matchingProduct.quantity;
                }
                return product;
            });
            return { ...data, product: products };
        });
        let result2 = prfDataTransferState?.map((data1) => {
            const matchingData2 = result.find((data2) => data2.uuid === data1.uuid);
            if (!matchingData2) {
                return data1;
            }
            const updatedProducts = data1?.product?.reduce((acc, product1) => {
                const matchingProduct2 = matchingData2.product.find(
                    (product2) => product2.uuid === product1.uuid
                );

                if (!matchingProduct2) {
                    acc.push(product1);
                } else {
                    acc.push({
                        ...product1,
                        quantity: product1.quantity - matchingProduct2.quantity,
                    });
                }

                return acc;
            }, []);

            return {
                uuid: data1.uuid,
                name: data1.name,
                product: updatedProducts,
                key: data1.key,
            };
        });
        setRightData(result);
        setLeftData(result2);
    };
    const showFragmentedProducts = () => {
        setCollapseKey(null)
        let data = rightData.map(data => data.product.map(dat => {
            return {
                prf_id: data.uuid,
                product_id: dat.uuid,
                quantity: dat.quantity
            }
        }))
        data = data.flat().filter(a => a.quantity !== 0)
        if (data.length !== 0) {
            prfSelectedProducts.map((el) => {
                el.products = []
                el.status = false
            })
            setLoading(true)
            API.Finance.Bill.prfFragmentedProducts({ 'request': data }).then(res => {
                setLoading(false)
                let prfTabFragment = res?.data?.data.map((item) => {
                    const updatedProducts = item.products.map((product) => {
                        return { ...product, status: true };
                    });
                    return { ...item, products: updatedProducts };
                });
                prfSelectedProducts.forEach((storePrf) => {
                    prfTabFragment?.forEach((prf) => {
                        if (storePrf.uuid === prf.uuid) {
                            storePrf.status = true
                            storePrf.products = prf.products
                        }
                    })
                })
                setPrfSelectedProducts([...prfSelectedProducts])
            })
        } else {
            prfSelectedProducts?.map((el) => {
                el.status = false;
                el.products = []
            })
            setPrfSelectedProducts([...prfSelectedProducts])
        }
    };
    useEffect(() => {
        originalData = [...prfDataTransferState];
        const initialLeftData = prfDataTransferState?.map(item => ({
            ...item,
            product: item?.product?.map(product => ({ ...product }))
        }));
        setLeftData(initialLeftData)
        handleResetQuantity()
    }, [prfDataTransferState]);

    // console.log('prf', prfDataTransferState);
    // console.log('leftData', leftData);
    // console.log('right', rightData);
    // console.log('choosen', fragmentedChooseData);
    return (
        <Row>
            <Col span={24} direction="vertical" size="middle" style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                <Row gutter={24} style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Col style={{ width: '50%' }}>
                        <Card title={<p><span>Avtomatik tamamlama:</span></p>} >
                            <Row>
                                <Col span={24} className={styles.seperateCol} onScroll={(e) => {
                                    scrollTop = e.target.scrollTop
                                    scrollRef.current.scrollTop = scrollTop
                                }}>
                                    {leftData?.length === 0
                                        ?
                                        <span style={{ width: '100%', height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </span>
                                        :
                                        leftData?.map((data, index) => (
                                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                {
                                                    data?.product?.map((dat, ind) => (
                                                        <InputNumber
                                                            key={ind}
                                                            style={{ width: '100%', margin: '.3rem  0' }}
                                                            addonBefore={<span style={{ display: 'inline-block', width: '420px' }}>{data?.name} - {dat?.description?.name}</span>}
                                                            addonAfter={<span style={{ display: 'inline-block', width: '100px' }}>Cəmi: {originalData?.[index]?.product?.[ind]?.quantity}</span>}
                                                            type='number'
                                                            min={0}
                                                            defaultValue={dat?.quantity}
                                                            value={dat?.quantity}
                                                            onChange={(value) => changeCountLeft(value, index, ind)} />
                                                    ))
                                                }
                                            </div>
                                        ))}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col style={{ width: '50%' }}>
                        <Card title={
                            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Seçildi:</span>
                                <Text
                                    onClick={showFragmentedProducts}
                                    className={styles.transferBtn}>Göstər</Text>
                            </p>
                        }>
                            <Row>
                                <Col ref={scrollRef} span={24} className={styles.seperateCol} onScroll={(e) => e.target.scrollTop = scrollTop}>
                                    {rightData?.length === 0
                                        ?
                                        <span style={{ width: '100%', height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </span>
                                        :
                                        rightData?.map((data, index) => (
                                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                {
                                                    data?.product?.map((dat, ind) => (
                                                        <InputNumber
                                                            key={ind}
                                                            disabled
                                                            style={{ width: '100%', margin: '.3rem  0' }}
                                                            addonBefore={<span style={{ display: 'inline-block', width: '420px' }}>{data?.name} - {dat?.description?.name}</span>}
                                                            addonAfter={<span style={{ display: 'inline-block', width: '100px' }}>Cəmi: {originalData?.[index]?.product?.[ind]?.quantity}</span>}
                                                            type='number'
                                                            min={0}
                                                            defaultValue={dat?.quantity}
                                                            value={dat?.quantity}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        ))}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col >
        </Row>
    )
}
export default Index;