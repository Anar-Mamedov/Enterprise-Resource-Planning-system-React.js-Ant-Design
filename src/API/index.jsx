import Auth from "./Auth";
import Finance from "./Finance";
import Com from "./Com";
import Procurement from "./Procurement";
import Warehouse from "./Warehouse";
import Signature from "./Signature";
import Acc from "./Acc";
import Information from "./Information";
import General from "./General";
import User from "./User";
import HumanResource from "./HumanResource";

const Index = {
  Auth, //- { Sanctum }
  Com, // - { Table, Column, City, Country, Project }
  Finance, // - { SubKonto, KontoPlans, Signature, KontoGroups, AccountTransactions, Picklist, CurrencyType, BankGeneral, Organization, Bill }
  Procurement, // - { Suppliers, Picklist  }
  Warehouse, // - { WarehouseNames, ItemUnit, categoryPropertyDescription }
  Signature, // - { Signature }
  Acc,
  Information,
  General, // - {Setting, disabled and required fields}
  User, // - {Daily currency}
  HumanResource,
};

export default Index;
