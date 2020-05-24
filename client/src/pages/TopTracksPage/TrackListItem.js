import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const TrackListItem = ({ track, idx }) => {
    const history = useHistory();

    return (
        <Box>
            <ListItem button onClick={() => history.push(`/track/${track.trackId}`)}>
                <ListItemAvatar>
                    <Avatar
                        style={{
                            borderRadius: 0,
                            width: 65,
                            height: 65,
                        }}
                        src={track.trackImage}
                    ></Avatar>
                </ListItemAvatar>
                <ListItemText
                    style={{
                        paddingLeft: 20,
                    }}
                    primary={track.trackName}
                    secondary={
                        <React.Fragment>
                            Artist - {track.artistName}
                            <br />
                            Album - {track.albumName}
                        </React.Fragment>
                    }
                />
                <div
                    style={{
                        fontSize: 25,
                    }}
                >
                    {idx + 1}
                </div>
            </ListItem>
            <Divider variant="inset" />
        </Box>
    );
};

export default TrackListItem;
