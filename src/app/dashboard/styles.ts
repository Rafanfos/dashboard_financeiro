"use client";

import styled from "styled-components";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { CardContent, Typography, Grid, TextField } from "@mui/material";

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContentWrapper = styled.main`
  padding: 24px;
  flex-grow: 1;
  background-color: #f4f6f8;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;

  background-color: #3f51b5;
  color: white;
  padding-top: 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const SidebarItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  max-width: 100%;
`;

export const CompanyCard = styled(CardContent)`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8),
    rgba(200, 200, 200, 0.5)
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  min-width: 210px;
  min-height: 180px;
  max-width: 210px;
  max-height: 180px;
`;

export const CardBoxTitle = styled(Box)`
  padding: 10px 0;
  text-align: center;
`;

export const CardTitle = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
`;

export const CardSubtitle = styled(Typography)`
  font-size: 12px;
  color: gray;
`;

export const CardInfo = styled(Typography)`
  font-size: 10px;
`;

export const DashboardTitle = styled(Typography).attrs(() => ({
  variant: "h4",
  gutterBottom: true,
}))`
  color: #1a2027;
  font-weight: bold;
  width: 80%;
`;

export const SectionTitle = styled(Typography).attrs(() => ({
  variant: "h5",
  gutterBottom: true,
}))`
  margin-top: 32px;
  color: #333;
`;

export const SummaryGridContainer = styled(Grid).attrs(() => ({
  container: true,
  spacing: 3,
}))`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  max-height: 200px;
  overflow: auto;
  padding: 10px;
  max-width: 100%;
  gap: 15px;
`;

export const StyledGridContainer = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  gap: 15px;
  padding: 10px !important;
  max-width: 100%;
  list-style: none;
`;

export const StyledGridItem = styled.li`
  width: 200px;
  list-style: none;
`;

export const CenteredMessage = styled(Typography).attrs((props) => ({
  variant: props.variant || "subtitle1",
}))`
  margin-top: 32px;
  color: gray;
  text-align: center;
`;

export const ChartContainer = styled(Box)`
  margin-top: 32px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const InfoBox = styled(Box)`
  margin-top: 16px;
  padding: 16px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterInput = styled(TextField)`
  min-width: 100px;
`;
