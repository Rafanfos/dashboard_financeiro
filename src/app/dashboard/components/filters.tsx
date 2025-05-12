"use client";

import { MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { IFiltersState, ITransaction } from "../types";
import { FilterInput, StyledGridContainer, StyledGridItem } from "../styles";

interface Props {
  filters: IFiltersState;
  setFilters: Dispatch<SetStateAction<IFiltersState>>;
  transactions: ITransaction[];
}

export default function Filters({ filters, setFilters, transactions }: Props) {
  const [tempDate, setTempDate] = useState(filters.date);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempDate(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (tempDate !== filters.date) {
        setFilters((prev) => ({ ...prev, date: tempDate }));
      }
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempDate]);
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
    <StyledGridContainer>
      <StyledGridItem>
        <FilterInput
          type="month"
          value={tempDate}
          onChange={handleDateChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </StyledGridItem>

      <StyledGridItem>
        <FilterInput
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
        </FilterInput>
      </StyledGridItem>

      <StyledGridItem>
        <FilterInput
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
        </FilterInput>
      </StyledGridItem>

      <StyledGridItem>
        <FilterInput
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
        </FilterInput>
      </StyledGridItem>
    </StyledGridContainer>
  );
}
