import { Axios } from "../../Config";

const Index = {
    getSubkontoList: (account) => {
        return Axios.get("api/v1/fn/subkonto/list", { params: { account } }).then(res => res)
    },
    index: (data) => {
        return Axios.get('api/v1/fn/subkonto', { params: { data } }).then(res => res)
    },
    show: (uuid) => {
        return Axios.get(`api/v1/fn/subkonto/${uuid}`).then(res => res)
    },
    update: (uuid, data) => {
        return Axios.put(`api/v1/fn/subkonto/${uuid}`, data).then(res => res)
    },
    store: (data) => {
        return Axios.post('api/v1/fn/subkonto', data).then(res => res)
    },
    activity: (data) => {
        return Axios.patch(`api/v1/fn/subkonto/activity`, data).then(res => res)
    },
}


export default Index;