import { Axios } from "../../Config";

const Index = {
  distribution: (data) => {
    return Axios.get("api/v1/pro/picklist/distribution/list", { params: { data } }).then((res) => res);
  },
  list: (data) => {
    return Axios.get("api/v1/pro/picklist/prf-pl-addition-expences-type/list", { params: { data } }).then((res) => res);
  },
  // contractPredmentList: (data) => {
  //     return Axios.get("api/v1/pro/picklist/contract_predment/list", { params: { data } }).then(res => res)
  // },
  // contractPredmentStore: (data) => {
  //     return Axios.post("api/v1/pro/picklist/contract_predment", data).then(res => res)
  // },
  contractPayment: (data) => {
    return Axios.get("api/v1/pro/picklist/contract_payment/list", { params: { data } }).then((res) => res);
  },
  contractType: (data) => {
    return Axios.get("api/v1/pro/picklist/contract_type/list", { params: { data } }).then((res) => res);
  },
  deliveryCondination: (data) => {
    return Axios.get("api/v1/pro/picklist/delivery_condition/list", { params: { data } }).then((res) => res);
  },
};

export default Index;
