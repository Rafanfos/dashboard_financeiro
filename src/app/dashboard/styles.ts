"use client";

import styled from "styled-components";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { CardContent, Typography } from "@mui/material";

export const SidebarWrapper = styled(Box)`
  width: 250px;
  height: 100vh;
  background-color: #3f51b5;
  color: white;
  padding-top: 20px;
  position: fixed;
`;

export const SidebarItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
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
