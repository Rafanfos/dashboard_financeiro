export interface ITransaction {
  id: string;
  date: number;
  account: string;
  industry: string;
  state: string;
  transaction_type: string;
  amount: number;
}

export interface IFiltersState {
  date: string;
  account: string;
  industry: string;
  state: string;
}

export interface ICompany {
  name: string;
  state: string;
  industry: string;
}
