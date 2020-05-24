import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import LoginPage from "../../../pages/LoginPage";

test("<RelatedArtistsGrid />", () => {
    const tree = renderer.create(<LoginPage />).toJSON();

    expect(tree).toMatchSnapshot();
});
