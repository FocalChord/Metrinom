import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import NumberOneArtistCard from "../../../pages/HomePage/NumberOneArtistCard";
import { MemoryRouter } from "react-router-dom";

test("<NumberOneArtistCard />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <NumberOneArtistCard artist={{ id: "123", name: "eminem", genres: ["hip hop"], images: [{ url: "img" }] }} />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
