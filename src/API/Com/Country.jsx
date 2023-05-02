import { Axios } from "../../Config";

const Index = {
  list: (data) => {
    return Axios.get("api/v1/hr/com/country/list", { params: { ...data } }).then((res) => res);
  },
};

export default Index;
