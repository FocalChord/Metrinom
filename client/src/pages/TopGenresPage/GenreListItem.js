import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";

const GenreListItem = ({ genre, selectGenre, checkIcon }) => {
    return (
        <Box>
            <ListItem button onClick={() => selectGenre(genre.rank)}>
                <ListItemAvatar>
                    <Avatar
                        style={{
                            borderRadius: 0,
                            width: 65,
                            height: 65,
                            color: "#1DB954",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                        }}
                    >
                        {genre.rank + 1}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    style={{
                        paddingLeft: 20,
                    }}
                    primary={genre.nameUppercase}
                    secondary={
                        <React.Fragment>
                            {genre.number} Artist{genre.number > 1 ? "s" : ""}
                        </React.Fragment>
                    }
                />
                {genre.selected && <CheckIcon className={checkIcon} />}
            </ListItem>
            <Divider variant="inset" />
        </Box>
    );
};

export default GenreListItem;
