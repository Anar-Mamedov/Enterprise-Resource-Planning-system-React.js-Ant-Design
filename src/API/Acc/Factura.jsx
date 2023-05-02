
import { Axios } from "../../Config";

const Index = {
    list: (data) => Axios.get("api/v1/acc/factura/list", { params: { ...data } }).then(res => res)
}

export default Index;