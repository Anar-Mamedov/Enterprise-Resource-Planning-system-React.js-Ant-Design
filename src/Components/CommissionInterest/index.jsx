import { memo, useState } from 'react'
import styled from 'styled-components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Input, Space, Switch, Typography } from 'antd'
import { FormItem } from '../../Components'
const { Text } = Typography

const _Text = styled(Text).attrs({})`
    width: ${({ message }) => message === 'true' ? '100%' : '60px'};
    display: inline-block;
    ${({ message }) => message === 'true' && 'position: absolute; margin-top: -29px;'}    
`;

const _Switch = styled(Switch).attrs({})`
    zoom: 0.7;
`;

const Index = ({ label, empty, name, onChange, addonAfter }) => {

    const [input, setInput] = useState(true)
    const onShowHidden = value => setInput(value)

    return (
        <>
            <FormItem name={input && name} bottom={0} label={<Space>{label}
                <_Switch defaultChecked
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={onShowHidden}
                    checked={input}
                />
            </Space>}
                onChange={onChange}
            >
                {
                    input &&
                    <Input type='number' placeholder="Please enter user name" addonAfter={<_Text message='false'>{addonAfter}</_Text>} />
                }
            </FormItem>
            {
                !input &&
                <_Text message='true' keyboard>{empty}</_Text>
            }
        </>
    )
}

export default memo(Index)