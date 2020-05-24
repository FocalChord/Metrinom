import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import TopGenreGraph from "../../../pages/HomePage/TopGenreGraph";
import { MemoryRouter } from "react-router-dom";

test("<TopGenreGraph />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <TopGenreGraph genres={[{ name: "hip hop" }]} />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
