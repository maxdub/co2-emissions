import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { render, getByLabelText } from "@testing-library/react";
import Slider from "../";
import { CountryCo2Data } from "../../ChoroplethMap/types";
import { Props } from "../";

const renderer = createRenderer();

const renderComponent = ({ curYear, onChange }: Props) => {
    return render(<Slider curYear={curYear} onChange={onChange} />);
};

describe("<Slider/>", () => {
    let output: ReturnType<typeof renderComponent>;
    beforeEach(() => {
        output = renderComponent({ curYear: 1991, onChange: () => null });
    });

    it("should render and match snapshot", () => {
        expect(output.container.firstChild).toMatchSnapshot();
    });

    it("It's current year should be the input year of 1991", () => {
        expect(output.getByTestId("slider-label")).toHaveTextContent("CO2 Emissions in Year 1991");
    });
});
