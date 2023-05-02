import { Button, Modal, Row, Col } from 'antd';
import { InvBankRequistie, Button as MyButton } from "../../../../Components";
import styled from 'styled-components';
import { Languages } from '../../../../Config';
const innerText = Languages.SelectLanguage("Invoice")
const MyModal = styled(Modal).attrs({})`
    .ant-modal-content {
        border: none;
        border-radius: 3px;
        // height: 250px;

        .ant-modal-body {
            // height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
`

const Index = ({ isBankRequisiteOpen, closeBankRequisite }) => {
    return (
        <Modal
            onOk={closeBankRequisite}
            onCancel={closeBankRequisite}
            open={isBankRequisiteOpen}
            centered
            width={968}
            footer={
                <Row gutter={8} justify='end'>
                    <Col>
                        <MyButton>{innerText.btn_save}</MyButton>
                    </Col>
                    <Col>
                        <MyButton onClick={closeBankRequisite}>{innerText.btn_cancel}</MyButton>
                    </Col>
                </Row>
            }
        >
            <InvBankRequistie />
        </Modal>
    )
}

export default Index;