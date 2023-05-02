import React from 'react'
import { Transfer } from 'antd'
import { BillInsertContext, useContext } from '../../Context/context'
const Index = () => {
    const { prfData, onSelectChange, onChangeTransferList, selectedKeys, targetKeys } = useContext(BillInsertContext)
    return (
        <Transfer
            dataSource={prfData}
            titles={['Auto-complete', 'Selected']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={onChangeTransferList}
            onSelectChange={onSelectChange}
            listStyle={{
                height: 140,
                width: '50%'
            }}
            render={(item) => (
                <span>{item.name}</span>
            )}
        />
    )
}

export default Index