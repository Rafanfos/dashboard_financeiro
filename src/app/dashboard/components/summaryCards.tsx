"use client";

import {
  CardBoxTitle,
  CardInfo,
  CardSubtitle,
  CardTitle,
  CompanyCard,
} from "../styles";
import { ICompany, ITransaction } from "../types";
import { Card } from "@mui/material";

interface Props {
  company: ICompany;
  transactions: ITransaction[];
  filterDate: string;
}

export default function SummaryCards({
  company,
  transactions,
  filterDate,
}: Props) {
  const getPendingReferenceTimestamp = () => {
    if (filterDate && filterDate.match(/^\d{4}-\d{2}$/)) {
      const [year, month] = filterDate.split("-").map(Number);

      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
      return endOfMonth.getTime();
    } else {
      return new Date().getTime();
    }
  };

  const pendingReferenceTimestamp = getPendingReferenceTimestamp();
  const companyTransactions = transactions.filter(
    (t) => t.account === company.name
  );

  const { income, expenses, pendingDeposits, pendingWithdraws } =
    companyTransactions.reduce(
      (totals, transaction) => {
        const transactionTimestamp = transaction.date;
        const amount = Number(transaction.amount);

        if (transactionTimestamp > pendingReferenceTimestamp) {
          if (transaction.transaction_type === "deposit") {
            totals.pendingDeposits += amount;
          } else if (transaction.transaction_type === "withdraw") {
            totals.pendingWithdraws += amount;
          }
        } else {
          if (transaction.transaction_type === "deposit") {
            totals.income += amount;
          } else if (transaction.transaction_type === "withdraw") {
            totals.expenses += amount;
          }
        }
        return totals;
      },
      { income: 0, expenses: 0, pendingDeposits: 0, pendingWithdraws: 0 }
    );

  const balance = income - expenses;
  const netPending = pendingDeposits - pendingWithdraws;

  const cardInfoTitles = [
    { title: "Receita", value: income },
    { title: "Despesas", value: expenses },
    { title: "Saldo", value: balance },
    { title: "Pendentes", value: netPending },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CompanyCard>
        <CardBoxTitle>
          <CardTitle>{company.name}</CardTitle>
          <CardSubtitle>
            {company.industry} - {company.state}
          </CardSubtitle>
        </CardBoxTitle>
        {cardInfoTitles.map((info, index) => (
          <CardInfo key={index}>
            {info.title}:{" "}
            {info.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </CardInfo>
        ))}
      </CompanyCard>
    </Card>
  );
}
