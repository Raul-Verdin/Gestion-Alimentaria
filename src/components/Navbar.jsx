import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CalmaYA
          </Typography>
          <Button color="inherit" component={Link} to="/reservas">Reservas</Button>
          <Button color="inherit" component={Link} to="/inventario">Inventario</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={() => setOpen(false)}>Inicio</ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/reservas" onClick={() => setOpen(false)}>Reservas</ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/inventario" onClick={() => setOpen(false)}>Inventario</ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
