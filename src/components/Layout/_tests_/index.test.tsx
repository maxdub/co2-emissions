import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import ChoroplethMap from "../";

const renderer = createRenderer();

const renderApp = () => {
    return <ChoroplethMap />;
};

describe("<ChoroplethMap/>", () => {
    it("should render and match snapshot", () => {
        renderApp();
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });
});
