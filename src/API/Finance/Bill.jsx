import { Axios } from "../../Config";

const Index = {
    contracts: (data) => {
        return Axios.get('api/v1/fn/bill/contracts', { params: { data } }).then(res => res)
    },
    receivingAccount: (data) => {
        return Axios.get('api/v1/fn/bill/receiving_account', { params: { data } }).then(res => res)
    },
    journals: (data) => {
        return Axios.get('api/v1/fn/bill/journals', { params: { data } }).then(res => res)
    },
    getPRF: (data) => {
        return Axios.get('api/v1/fn/bill/prf', { params: { data } }).then(res => res)
    },
    prfSelectedProducts: (data) => {
        return Axios.post('api/v1/fn/bill/selected-products', { ...data }).then(res => res)
    },
    prfFragmentedProducts: (data) => {
        return Axios.post('api/v1/fn/bill/fragmented-products', { ...data }).then(res => res)
    },
    warehouseProductCategory: (data) => {
        return Axios.get('api/v1/fn/bill/product-category', { ...data }).then(res => res)
    },
    store: (data) => {
        return Axios.post('api/v1/fn/bills', data).then(res => res)
    },
    eTaxesMerging: (data) => {
        return Axios.post('api/v1/fn/bill/etaxes', data).then(res => res)
    },
    eTaxesShow: (uuid) => {
        return Axios.get(`api/v1/fn/bill/etaxes/${uuid}`).then(res => res)
    },
    eTaxesDelete: (uuid) => {
        return Axios.delete(`api/v1/fn/bill/etaxes/${uuid}`).then(res => res)
    },
    additionExpensesDelete: (data) => {
        return Axios.delete('api/v1/fn/bill/activity', { data: JSON.stringify(data) }).then(res => res)
    },
    index: (data) => {
        return Axios.get('api/v1/fn/bills', { params: { data } }).then(res => res)
    },
    show: (uuid) => {
        return Axios.get(`api/v1/fn/bills/${uuid}`).then(res => res)
    },
    update: (uuid, data) => {
        return Axios.put(`api/v1/fn/bills/${uuid}`, data).then(res => res)
    },
    getPRFExpenses: (data) => {
        return Axios.get('api/v1/fn/bill/addition-expenses', { params: { data } }).then(res => res)
    },
    // activity: (data) => {
    //     return Axios.patch(`api/v1/fn/bills/activity`, data).then(res => res)
    // },
}


export default Index;