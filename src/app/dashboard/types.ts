export interface ITransaction {
  id: string;
  date: string;
  account: string;
  industry: string;
  state: string;
  type: "income" | "expense";
  status: "completed" | "pending";
  amount: number;
}

export interface IFiltersState {
  date: string;
  account: string;
  industry: string;
  state: string;
}
