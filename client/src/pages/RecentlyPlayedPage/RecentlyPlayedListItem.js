import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const RecentlyPlayedListItem = ({ track }) => {
    const history = useHistory();

    return (
        <Box>
            <ListItem onClick={() => history.push(`/track/${track.trackId}`)} button>
                <ListItemAvatar>
                    <Avatar
                        style={{
                            borderRadius: 0,
                            width: 65,
                            height: 65,
                        }}
                        src={track.albumArt}
                    />
                </ListItemAvatar>
                <ListItemText
                    style={{
                        paddingLeft: 20,
                    }}
                    primary={track.trackName}
                    secondary={
                        <React.Fragment>
                            {track.artistName}
                            <br />
                            {track.albumName}
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>{track.dateString}</ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" />
        </Box>
    );
};

export default RecentlyPlayedListItem;
