import React from "react";
import { render, screen } from "@testing-library/react";
import { createRenderer } from "react-test-renderer/shallow";
import App from "./App";

const renderer = createRenderer();

const renderApp = () => {
    <App />;
};

describe("<App />", () => {
    it("should render and match snapshot", () => {
        renderApp();
        const output = renderer.getRenderOutput();
        expect(output).toMatchSnapshot();
    });
});
