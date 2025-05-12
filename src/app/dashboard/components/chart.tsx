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
import { Box, Typography } from "@mui/material";

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
  const calculateFinancials = (data: ITransaction[]) => {
    const currentDate = new Date();
    let income = 0;
    let expenses = 0;
    let pendingDeposits = 0;
    let pendingWithdraws = 0;

    data.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const amount = Number(transaction.amount);

      if (transactionDate <= currentDate) {
        if (transaction.transaction_type === "deposit") {
          income += amount;
        } else if (transaction.transaction_type === "withdraw") {
          expenses += amount;
        }
      } else {
        if (transaction.transaction_type === "deposit") {
          pendingDeposits += amount;
        } else if (transaction.transaction_type === "withdraw") {
          pendingWithdraws += amount;
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

  const financials = calculateFinancials(transactions);

  const chartTitle = filters.account
    ? `Balanço Financeiro: ${filters.account}`
    : "Balanço Financeiro Geral";

  const data = {
    labels: ["Ganhos", "Despesas", "Saldo", "Pendências"],
    datasets: [
      {
        label: "Valor (BRL)",
        data: [
          financials.income,
          financials.expenses,
          financials.balance,
          financials.pending,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Ganhos
          "rgba(255, 99, 132, 0.6)", // Despesas
          "rgba(54, 162, 235, 0.6)", // Saldo
          "rgba(255, 206, 86, 0.6)", // Pendências
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

  if (transactions.length === 0 && filters.account) {
    return (
      <Box sx={{ mt: 2, p: 2, textAlign: "center" }}>
        <Typography variant="subtitle1">
          Nenhuma transação encontrada para {filters.account} com os filtros
          aplicados.
        </Typography>
      </Box>
    );
  }

  if (transactions.length === 0 && !filters.account) {
    return (
      <Box sx={{ mt: 2, p: 2, textAlign: "center" }}>
        <Typography variant="subtitle1">
          Nenhuma transação encontrada com os filtros aplicados para o balanço
          geral.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  );
}
