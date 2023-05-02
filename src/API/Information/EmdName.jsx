import { Axios } from "../../Config";

const Index = {
    list: (data) => {
        return Axios.get("api/v1/hr/info/emd-name/list", { params: { ...data } }).then(res => res)
    },
    TehtelAccount: (data) => Axios.get("api/v1/hr/info/emd-name/tehtel_account", { params: { data: JSON.stringify(data) } }).then(res => res),
}

export default Index;


