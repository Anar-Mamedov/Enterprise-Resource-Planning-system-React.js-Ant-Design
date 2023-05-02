import { Axios } from "../../Config";

const Index = {
  LaborContract: {
    Form: {
      list: (data) => {
        return Axios.get("api/v1/hr/adm/labor-contract/list", { params: { ...data } }).then((res) => res);
      },
    },
  },
};

export default Index;
