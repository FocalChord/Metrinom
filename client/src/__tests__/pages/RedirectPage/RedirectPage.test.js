import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import RedirectPage from "../../../pages/RedirectPage";
import { MemoryRouter } from "react-router-dom";

test("<RedirectPage />", () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <RedirectPage />
            </MemoryRouter>,
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
