import { Axios } from "../../Config";

const Index = {
    list: (data) => Axios.get("api/v1/fn/cash-box-list/list", { params: { data: JSON.stringify(data) } }).then(res => res),
}


export default Index;