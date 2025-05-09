"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Filters from "./components/Filters";

interface Transaction {
  id: string;
  date: string;
  account: string;
  industry: string;
  state: string;
  type: "income" | "expense";
  status: "completed" | "pending";
  amount: number;
}

interface FiltersState {
  date: string;
  account: string;
  industry: string;
  state: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<FiltersState>({
    date: "",
    account: "",
    industry: "",
    state: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("/transactions.json");
      const data = await res.json();
      setTransactions(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const result = transactions.filter((tx) => {
      return (
        (!filters.date || tx.date.includes(filters.date)) &&
        (!filters.account || tx.account === filters.account) &&
        (!filters.industry || tx.industry === filters.industry) &&
        (!filters.state || tx.state === filters.state)
      );
    });
    setFiltered(result);
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters, transactions]);

  useEffect(() => {
    const saved = localStorage.getItem("filters");
    if (saved) setFilters(JSON.parse(saved));
  }, []);

  return (
    <Box display="flex">
      <Sidebar />
      <Box sx={{ marginLeft: "250px", padding: 3, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Financeiro
        </Typography>
        <Filters
          filters={filters}
          setFilters={setFilters}
          transactions={transactions}
        />

        {/* Em breve: SummaryCards, Charts, TransactionTable */}

        <Typography variant="body2" sx={{ mt: 4, color: "gray" }}>
          {filtered.length} transações encontradas
        </Typography>
      </Box>
    </Box>
  );
}
