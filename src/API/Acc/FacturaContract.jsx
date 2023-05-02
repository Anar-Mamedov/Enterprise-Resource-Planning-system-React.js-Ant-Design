import { Axios } from "../../Config";

const Index = {
    index: (data) => Axios.get('api/v1/acc/factura-contract', { params: { data } }).then(res => res),
    show: (uuid) => Axios.get(`api/v1/acc/factura-contract/${uuid}`).then(res => res),
    update: (uuid, data) => Axios.put(`api/v1/acc/factura-contract/${uuid}`, data).then(res => res),
    store: (data) => Axios.post('api/v1/acc/factura-contract', data).then(res => res),
    productCategory: (data) => Axios.get('api/v1/acc/factura-contract/product-category', { params: { ...data } }).then(res => res),
    deleteItem: (uuid) => Axios.patch(`api/v1/acc/factura-contract/delete-item/${uuid}`).then(res => res),
    activity: (data) => Axios.patch(`api/v1/acc/factura-contract/activity`, data).then(res => res)
}

export default Index;