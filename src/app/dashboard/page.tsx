"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Filters from "./components/filters";
import { ITransaction, IFiltersState, ICompany } from "./types";
import Sidebar from "./components/sidebar";
import SummaryCards from "./components/summaryCards";
import DataChart from "./components/chart";
import {
  PageWrapper,
  MainContentWrapper,
  DashboardTitle,
  SectionTitle,
  SummaryGridContainer,
  CenteredMessage,
  StyledGridItem,
} from "./styles";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredForChart, setFilteredForChart] = useState<ITransaction[]>([]);
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(
            `Erro ao carregar transações: ${
              err.message || "Verifique o arquivo."
            }`
          );
        } else {
          toast.error("Erro ao carregar transações: Verifique o arquivo.");
        }
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(
            `Erro ao carregar filtros salvos: ${
              error.message || "Os filtros foram redefinidos."
            }`
          );
        } else {
          toast.error(
            "Erro ao carregar filtros salvos: Os filtros foram redefinidos."
          );
        }
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
    const chartData = transactions.filter((tx) => {
      const accountFilterMatch =
        !filters.account || tx.account === filters.account;
      const industryFilterMatch =
        !filters.industry || tx.industry === filters.industry;
      const stateFilterMatch = !filters.state || tx.state === filters.state;

      return accountFilterMatch && industryFilterMatch && stateFilterMatch;
    });
    setFilteredForChart(chartData);

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
  }, [filters, transactions]);

  return (
    <PageWrapper>
      <Sidebar />
      <MainContentWrapper>
        <DashboardTitle>Dashboard Financeiro</DashboardTitle>
        <Filters
          filters={filters}
          setFilters={setFilters}
          transactions={transactions}
        />

        {companies.length > 0 && !filters.account && (
          <SectionTitle>Resumo por Empresa</SectionTitle>
        )}
        {companies.length > 0 && filters.account && (
          <SectionTitle>Resumo da Empresa: {filters.account}</SectionTitle>
        )}

        <SummaryGridContainer>
          {companies.map((company, index) => {
            const companySpecificTransactions = transactions.filter(
              (tx) => tx.account === company.name
            );
            return (
              <StyledGridItem key={index}>
                <SummaryCards
                  company={company}
                  transactions={companySpecificTransactions}
                  filterDate={filters.date}
                />
              </StyledGridItem>
            );
          })}
        </SummaryGridContainer>

        {transactions.length > 0 &&
          companies.length === 0 &&
          (filters.account || filters.industry || filters.state) && (
            <CenteredMessage>
              Nenhuma empresa encontrada para os filtros de Conta, Indústria ou
              Estado aplicados.
            </CenteredMessage>
          )}

        <CenteredMessage variant="body2">
          {filteredForChart.length} transações encontradas para os filtros
          aplicados (no gráfico).
        </CenteredMessage>

        <DataChart transactions={filteredForChart} filters={filters} />
      </MainContentWrapper>
    </PageWrapper>
  );
}
