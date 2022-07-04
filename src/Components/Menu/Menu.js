import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState } from "react";
import { Divider } from "@mui/material";
import "./Menu.css";

export default function Menu(props) {
  return (
    <div className="menu-container">
      <List
        sx={{ width: "100%", minWidth: 150, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {"Course: " + props.course.name}
          </ListSubheader>
        }
      >
        <Divider />
        {props?.user?.admin && (
          <ListItemButton onClick={() => props.setView(0)}>
            <ListItemText primary="Students" />
          </ListItemButton>
        )}
        <ListItemButton onClick={() => props.setView(1)}>
          <ListItemText primary="Grades" />
        </ListItemButton>
        <ListItemButton onClick={() => props.setView(2)}>
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </List>
    </div>
  );
}
