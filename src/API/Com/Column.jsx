import { Axios } from "../../Config";

const Index = {
    list: (data) => {
        return Axios.get('api/v1/com/columns/list', { params: { ...data } }).then(res => res)
    },
    listData: (uuid) => {
        return Axios.get(`api/v1/com/columns/list_data?uuid=${uuid}`).then(res => res)
    },
}

export default Index;