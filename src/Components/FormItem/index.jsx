import { memo } from 'react'
import styled from 'styled-components'
import { Form } from 'antd'

const Index = styled(Form.Item).attrs({

})`

margin-top:${({ top }) => top}px !important;
margin-right:${({ right }) => right}px !important;
margin-bottom:${({ bottom }) => bottom}px !important;
margin-left:${({ left }) => left}px !important;

.ant-form-item-label{
  display:${({ label }) => !label && 'none !important'};
}
`

export default memo(Index)