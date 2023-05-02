import { memo } from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
const { Title } = Typography;

const Index = styled(Title).attrs({
    level: 4
})`
    background-color: transparent;
    width: 100%;
    height: 100%;
    margin: 0;
    font-size:12px !important;
    margin-bottom:0 !important;
    color:#747474 !important;
    padding:10px 0 !important;
`

export default memo(({ onClick, title }) => (
    <Index onClick={onClick}>{title}</Index>
))
