import { memo } from 'react'
import styled from 'styled-components'
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';


const Index = styled(Button).attrs({
    type: "text",
    size: "small",
    block: true,
    icon: <FilterOutlined style={{ color: '#747474' }} />
})`
    background-color: transparent;

    &:hover{
        background-color:#B6B7BA !important;
    }
`
export default memo(Index)
