"use client";

import { SidebarWrapper, SidebarItem } from "../styles";

import { List, ListItemIcon, ListItemText, Divider } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("filters");
    localStorage.removeItem("session");
    router.push("/login");
  };

  return (
    <SidebarWrapper>
      <List>
        <SidebarItem
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/dashboard")}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </SidebarItem>

        <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />

        <SidebarItem sx={{ cursor: "pointer" }} onClick={handleLogout}>
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </SidebarItem>
      </List>
    </SidebarWrapper>
  );
}
