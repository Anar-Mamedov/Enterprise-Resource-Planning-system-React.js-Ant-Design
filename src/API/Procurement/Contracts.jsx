import { Axios } from "../../Config";

const Index = {
  Contract: {
    list: (data) => {
      return Axios.get("api/v1/pro/contracts/contract/list", { params: { filter: JSON.stringify(data) } }).then((res) => res);
    },
    store: (data) => {
      return Axios.post("api/v1/pro/contracts/contract", data).then((res) => res);
    },
    index: (data) => {
      return Axios.get("api/v1/pro/contracts/contract", { params: { data } }).then((res) => res);
    },
    show: (uuid) => {
      return Axios.get(`api/v1/pro/contracts/contract/${uuid}`).then((res) => res);
    },
    update: (uuid, data) => {
      return Axios.put(`api/v1/pro/contracts/contract/${uuid}`, data).then((res) => res);
    },
    activity: (data) => {
      return Axios.patch(`api/v1/pro/contracts/contract/activity`, data).then((res) => res);
    },
  },
};

export default Index;
