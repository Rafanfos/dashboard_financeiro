/* app/dashboard/components/SummaryCards.tsx */
"use client";

import {
  CardBoxTitle,
  CardInfo,
  CardSubtitle,
  CardTitle,
  CompanyCard,
} from "../styles";
import { ICompany, ITransaction } from "../types";
import { Card, Grid } from "@mui/material";

interface Props {
  company: ICompany;
  transactions: ITransaction[];
}

export default function SummaryCards({ company, transactions }: Props) {
  const currentDate = new Date();

  const companyTransactions = transactions.filter(
    (t) => t.account === company.name
  );

  const { income, expenses, pending } = companyTransactions.reduce(
    (totals, transaction) => {
      if (transaction.date <= currentDate) {
        if (transaction.transaction_type === "deposit") {
          totals.income += Number(transaction.amount);
        } else if (transaction.transaction_type === "withdraw") {
          totals.expenses += Number(transaction.amount);
        }
      } else {
        if (transaction.transaction_type === "deposit") {
          totals.pending += Number(transaction.amount);
        } else if (transaction.transaction_type === "withdraw") {
          totals.pending -= Number(transaction.amount);
        }
      }
      return totals;
    },
    { income: 0, expenses: 0, pending: 0 }
  );

  const balance = income - expenses;

  const cardInfoTitles = [
    { title: "Receita", value: income },
    { title: "Despesas", value: expenses },
    { title: "Saldo", value: balance },
    { title: "Pendentes", value: pending },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item>
        <Card>
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
      </Grid>
    </Grid>
  );
}
