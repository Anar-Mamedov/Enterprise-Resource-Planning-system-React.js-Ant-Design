import { Axios } from "../../Config";

const Index = {
    required_main_field: (uuid) => {
        return Axios.get(`api/general/setting/required-main-field`, { params: { trn_id: uuid } }).then(res => res)
    },
    disabled_main_field: (uuid) => {
        return Axios.get(`api/general/setting/disabled-main-field`, { params: { trn_id: uuid } }).then(res => res)
    }
}


export default Index;