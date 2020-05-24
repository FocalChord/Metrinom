import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import SideDrawer from "../../../components/PrivateRoute/Border/SideDrawer";

test("<SideDrawer />", () => {
    const tree = renderer.create(<SideDrawer routes={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
});
