import { Axios } from "../../Config";

const Index = {
    list: (data) => {
        return Axios.get('api/v1/com/project/list', { params: { ...data } }).then(res => res)
    }
}

export default Index;