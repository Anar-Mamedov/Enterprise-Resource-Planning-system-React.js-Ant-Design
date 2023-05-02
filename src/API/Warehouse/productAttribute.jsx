import { Axios } from "../../Config";

const Index = {
  list: (data) => {
    return Axios.get("api/v1/wh/product-attribute/list", data).then((res) => res);
  },
};

export default Index;
