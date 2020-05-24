import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import AppConfiguration from "../../../components/AppConfiguration";

test("<AppConfiguration />", () => {
    const wrapper = shallow(
        <AppConfiguration>
            <div />
        </AppConfiguration>,
    );
    const tree = renderer
        .create(
            <AppConfiguration>
                <div />
            </AppConfiguration>,
        )
        .toJSON();

    expect(wrapper).toContainExactlyOneMatchingElement("ThemeProvider");
    expect(wrapper).toContainExactlyOneMatchingElement("MetrinomProvider");
    expect(wrapper).toContainExactlyOneMatchingElement("BrowserRouter");
    expect(tree).toMatchSnapshot();
});
