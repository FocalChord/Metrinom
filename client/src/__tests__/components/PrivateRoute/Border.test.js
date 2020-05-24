import React, { useContext } from "react";
import TestRenderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import Border from "../../../components/PrivateRoute/Border";
import MetrinomContext from "../../../context/MetrinomContext";

test("<Border />", () => {
    const element = new TestRenderer.create(
        (
            <MetrinomContext.Provider value="Provided Value">
                <MyComponent />
            </MetrinomContext.Provider>
        ),
    );
    expect(element.root.findByType("div").children).toEqual(["Provided Value"]);
});
