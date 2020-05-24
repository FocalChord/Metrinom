import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import RecentlyPlayedListItem from "../../../pages/RecentlyPlayedPage/RecentlyPlayedListItem";
import { MemoryRouter } from "react-router-dom";

test("<RecentlyPlayedListItem />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <RecentlyPlayedListItem
                    track={{
                        trackId: "321",
                        trackName: "Godzilla",
                        albumArt: "art",
                        albumName: "Music to be Murdered by",
                        dateString: "2020",
                    }}
                />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
