
import { Axios } from "../../Config";

const Index = {
    BankTransactionName: {
        list: (data) => Axios.get("api/v1/acc/picklist/bank_transaction_name/list", { params: { data: JSON.stringify(data) } }).then(res => res)
    },
    ExpenseItem: {
        list: (data) => Axios.get("api/v1/acc/picklist/expense-item/list", { params: { data: JSON.stringify(data) } }).then(res => res),
        store: (data) => Axios.post('api/v1/acc/picklist/expense-item', { ...data }).then(res => res)
    },
    TransactionMovement: {
        list: (data) => Axios.get("api/v1/acc/picklist/transaction-movement/list", { params: { data: JSON.stringify(data) } }).then(res => res),
        store: (data) => Axios.post('api/v1/acc/picklist/transaction-movement', { ...data }).then(res => res)
    },
    CommissionValue: {
        list: (data) => Axios.get("api/v1/acc/picklist/commission_value/list", { params: { ...data } }).then(res => res)
    },
    TaxesType: {
        list: (data) => Axios.get("api/v1/acc/picklist/taxes-type/list", { params: { ...data } }).then(res => res)
    },
    FakturaContractPredment: {
        list: (data) => Axios.get("api/v1/acc/picklist/factura-contract-prediments/list", { params: { data } }).then(res => res),
        store: (data) => Axios.post("api/v1/acc/picklist/factura-contract-prediments", data).then(res => res)
    }
}

export default Index;