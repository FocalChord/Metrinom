import React from "react";
import renderer from "react-test-renderer";
import "regenerator-runtime/runtime.js";
import { Route } from "react-router-dom";

import HeaderBar from "../../../components/PrivateRoute/Border/HeaderBar";

const routes = [{ name: "Home", path: "/", icon: <div /> }];

test("<HeaderBar />", () => {
    // const tree = renderer
    //     .create(
    //         <Route>
    //             <HeaderBar routes={routes} />
    //         </Route>,
    //     )
    //     .toJSON();
    // expect(tree).toMatchSnapshot();
});
