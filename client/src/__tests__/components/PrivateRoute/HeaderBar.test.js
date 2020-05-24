import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import HeaderBar from "../../../components/PrivateRoute/Border/HeaderBar";

test("<HeaderBar />", () => {
    const tree = renderer.create(<HeaderBar />).toJSON();

    expect(tree).toMatchSnapshot();
});
