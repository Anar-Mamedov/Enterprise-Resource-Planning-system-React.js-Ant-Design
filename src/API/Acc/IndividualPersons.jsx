
import { Axios } from "../../Config";

const Index = {
    list: (data) => Axios.get("api/v1/acc/individual_persons/list", { params: { data: JSON.stringify(data) } }).then(res => res)
}

export default Index;