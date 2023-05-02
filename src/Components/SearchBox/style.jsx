import React, { memo } from 'react'
import { Collapse, Input, Col } from "antd";
import styled from 'styled-components'

const Index = styled(Collapse).attrs({

})`

.ant-collapse {
    border: none !important;
    width: 10% !important;
    margin:0 auto !important;
}

.ant-collapse-header {
    display: none !important;
}

.ant-collapse-content-box {
    padding: 3px;
}
.ant-input{
    height:37px
}
`


export default memo(({ activeKey, showArrow, tagKey, onChange }) => {

    return (
        <Index activeKey={activeKey}>
            <Collapse.Panel showArrow={showArrow} key={tagKey}>
                <Input.Search
                    placeholder="Search..."
                    enterButton="Search"
                    size="large"
                    onChange={onChange}
                />
            </Collapse.Panel>
        </Index>
    )
})