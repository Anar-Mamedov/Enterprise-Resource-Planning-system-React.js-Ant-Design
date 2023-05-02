import { memo, useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Select, Space, Switch, Typography, Row, Col, Input } from 'antd'
import { FormItem } from '../../Components'
const { Text } = Typography

const _Text = styled(Text).attrs({})`
    width: 100%;
    display: inline-block;
    position: absolute;
    margin-top: -29px; 
`;

const _Switch = styled(Switch).attrs({})`
        zoom: 0.7;
`;

const Index = ({ label, options, empty, name, onChange, addonAfter }) => {

    const [input, setInput] = useState(true)
    const onShowHidden = value => setInput(value)

    return (
        <Row>
            <Col span={16}>
                <FormItem name={input && name} bottom={0} label={<Space>{label}
                    <_Switch defaultChecked
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={onShowHidden}
                        checked={input}
                    />
                </Space>}

                >
                    {
                        input &&
                        <Select allowClear={true} showSearch={true}
                            optionFilterProp="children"
                            placeholder="Zəhmət olmazsa seçim edin"
                            options={options}
                            onChange={onChange}
                        />
                    }
                </FormItem>
            </Col>
            <Col span={input ? 8 : 24} style={{ border: 1 }}>
                {
                    input &&
                    <FormItem bottom={0} label={false} top={30}>
                        <Input style={{ textAlign: 'center' }} disabled={true} value={addonAfter} />
                    </FormItem>
                }
                {
                    !input &&
                    <_Text keyboard>{empty}</_Text>
                }
            </Col>
        </Row>
    )

}

export default memo(Index)