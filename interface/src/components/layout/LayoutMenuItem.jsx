import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { routeMatches } from "../../utils";

const LayoutMenuItem = ({ icon: Icon, label, to, disabled }) => {
  const { pathname } = useLocation();

  return (
    <ListItem disablePadding selected={routeMatches(to, pathname)}>
      <ListItemButton component={Link} to={to} disabled={disabled}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default LayoutMenuItem;
