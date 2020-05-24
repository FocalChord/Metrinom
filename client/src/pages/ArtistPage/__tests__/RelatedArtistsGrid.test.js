import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import RelatedArtistsGrid from "../RelatedArtistsGrid";
import { MemoryRouter } from "react-router-dom";

test("<RelatedArtistsGrid />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <RelatedArtistsGrid data={[]} />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
