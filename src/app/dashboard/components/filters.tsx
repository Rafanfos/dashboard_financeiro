"use client";

import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IFiltersState, ITransaction } from "../types";

interface Props {
  filters: IFiltersState;
  setFilters: Dispatch<SetStateAction<IFiltersState>>;
  transactions: ITransaction[];
}

export default function Filters({ filters, setFilters, transactions }: Props) {
  const options = useMemo(() => {
    const getUnique = (key: keyof ITransaction) => [
      ...new Set(transactions.map((tx) => tx[key])),
    ];
    return {
      accounts: getUnique("account"),
      industries: getUnique("industry"),
      states: getUnique("state"),
    };
  }, [transactions]);

  const handleChange =
    (field: keyof IFiltersState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Data (AAAA-MM)"
            type="month"
            value={filters.date}
            onChange={handleChange("date")}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            select
            label="Conta"
            value={filters.account}
            onChange={handleChange("account")}
            fullWidth
          >
            <MenuItem value="">Todas</MenuItem>
            {options.accounts.map((acc, i) => (
              <MenuItem key={i} value={acc}>
                {acc}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            select
            label="Indústria"
            value={filters.industry}
            onChange={handleChange("industry")}
            fullWidth
          >
            <MenuItem value="">Todas</MenuItem>
            {options.industries.map((ind, i) => (
              <MenuItem key={i} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            select
            label="Estado"
            value={filters.state}
            onChange={handleChange("state")}
            fullWidth
          >
            <MenuItem value="">Todos</MenuItem>
            {options.states.map((uf, i) => (
              <MenuItem key={i} value={uf}>
                {uf}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
