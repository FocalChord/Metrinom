import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const TableRow = (props) => {
    return (
        <ListItem className="hover:bg-green-500 cursor-pointer">
            <ListItemAvatar>
                <Avatar>{props.id}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={"Number of Aritsts: " + props.number} />
        </ListItem>
    );
};

export default TableRow;
