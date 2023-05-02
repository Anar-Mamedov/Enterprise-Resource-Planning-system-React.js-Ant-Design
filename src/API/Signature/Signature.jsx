import { Axios } from "../../Config";

const Index = {
    show: (uuid) => {
        return Axios.get(`api/v2/com/signature/${uuid}`).then(res => res)
    },
    store: (data) => {
        return Axios.post('api/v2/com/signature', data).then(res => res)
    },
    reject: (data) => {
        return Axios.post('api/v2/com/signature/reject', data).then(res => res)
    },
    return: (data) => {
        return Axios.post('api/v2/com/signature/return', data).then(res => res)
    }
}


export default Index;