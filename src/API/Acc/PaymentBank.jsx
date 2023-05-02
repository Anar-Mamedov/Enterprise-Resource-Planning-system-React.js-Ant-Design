
import { Axios } from "../../Config";

const Index = {
    DebtLoanTrn: (data) => Axios.get("api/v1/acc/payment-bank/debt-loan-trn", { params: { ...data } }).then(res => res),
    Balance: (data) => Axios.get("api/v1/acc/payment-bank/balance", { params: { data: JSON.stringify(data) } }).then(res => res),
    PayrollTrn: (data) => Axios.get("api/v1/acc/payment-bank/payroll-trn", { params: { ...data } }).then(res => res),
    LaborContract: (data) => Axios.get("api/v1/acc/payment-bank/labor-contract", { params: { data: JSON.stringify(data) } }).then(res => res),
    BillTrn: (data) => Axios.get("api/v1/acc/payment-bank/bill-trn", { params: { data: JSON.stringify(data) } }).then(res => res),
    PayrollWorkersTotalAmount: (data) => Axios.get("api/v1/acc/payment-bank/payroll-workers-total-amount", { params: { data: JSON.stringify(data) } }).then(res => res),
    YgbTrn: (data) => Axios.get("api/v1/acc/payment-bank/ygb-trn", { params: { data: JSON.stringify(data) } }).then(res => res)
}

export default Index;