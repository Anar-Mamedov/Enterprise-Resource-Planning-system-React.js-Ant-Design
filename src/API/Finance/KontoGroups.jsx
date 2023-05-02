import { Axios } from "../../Config";

const Index = {
    index: (data) => {
        return Axios.get('api/v1/fn/picklist/konto_group', { params: { data } }).then(res => res)
    },
    show: (uuid) => {
        return Axios.get(`api/v1/fn/picklist/konto_group/${uuid}`).then(res => res)
    },
    update: (uuid, data) => {
        return Axios.put(`api/v1/fn/picklist/konto_group/${uuid}`, data).then(res => res)
    },
    store: (data) => {
        return Axios.post('api/v1/fn/picklist/konto_group', data).then(res => res)
    },
    getKontoGroupList: (data) => {
        return Axios.get("api/v1/fn/picklist/konto_group/list", { params: { data } }).then(res => res)
    },
    activity: (data) => {
        return Axios.patch(`api/v1/fn/picklist/konto_group/activity`, data).then(res => res)
    },
}


export default Index;