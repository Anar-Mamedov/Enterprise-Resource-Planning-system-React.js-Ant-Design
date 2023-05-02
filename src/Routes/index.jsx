import React, { Suspense } from "react";
import style from "./style.module.scss";
import { Result, Button, Spin } from "antd";
import { Route, Navigate, Outlet, Link, Routes, BrowserRouter } from "react-router-dom";
import Layout from "../Layouts";
import { Home, Dashboard, ContractAndAppendix, AccountAndInvoice, ChartOfAccounts, SubAccounts, AccountGroups, Bill, EmployeeSalary, BankingTransactions, CashTransactions, AccountTransactions, Companies, BankGroups, Nomeklatura, InvoiceContract, Contracts, Organization, Test, Invoice } from "../Pages";

const Index = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin className={style.spin} tip="Yüklənir..." />}>
        <Routes>
          <Route path="finance" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="accounting" element={<Outlet />}>
              <Route index element={<Navigate to={process.env.REACT_APP_ACCOUNTING} />} />

              <Route path="contract-and-appendix" element={<Outlet />}>
                <Route index element={<ContractAndAppendix />} />
                <Route path="show" element={<ContractAndAppendix.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="account-and-invoice" element={<Outlet />}>
                <Route index element={<AccountAndInvoice />} />
                <Route path="show" element={<AccountAndInvoice.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="chart-of-accounts" element={<Outlet />}>
                <Route index element={<ChartOfAccounts />} />
                <Route path="show/:uuid" element={<ChartOfAccounts.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="sub-accounts" element={<Outlet />}>
                <Route index element={<SubAccounts />} />
                <Route path="show/:uuid" element={<SubAccounts.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="account-groups" element={<Outlet />}>
                <Route index element={<AccountGroups />} />
                <Route path="show/:uuid" element={<AccountGroups.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="bill" element={<Outlet />}>
                <Route index element={<Bill />} />
                <Route path="show" element={<Bill.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="employee-salary" element={<Outlet />}>
                <Route index element={<EmployeeSalary />} />
                <Route path="show" element={<EmployeeSalary.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="nomeclature" element={<Outlet />}>
                <Route index element={<Nomeklatura />} />
                <Route path="show" element={<Nomeklatura.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="invoice-contract" element={<Outlet />}>
                <Route index element={<InvoiceContract />} />
                <Route path="show/:uuid" element={<InvoiceContract.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="contracts" element={<Outlet />}>
                <Route index element={<Contracts />} />
                <Route path="show/:uuid" element={<Contracts.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>

              <Route path="organizations" element={<Outlet />}>
                <Route index element={<Organization />} />
                <Route path="show/:uuid" element={<Organization.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>

              <Route path="invoice" element={<Outlet />}>
                <Route index element={<Invoice />} />
                <Route path="show/:uuid" element={<Invoice.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
            </Route>

            <Route path="operations" element={<Outlet />}>
              <Route index element={<Navigate to={process.env.REACT_APP_OPERATIONS} />} />

              <Route path="banking-transactions" element={<Outlet />}>
                <Route index element={<BankingTransactions />} />
                <Route path="show" element={<BankingTransactions.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="cash-transactions" element={<Outlet />}>
                <Route index element={<CashTransactions />} />
                <Route path="show" element={<CashTransactions.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="account-transactions" element={<Outlet />}>
                <Route index element={<AccountTransactions />} />
                <Route path="show/:uuid" element={<AccountTransactions.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>

              <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
            </Route>

            <Route path="registration" element={<Outlet />}>
              <Route index element={<Navigate to={process.env.REACT_APP_REGISTRATION} />} />

              <Route path="companies" element={<Outlet />}>
                <Route index element={<Companies />} />
                <Route path="show" element={<Companies.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="bank-groups" element={<Outlet />}>
                <Route index element={<BankGroups />} />
                <Route path="show/:uuid" element={<BankGroups.View />} />
                <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
              </Route>
              <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
            </Route>

            <Route path="test" element={<Outlet />}>
              <Route index element={<Test />} />
            </Route>

            {/* ---------status message--------- */}
            <Route
              path="404"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Üzr istəyirik: Daxil etdiyiniz səhifə tapılmadı."
                  extra={
                    <Link to={process.env.REACT_APP_HOME}>
                      <Button type="primary">Ana Səhifə</Button>
                    </Link>
                  }
                />
              }
            />
            <Route
              path="500"
              element={
                <Result
                  status="500"
                  title="500"
                  subTitle="Üzr istəyirik: Gözlənilməyən xəta baş verdi"
                  extra={
                    <Link to={process.env.REACT_APP_HOME}>
                      <Button type="primary">Ana Səhifə</Button>
                    </Link>
                  }
                />
              }
            />
            {/* ---------status message--------- */}

            <Route path="*" element={<Navigate to={process.env.REACT_APP_404} />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Index;
