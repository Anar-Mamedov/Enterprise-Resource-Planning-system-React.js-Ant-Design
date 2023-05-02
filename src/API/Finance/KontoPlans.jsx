import { Axios } from "../../Config";

const Index = {
    getKontoPlan: (data) => {
        return Axios.get("api/v1/fn/konto-plans", { params: { data } }).then(res => res)
    },
    getKontoPlanParents: (data) => {
        return Axios.get("api/v1/fn/konto-plans/parents", { params: { data } }).then(res => res)
    },
    store: (data) => {
        return Axios.post('api/v1/fn/konto-plans', data).then(res => res)
    },
    update: (uuid, data) => {
        return Axios.put(`api/v1/fn/konto-plans/${uuid}`, data).then(res => res)
    },
    show: (uuid) => {
        return Axios.get(`api/v1/fn/konto-plans/${uuid}`).then(res => res)
    },
    activity: (data) => {
        return Axios.patch(`api/v1/fn/konto-plans/activity`, data).then(res => res)
    },
    algorithm: (data) => {
        return Axios.get(`api/v1/fn/konto-plan/algorithm`, { params: { data } }).then(res => res)
    },
    delete: (uuid) => {
        return Axios.delete(`api/v1/fn/konto-plan/delete/${uuid}`).then(res => res)
    }
}


export default Index;