const index = (state, action) => {
    switch (action.method) {
        case "POST_TRANSACTION": return { ...state, TRANSACTION: action.data }
        case "POST_COMPANY": return { ...state, COMPANY: action.data }
        case "POST_INDIVIDUAL": return { ...state, INDIVIDUAL: action.data }
        case "POST_EXPENSEITEM": return { ...state, EXPENSEITEM: action.data }
        case "PUT_EXPENSEITEM": return { ...state, EXPENSEITEM: [...state.EXPENSEITEM, action.data] }
        case "POST_RESPONSIBLEPERSON": return { ...state, RESPONSIBLEPERSON: action.data }
        case "POST_PROJECT": return { ...state, PROJECT: action.data }
        case "POST_TRANSACTIONMOVEMENT": return { ...state, TRANSACTIONMOVEMENT: action.data }
        case "PUT_TRANSACTIONMOVEMENT": return { ...state, TRANSACTIONMOVEMENT: [...state.TRANSACTIONMOVEMENT, action.data] }
        case "POST_CONTRACT": return { ...state, CONTRACT: action.data }

        case "POST_DEBIT_CREDIT": return { ...state, DEBIT_CREDIT: action.data }
        case "POST_COMMISSION_INTEREST": return { ...state, COMMISSION_INTEREST: action.data }

        case "POST_SENDER": return { ...state, SENDER: action.data }
        case "POST_INVOICE": return { ...state, INVOICE: action.data }
        case "POST_CURRENCY": return { ...state, CURRENCY: action.data }
        case "POST_EDV_RATE": return { ...state, EDV_RATE: action.data }

        case "POST_DEBT_LOAN_TRN": return { ...state, DEBT_LOAN_TRN: action.data }

        default: return { ...state, ...action.data }

    }
}

export default index