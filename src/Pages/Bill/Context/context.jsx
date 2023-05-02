import { createContext, useContext } from "react";

const BillTableContext = createContext()
const BillInsertContext = createContext()
const BillUpdateContext = createContext()
const BillFilterContext = createContext()

export {
    BillTableContext,
    BillInsertContext,
    BillUpdateContext,
    BillFilterContext,
    useContext
}