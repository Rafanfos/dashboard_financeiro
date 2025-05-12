"use client";

import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import Filters from "./components/filters";
import { ITransaction, IFiltersState, ICompany } from "./types";
import Sidebar from "./components/sidebar";
import SummaryCards from "./components/summaryCards";
import DataChart from "./components/chart";
import { toast } from "react-toastify";

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
        if (!res.ok)
          throw new Error("Arquivo não encontrado ou falha na requisição");
        const data = await res.json();
        setTransactions(data);
      } catch {
        toast.error("Erro ao carregar transações. Verifique o arquivo.");
        setTransactions([]);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch {
        toast.error(
          "Erro ao carregar os filtros salvos. Os filtros foram redefinidos para os padrões."
        );
        setFilters({
          date: "",
          account: "",
          industry: "",
          state: "",
        });
      }
    }
  }, []);

  useEffect(() => {
    // Filter transactions based on current filters
    const result = transactions.filter((tx) => {
      const transactionDate = new Date(tx.date);
      const transactionYear = transactionDate.getFullYear();
      // Month is 0-indexed, so add 1 and pad with '0' if needed
      const transactionMonth = String(transactionDate.getMonth() + 1).padStart(
        2,
        "0"
      );
      const transactionYearMonth = `${transactionYear}-${transactionMonth}`;

      const dateFilterMatch =
        !filters.date || transactionYearMonth === filters.date;
      const accountFilterMatch =
        !filters.account || tx.account === filters.account;
      const industryFilterMatch =
        !filters.industry || tx.industry === filters.industry;
      const stateFilterMatch = !filters.state || tx.state === filters.state;

      return (
        dateFilterMatch &&
        accountFilterMatch &&
        industryFilterMatch &&
        stateFilterMatch
      );
    });
    setFiltered(result);

    localStorage.setItem("filters", JSON.stringify(filters));

    const allUniqueCompaniesFromTransactions = Array.from(
      new Map(
        transactions.map((tx) => [
          tx.account,
          { name: tx.account, state: tx.state, industry: tx.industry },
        ])
      ).values()
    );

    if (filters.account) {
      const selectedCompany = allUniqueCompaniesFromTransactions.find(
        (c) => c.name === filters.account
      );
      setCompanies(selectedCompany ? [selectedCompany] : []);
    } else {
      let companiesToList = allUniqueCompaniesFromTransactions;
      if (filters.industry) {
        companiesToList = companiesToList.filter(
          (c) => c.industry === filters.industry
        );
      }
      if (filters.state) {
        companiesToList = companiesToList.filter(
          (c) => c.state === filters.state
        );
      }

      setCompanies(companiesToList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, transactions]);

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        sx={{
          marginLeft: "250px",
          padding: 3,
          flexGrow: 1,
          backgroundColor: "#f4f6f8",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1A2027", fontWeight: "bold" }}
        >
          Dashboard Financeiro
        </Typography>
        <Filters
          filters={filters}
          setFilters={setFilters}
          transactions={transactions} // Pass all transactions for filter options
        />

        {/* Render the DataChart component here */}
        <DataChart transactions={filtered} filters={filters} />

        {/* Conditionally render SummaryCards title if there are companies to show */}
        {companies.length > 0 && !filters.account && (
          <Typography variant="h5" gutterBottom sx={{ mt: 4, color: "#333" }}>
            Resumo por Empresa
          </Typography>
        )}
        {companies.length > 0 && filters.account && (
          <Typography variant="h5" gutterBottom sx={{ mt: 4, color: "#333" }}>
            Resumo da Empresa: {filters.account}
          </Typography>
        )}

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {" "}
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              {" "}
              <SummaryCards company={company} transactions={filtered} />
            </Grid>
          ))}
        </Grid>

        {transactions.length > 0 &&
          companies.length === 0 &&
          (filters.account || filters.industry || filters.state) && (
            <Typography
              variant="subtitle1"
              sx={{ mt: 4, color: "gray", textAlign: "center" }}
            >
              Nenhuma empresa encontrada para os filtros de Conta, Indústria ou
              Estado aplicados.
            </Typography>
          )}

        <Typography
          variant="body2"
          sx={{ mt: 4, color: "gray", textAlign: "center" }}
        >
          {filtered.length} transações encontradas para os filtros aplicados.
        </Typography>
      </Box>
    </Box>
  );
}
