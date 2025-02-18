import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { nivel: "Fácil", descripcion: "Tablas del 1 al 4" },
    { nivel: "Medio", descripcion: "Tablas del 5 al 8" },
    { nivel: "Difícil", descripcion: "Tablas del 9 al 11" }
  ];

  const handleMenuClick = (nivel) => {
    navigate(`/practica-nivel`, { state: { nivel } });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#c4a080" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" href="/" sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item, index) => (
              <Tooltip key={index} title={item.descripcion} arrow>
                <Typography variant="button" sx={{ cursor: "pointer" }} onClick={() => handleMenuClick(item.nivel)}>
                  {item.nivel}
                </Typography>
              </Tooltip>
            ))}
          </Box>
          <IconButton color="inherit" edge="end" sx={{ display: { xs: "block", md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 200 }}>
          {menuItems.map((item, index) => (
            <Tooltip key={index} title={item.descripcion} arrow>
              <ListItem button onClick={() => handleMenuClick(item.nivel)}>
                <ListItemText primary={item.nivel} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
