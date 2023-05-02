import { Axios } from "../../Config";

const Index = {
  EmployeeContactType: {
    list: (data) => {
      return Axios.get("api/v1/hr/picklist/contact-type/list", { params: { ...data } }).then((res) => res);
    },
  },
};

export default Index;
