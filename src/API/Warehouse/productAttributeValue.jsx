import { Axios } from "../../Config";

const Index = {
    crossCombinations: (data) => {
        return Axios.get("api/v1/wh/product-attribute-value/cross-combinations", { params: { ...data } }).then(res => res)
    },

}


export default Index;