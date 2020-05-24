import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import GenreListItem from "../../../pages/TopGenresPage/GenreListItem";
import { MemoryRouter } from "react-router-dom";

test("<GenreListItem />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <GenreListItem genre={{ name: "hip hop" }} selectGenre={() => {}} checkIcon="check" />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
