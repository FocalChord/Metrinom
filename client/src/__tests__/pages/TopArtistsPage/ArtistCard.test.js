import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import ArtistCard from "../../../pages/TopArtistsPage/ArtistCard";
import { MemoryRouter } from "react-router-dom";

test("<ArtistCard />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <ArtistCard artistId="321" artistImage="img" artistName="eminem" genre="hip hop" idx="1" />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
