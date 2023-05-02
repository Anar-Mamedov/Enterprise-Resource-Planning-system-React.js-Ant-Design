import { Axios } from "../../Config";

const Index = {
  CompanyFounder: {
    list: (data) => Axios.get("api/v1/fn/companies/founder/list", { params: { data: JSON.stringify(data) } }).then((res) => res),
  },
  Organization: {
    index: (data) => {
      return Axios.get("api/v1/fn/companies/organization", { params: { data } }).then((res) => res);
    },
    activity: (data) => {
      return Axios.patch(`api/v1/fn/companies/organization/activity`, data).then((res) => res);
    },
    store: (data) => {
      return Axios.post("api/v1/fn/companies/organization", data).then((res) => res);
    },
    update: (uuid, data) => {
      return Axios.put(`api/v1/fn/companies/organization/${uuid}`, data).then((res) => res);
    },
    show: (uuid) => {
      return Axios.get(`api/v1/fn/companies/organization/${uuid}`).then((res) => res);
    },
  },
};

export default Index;
