import { Axios } from "../../Config";

const Index = {
  list: (data) => {
    return Axios.get("api/v1/fn/companies/organization/list", { params: { data } }).then((res) => res);
  },
};

export default Index;
