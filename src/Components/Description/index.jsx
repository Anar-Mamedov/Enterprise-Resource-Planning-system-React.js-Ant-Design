import { memo } from 'react'
import styled from 'styled-components'
import { Space, Typography } from 'antd'
const { Title, Text } = Typography

const _Space_ = styled(Space).attrs(({ wrap }) => ({
    wrap: wrap == null ? true : wrap
}))`
    margin-top:${({ top }) => (top || top === 0) ? top : 10}px;
    margin-right:${({ right }) => right}px;
    margin-bottom:${({ bottom }) => bottom}px;
    margin-left:${({ left }) => (left || left === 0) ? left : 30}px;
`

const _Title_ = styled(Title).attrs(({ children }) => ({
    level: 5,
    children: Boolean(children) && children + ":"
}))`
    margin:0;
    margin-bottom:0 !important;
    color:#B9B9C3 !important;
`
const _Text_ = styled(Text).attrs(({ children }) => ({
    italic: true,
    type: children ? "default" : "danger",
    children: children || "Yoxdur"
}))`
    color:#4B4B4B;
`


export default memo(({ title, children, direction, wrap, top, right, bottom, left }) => {

    return (
        <_Space_ direction={direction} wrap={wrap} top={top} right={right} bottom={bottom} left={left}>
            <_Title_>{title}</_Title_>
            <_Text_>{children}</_Text_>
        </_Space_>
    )
})
