import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Checkbox, Radio, Typography, Collapse, Empty } from 'antd';
const { Text } = Typography
const { Panel } = Collapse;
let temp = [];

const Index = ({ eTaxesCheck, combineData, setCombineData, updateId, valueSelectedPrfs, etaxesData, newProductTab, prfSelectedProducts, allPrf }) => {
    const [value, setValue] = useState(null);
    const onChangeRadio = (e) => setValue(e.target.value);
    const onChangeCheckbox = (e, checkboxValue) => {
        if (e.target.checked) {
            temp?.data?.forEach(val => val.status && val?.etax_products?.forEach(v => {
                if (v.uuid === checkboxValue.uuid) {
                    v.status = true
                }
            }))
            setCombineData({ ...temp })
        } else {
            temp?.data?.forEach(val => val.status && val?.etax_products?.forEach(v => {
                if (v.uuid === checkboxValue.uuid) {
                    v.status = false
                }
            }))
            setCombineData({ ...temp })
        }
    };
    const onChangeRadioEach = (e, radioValue) => {
        setValue(e.target.value);
        temp?.data?.forEach((t, i) => {
            if (t?.bill_product_id === radioValue?.uuid) {
                t.status = true
            } else {
                t.status = false
            }
        })
        setCombineData(temp)
    };
    useEffect(() => {
        temp = []
        valueSelectedPrfs?.forEach((valueSelected) => {
            valueSelected?.products?.forEach((value) => {
                // console.log(value);
                temp.push({
                    'bill_id': updateId,
                    'data': [
                        {
                            status: false,
                            bill_product_name: value?.description?.name,
                            bill_product_name2: value?.description?.attribute?.name,
                            bill_product_id: value?.uuid,
                            bill_product_id2: value?.description?.uuid,
                            etax_products: etaxesData?.items?.map(el => {
                                return {
                                    ...el, status: false
                                }
                            })
                        }
                    ]
                })
            });
        });
        const groupedData = temp.reduce((acc, cur) => {
            const index = acc.findIndex((item) => item.uuid === cur.uuid);
            if (index === -1) {
                acc.push({ bill_id: updateId, data: cur.data });
            } else {
                acc[index].data.push(...cur.data);
            }
            return acc;
        }, []);
        temp = groupedData[0];
        setCombineData(groupedData[0])
    }, [etaxesData])
    console.log('combine', combineData);
    // console.log('etaxesdata', etaxesData);
    console.log('value', valueSelectedPrfs);
    // console.log('curr', eTaxesCheck);
    return (
        <Row>
            <Col>
                <Collapse accordion>
                    <Panel header={<b>E-Taxes Qaiməsi</b>} key="1">
                        <Row>
                            <Col span={10}>
                                {Object.values(etaxesData.labels.etaxes)?.map((el, ind) => (
                                    <Col style={{ borderBottom: '1px solid lightgray' }} key={ind} span={24}> <Text>{ind + 1}. {el ? el : '---'}</Text> </Col>
                                ))}
                                <Col style={{ borderBottom: '1px solid lightgray' }} span={24}> <Text>{Object.values(etaxesData.labels.etaxes).length + 1}. Invoys nömrəsi</Text> </Col>
                            </Col>
                            <Col span={10}>
                                {Object.values(etaxesData.etaxes)?.map((el, ind) => (
                                    <Col style={{ borderBottom: '1px solid lightgray' }} key={ind} span={24}> <Text>{el ? el : '---'}</Text> </Col>
                                ))}
                                <Col style={{ borderBottom: '1px solid lightgray' }} span={24}> <Text>{etaxesData?.eTaxes?.invoice_number ? etaxesData?.eTaxes?.invoice_number : "---"}</Text> </Col>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <Row>
                    <Col span={24} style={{ display: 'flex', padding: '1rem 0 0 0' }}>
                        <Card bordered={false} style={{ width: 500, height: '60vh', overflowY: 'scroll', marginRight: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <Row>
                                <Col span={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                    {
                                        eTaxesCheck === 'contract' && valueSelectedPrfs?.map(valueSelected => (
                                            valueSelected?.products?.map((valueProd, ind) => (
                                                valueProd?.description &&
                                                <Row key={ind} >
                                                    <Col span={24}>
                                                        <Radio.Group onChange={onChangeRadio} value={value}>
                                                            <Radio value={ind} style={{ margin: '0' }} onChange={(e) => onChangeRadioEach(e, valueProd)}><Text style={{ fontSize: '12px' }}>{valueProd?.description?.attribute?.name} / {valueProd?.description?.name}</Text></Radio>
                                                        </Radio.Group>
                                                        <hr />
                                                    </Col>
                                                </Row>
                                            ))
                                        ))
                                    }
                                    {eTaxesCheck === 'cash' && <Empty />}
                                </Col>
                            </Row>
                        </Card>
                        <Card bordered={false} style={{ width: 680, height: '60vh', overflowY: 'scroll', marginRight: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <Row>
                                <Col span={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                    {combineData?.data?.every(a => !a.status) && <Empty />}
                                    {combineData?.data?.map((eTaxes, index) => (
                                        eTaxes?.status && eTaxes?.etax_products?.map((comb, j) => (
                                            <Checkbox defaultChecked={comb?.status} key={j} style={{ margin: '0' }} onChange={(e) => onChangeCheckbox(e, comb)}>
                                                <Text style={{ fontSize: '12px' }}>{comb?.name}</Text>
                                            </Checkbox>
                                        ))
                                    ))}
                                </Col>
                            </Row>
                        </Card>
                        <Card bordered={false} style={{ width: 670, height: '60vh', overflowY: 'scroll', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <Row>
                                <Col span={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                    {eTaxesCheck === 'contract' && combineData?.data?.map((eTaxes, index) => (
                                        eTaxes?.bill_product_name2 &&
                                        <Row key={index}>
                                            <Col span={24}>
                                                <Collapse size="small" accordion>
                                                    <Panel header={eTaxes?.bill_product_name2 + ' - ' + eTaxes?.bill_product_name} key="1">
                                                        {eTaxes?.etax_products?.map((comb, j) => (
                                                            comb?.status &&
                                                            <>
                                                                <Text style={{ display: 'block', fontSize: '12px' }} key={j}>{comb?.name}</Text>
                                                                <hr />
                                                            </>
                                                        ))}
                                                    </Panel>
                                                </Collapse>
                                            </Col>
                                        </Row>
                                    ))}
                                    {eTaxesCheck === 'cash' && <Empty />}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Col >
        </Row >
    )
}
export default Index;