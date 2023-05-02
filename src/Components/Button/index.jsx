import { memo } from 'react'
import styled from 'styled-components'
import { Button } from 'antd';


const Index = styled(Button).attrs({

})`
    min-width: ${({ children }) => children ? 100 : 70}px !important;
    ${({ green }) => green ? {
        "color": "#28C76F!important",
        "border-color": "#28C76F!important"
    } : {
        "color": "'#83868B!important'",
        "border-color": "#83868B!important"
    }};
    ${({ active }) => active && {
        "background-color": "#28C76F!important",
        "color": "#FFFFFF !important",
        "border-color": "#75C974 !important"
    }};
    &:hover{
        color:#FFFFFF !important;
        border-color:#75C974 !important;
        background-color:#75C974;        
    }
`

export default memo(Index)