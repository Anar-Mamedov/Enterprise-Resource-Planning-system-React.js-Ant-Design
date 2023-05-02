import { Axios } from "../../Config";

const Index = {
  list: (data) => {
    return Axios.get("api/v1/hr/com/zip_code/list", { params: { ...data } }).then((res) => res);
  },
};

export default Index;
