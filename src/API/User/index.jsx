import { Axios } from "../../Config";
import axios from "axios";
import moment from "moment";
// const date = new Date()
// const prettyDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
const date = moment()
const prettyDate = date.format('DD.MM.YYYY')
const Index = {
    getCurrencies: (data) => axios.get(`api/general/general/convert`, { params: { ...data } }).then(res => res)
}

export default Index