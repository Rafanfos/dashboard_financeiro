/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ITransaction, IFiltersState } from "../types";
import { Typography } from "@mui/material";
import { ChartContainer, InfoBox } from "../styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  transactions: ITransaction[];
  filters: IFiltersState;
}

export default function DataChart({ transactions, filters }: Props) {
  const getPendingReferenceTimestamp = () => {
    if (filters && filters.date && filters.date.match(/^\d{4}-\d{2}$/)) {
      const [year, month] = filters.date.split("-").map(Number);
      return new Date(year, month, 0, 23, 59, 59, 999).getTime();
    } else {
      return new Date().getTime();
    }
  };

  const calculateFinances = (data: ITransaction[]) => {
    const pendingReferenceTimestamp = getPendingReferenceTimestamp();
    let income = 0;
    let expenses = 0;
    let pendingDeposits = 0;
    let pendingWithdraws = 0;

    data.forEach((transaction) => {
      const transactionTimestamp = transaction.date;
      const amount = Number(transaction.amount);

      if (transactionTimestamp > pendingReferenceTimestamp) {
        console.log("entrou");
        if (transaction.transaction_type === "deposit") {
          pendingDeposits += amount;
        } else if (transaction.transaction_type === "withdraw") {
          pendingWithdraws += amount;
        }
      } else {
        if (transaction.transaction_type === "deposit") {
          income += amount;
        } else if (transaction.transaction_type === "withdraw") {
          expenses += amount;
        }
      }
    });
    return {
      income,
      expenses,
      balance: income - expenses,
      pending: pendingDeposits - pendingWithdraws,
    };
  };

  const finances = calculateFinances(transactions);

  let chartTitle =
    filters && filters.account
      ? `Balanço Financeiro: ${filters.account}`
      : "Balanço Financeiro Geral";

  if (filters && filters.date) {
    chartTitle += ` - Mês de Referência: ${filters.date}`;
  }

  const chartData = {
    labels: ["Ganhos", "Despesas", "Saldo", "Pendências"],
    datasets: [
      {
        label: "Valor (BRL)",
        data: [
          finances.income,
          finances.expenses,
          finances.balance,
          finances.pending,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
  };

  if (transactions.length === 0 && filters && filters.account) {
    return (
      <InfoBox>
        <Typography variant="subtitle1">
          Nenhuma transação encontrada para {filters.account} com os filtros
          aplicados.
        </Typography>
      </InfoBox>
    );
  }

  if (transactions.length === 0 && !(filters && filters.account)) {
    return (
      <InfoBox>
        <Typography variant="subtitle1">
          Nenhuma transação encontrada com os filtros aplicados para o balanço
          geral.
        </Typography>
      </InfoBox>
    );
  }

  return (
    <ChartContainer sx={{ height: { xs: "300px", md: "400px" } }}>
      <Bar options={options} data={chartData} />
    </ChartContainer>
  );
}
