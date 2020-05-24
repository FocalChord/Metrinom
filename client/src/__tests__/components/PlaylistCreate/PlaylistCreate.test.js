import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";

import PlaylistCreate from "../../../components/PlaylistCreate";

test("<PlaylistCreate />", () => {
    const tree = renderer.create(<PlaylistCreate />).toJSON();
    expect(tree).toMatchSnapshot();
});
