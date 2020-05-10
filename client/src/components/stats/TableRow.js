import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

const TableRow = (props) => {
    return (
        <ListItem className="hover:bg-green-500 cursor-pointer">
            <ListItemAvatar>
                <Avatar>{props.id}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={"Number of Artists: " + props.number} />
        </ListItem>
    );
};

export default TableRow;
