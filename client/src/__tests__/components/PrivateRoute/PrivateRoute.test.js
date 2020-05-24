import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import PrivateRoute from "../../../components/PrivateRoute";

test("<PrivateRoute />", () => {
    const wrapper = shallow(<PrivateRoute component={<div />} />);

    expect(wrapper).toContainExactlyOneMatchingElement("Route");
});
