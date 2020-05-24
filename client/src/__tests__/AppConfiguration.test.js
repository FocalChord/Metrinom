import React from "react";
import { shallow } from "enzyme";

import AppConfiguration from "../../src/components/AppConfiguration";

test("<AppConfiguration />", () => {
    const wrapper = shallow(<AppConfiguration />);

    expect(wrapper).toContainExactlyOneMatchingElement("ThemeProvider");
    expect(wrapper).toContainExactlyOneMatchingElement("MetrinomProvider");
    expect(wrapper).toContainExactlyOneMatchingElement("BrowserRouter");
});
