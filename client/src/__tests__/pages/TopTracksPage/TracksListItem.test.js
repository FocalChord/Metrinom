import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import TrackListItem from "../../../pages/TopTracksPage/TrackListItem";
import { MemoryRouter } from "react-router-dom";

test("<TrackListItem />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <TrackListItem track={{ name: "Godzilla" }} idx="1" />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
