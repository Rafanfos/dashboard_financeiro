"use client";

import styled from "styled-components";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

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
