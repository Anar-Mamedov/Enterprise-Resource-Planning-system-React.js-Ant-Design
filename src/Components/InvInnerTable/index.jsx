import { Table, Row, Col, Divider, Input, Form, Select } from "antd";
import { AccTransSubField } from '../index'
import { Languages } from "../../Config";
const innerText = Languages.SelectLanguage("Invoice")

const Index = ({ isEdit }) => {
    const data = [
        {
            uuid: '12344un483u24n483',
            key: '12344un483u24n483',
            details: 'deri',
            quantity: '341',
            price: '180',
            tax_value: '3000',
            amount: '200',
            payment: '1560',
            currency: 'AZN'
        }
    ]
    const columns = [
        {
            title: innerText.inner_table[0],
            dataIndex: 'details',
            key: "details",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: innerText.inner_table[1],
            dataIndex: 'quantity',
            key: "quantity",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: innerText.inner_table[2],
            dataIndex: 'price',
            key: "price",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: innerText.inner_table[3],
            dataIndex: 'tax_value',
            key: "tax_value",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: innerText.inner_table[4],
            dataIndex: 'amount',
            key: "amount",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: innerText.inner_table[5],
            dataIndex: 'payment',
            key: "payment",
            ellipsis: false,
            width: 170,
            align: 'center',
            render: () => (
                !isEdit ? (
                    // <Form.Item>
                    <Input />
                    // </Form.Item>
                ) : (
                    <>120</>
                )

            )
        },
        {
            title: innerText.inner_table[6],
            dataIndex: 'currency',
            key: "currency",
            ellipsis: false,
            width: 170,
            align: 'center',
            render: () => (
                !isEdit ? (
                    <Form.Item style={{ margin: 0 }} rules={[{ required: true, message: innerText.error_insert_date }]}>
                        <Select placeholder={innerText.select_placeholder} />
                    </Form.Item>
                ) : (
                    <>20</>
                )
            )
        }
    ]
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            // bordered
            />
            <Row justify='space-between' style={{ marginTop: '1rem' }}>
                <AccTransSubField title={innerText.total_amount} value='132 AZN' />
                <AccTransSubField title={innerText.total_payment_amount} value='232 AZN' />
                <AccTransSubField title={innerText.residue_amount} value='55 AZN' />
            </Row>
            <Divider />
        </>
    )
}

export default Index;