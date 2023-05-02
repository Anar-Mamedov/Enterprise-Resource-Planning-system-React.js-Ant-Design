import { Axios } from "../../Config";

const Index = {
  list: (data) => {
    return Axios.get("api/v1/pro/picklist/contract_predment/list", { params: { filter: JSON.stringify(data) } }).then((res) => res);
  },
  store: (data) => {
    return Axios.post("api/v1/pro/picklist/contract_predment", data).then((res) => res);
  },
};

export default Index;
