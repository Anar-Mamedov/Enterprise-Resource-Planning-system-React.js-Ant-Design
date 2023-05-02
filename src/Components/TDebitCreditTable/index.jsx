import { memo } from 'react'
import styled from 'styled-components'
import { PieChartOutlined } from '@ant-design/icons'
import { Button, Popover, Space, Typography, Table } from 'antd'
const { Text } = Typography

const _Table = styled(Table).attrs({
    size: 'small',
    pagination: false,
    rowKey: record => record.uuid
})`
    width: 700px;
    height:auto;
    max-height:400px;
    border: 1px solid #b9babd;
    border-radius: 5px;

    thead {
    tr {
        th {
        background-color: #efefef !important;
        &::before {
            height: 100% !important;
            background-color: #ffffff !important;
        }
        }
    }
    }
`;


const columns = [
    {
        title: 'Tarix',
        dataIndex: 'date',
        key: 'date',
        ellipsis: false,
        width: 100,
        align: 'center'
    },
    {
        title: 'Əməliyyatın adı',
        render: data => <Space align='start' direction='vertical'>
            <Text strong={true}>{data.name}</Text>
            <Text disabled={true}>{data.map.join(' / ')}</Text>
        </Space>,
        ellipsis: false,
        width: 250,
        align: 'center'
    },
    {
        title: 'Debit',
        dataIndex: 'debit',
        ellipsis: false,
        width: 100,
        align: 'center'
    },
    {
        title: 'Kredit',
        dataIndex: 'kredit',
        ellipsis: false,
        width: 100,
        align: 'center'
    },
    {
        title: 'Məbləğ',
        dataIndex: 'amount',
        ellipsis: false,
        width: 100,
        align: 'center'
    }
];

const Index = ({ placement, title, showButton, content }) => {

    return (
        <Popover placement={placement} title={title} trigger="click" content={
            <_Table
                columns={columns}
                dataSource={content}
            />
        }>
            <Button icon={<PieChartOutlined />}>{showButton}</Button>
        </Popover>
    )
}

export default memo(Index)