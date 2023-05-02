import { memo } from 'react'
import styled from 'styled-components'
import { Badge } from 'antd'

const setColor = (key) => {
    switch (key) {
        case 'draft': return "#4B4B4B"
        case 'pending': return "#FF9F43"
        case 'approved': return "#28C76F"
        case 'rejected': return "#EA5455"
        case 'completed': return "#28C76F"
        case 'order': return "#00CFE8"
        case 'sent': return "#0D6EFD"
        case 'purchase_order': return "#4B4B4B"
        case 'return_order': return "#4B4B4B"
        case 'printed': return "#4B4B4B"
        case 'sent_manager': return "#0D6EFD"
        default: return "transparent"
    }
}

const Index = styled(Badge).attrs(({ name, title }) => ({
    count: title,
    color: setColor(name)
}))`
   min-width:120px;

   .ant-badge-count{
       line-height: 18px;
    }
`

export default memo(Index);

/*
    Qaralama,draft: 54B4B4B FONT-100% BG-12%
    Gözləyən,pending: FF9F43 FONT-100% BG-12%
    Təsdiq edildi,approved: 28C76F FONT-100% BG-12%
    Rədd edildi,rejected: EA5455 FONT-100% BG-12%
    Tamamlandı,completed: 28C76F FONT-100% BG-12%
    Order,order: 00CFE8 FONT-100% BG-12%
    Sent,sent: 28C76F FONT-100% BG-12%
    Purchase-Order,purchase_order: 4B4B4B FONT-100% BG-12%
    Return-order,return_order: 4B4B4B FONT-100% BG-12%
    Printed,printed: 4B4B4B FONT-100% BG-12%
    Menecerə Göndərildi,sent_manager: 28C76F FONT-100% BG-12%
*/