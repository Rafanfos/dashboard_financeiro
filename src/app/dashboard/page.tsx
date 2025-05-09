"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import Filters from "./components/filters";
import { ITransaction, IFiltersState, ICompany } from "./types";
import Sidebar from "./components/sidebar";
import SummaryCards from "./components/summaryCards";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filtered, setFiltered] = useState<ITransaction[]>([]);
  const [filters, setFilters] = useState<IFiltersState>({
    date: "",
    account: "",
    industry: "",
    state: "",
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/transactions.json");
        if (!res.ok) throw new Error("Arquivo não encontrado");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Erro ao carregar transações:", err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const uniqueCompaniesMap = new Map<string, ICompany>();

    transactions.forEach((tx) => {
      if (!uniqueCompaniesMap.has(tx.account)) {
        uniqueCompaniesMap.set(tx.account, {
          name: tx.account,
          state: tx.state,
          industry: tx.industry,
        });
      }
    });

    setCompanies(Array.from(uniqueCompaniesMap.values()));
  }, [transactions]);

  useEffect(() => {
    const result = transactions.filter((tx) => {
      return (
        (!filters.date ||
          tx.date.toLocaleDateString().includes(filters.date)) &&
        (!filters.account || tx.account === filters.account) &&
        (!filters.industry || tx.industry === filters.industry) &&
        (!filters.state || tx.state === filters.state)
      );
    });
    setFiltered(result);
    localStorage.setItem("filters", JSON.stringify(filters));

    if (filters.account !== "") {
      const filterCompany = companies.filter(
        ({ name }) => name === filters.account
      );

      setCompanies(filterCompany);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {companies.length > 0 &&
            companies.map((company, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <SummaryCards company={company} transactions={filtered} />
              </Grid>
            ))}
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, color: "gray" }}>
          {filtered.length} transações encontradas
        </Typography>
      </Box>
    </Box>
  );
}
