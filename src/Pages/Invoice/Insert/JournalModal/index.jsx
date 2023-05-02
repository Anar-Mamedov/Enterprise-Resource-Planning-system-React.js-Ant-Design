import { Button, Modal, Row, Col, Table } from 'antd';
import { InvBankRequistie, Button as MyButton } from "../../../../Components";
import styled from 'styled-components';

const Index = ({ closeJournal, isJournalOpen }) => {

    const data = [
        {
            uuid: '12344un483u24n483',
            key: '12344un483u24n483',
            date: 'deri',
            transaction_name: '341',
            debet: '180',
            credit: '3000',
            amount: '200'
        }
    ]
    const columns = [
        {
            title: 'Tarix',
            dataIndex: 'date',
            key: "date",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: 'Əməliyyatın adı',
            dataIndex: 'transaction_name',
            key: "transaction_name",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: 'Debet',
            dataIndex: 'debet',
            key: "debet",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: 'Credit',
            dataIndex: 'credit',
            key: "credit",
            ellipsis: false,
            width: 170,
            align: 'center'
        },
        {
            title: 'Məbləğ',
            dataIndex: 'amount',
            key: "amount",
            ellipsis: false,
            width: 170,
            align: 'center'
        }
    ]
    return (
        <Modal
            bodyStyle={{ padding: '2rem 0' }}
            onOk={closeJournal}
            onCancel={closeJournal}
            open={isJournalOpen}
            // centered
            width={968}
            footer=''
        >
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </Modal>
    )
}

export default Index;