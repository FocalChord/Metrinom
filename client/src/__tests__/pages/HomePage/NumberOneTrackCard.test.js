import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import NumberOneTrackCard from "../../../pages/HomePage/NumberOneTrackCard";
import { MemoryRouter } from "react-router-dom";

test("<NumberOneTrackCard />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <NumberOneTrackCard track={{ trackId: "321", trackName: "Godzilla", artistName: "eminem", trackImage: "img" }} />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
