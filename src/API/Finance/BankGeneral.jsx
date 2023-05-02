import { Axios } from "../../Config";

const Index = {
   index: (data) => {
      return Axios.get('api/v1/fn/bank', { params: { data } }).then(res => res)
   },
   bankList: (data) => {
      return Axios.get('api/v1/fn/bank/list', { params: { data } }).then(res => res)
   },
   show: (uuid) => {
      return Axios.get(`api/v1/fn/bank/${uuid}`).then(res => res)
   },
   update: (uuid, data) => {
      return Axios.put(`api/v1/fn/bank/${uuid}`, data).then(res => res)
   },
   destroy: (uuid, data) => {
      return Axios.delete(`api/v1/fn/bank/${uuid}`, data).then(res => res)
   },
   store: (data) => Axios.post('api/v1/fn/bank', data).then(res => res),
   //  getKontoGroupList: (data) => {
   //      return Axios.get("api/v1/fn/picklist/konto_group/list", { params: { data } }).then(res => res)
   //  },
   activity: (data) => {
      return Axios.patch(`api/v1/fn/bank/activity`, data).then(res => res)
   },
   branchUpdate: (data) => Axios.put(`api/v1/fn/bank/branch_status`, data).then(res => res)
}


export default Index;