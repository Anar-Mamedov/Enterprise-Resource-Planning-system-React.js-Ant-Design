import { Axios } from "../../Config";

const Index = {
    index: (data) => {
        return Axios.get('api/v1/fn/account_transaction', { params: { data } }).then(res => res)
    },
    show: (uuid) => {
        return Axios.get(`api/v1/fn/account_transaction/${uuid}`).then(res => res)
    },
    update: (uuid, data) => {
        return Axios.put(`api/v1/fn/account_transaction/${uuid}`, data).then(res => res)
    },
    store: (data) => {
        return Axios.post('api/v1/fn/account_transaction', data).then(res => res)
    },
    delete: (uuid) => {
        return Axios.delete(`api/v1/fn/account_transaction/${uuid}`).then(res => res)
    },
    journals: (data) => {
        return Axios.get('api/v1/fn/account_transaction/journals', { params: { data } }).then(res => res)
    }
}


export default Index;