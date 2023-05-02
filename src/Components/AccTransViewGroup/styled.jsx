import styled from 'styled-components';
import { Layout, Row, Col, Button, Input, Form, Typography, Divider } from 'antd';

const InputRow = styled(Row).attrs({

})`
    background: red
`
const InputR = (children) => {
    return (
        <InputRow>{children}</InputRow>
    )
}

export default {
    InputR
}