import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { render } from "@testing-library/react";
import Geography from "../";
import { CountryCo2Data } from "../../ChoroplethMap/types";
import { Props } from "../";

const renderer = createRenderer();

const renderComponent = ({ geo, curYear, data, setTooltip }: Props) => {
    return render(<Geography setTooltip={setTooltip} geo={geo} curYear={curYear} data={data} />);
};

describe("<Geography/>", () => {
    const geo: {} = {};
    const curYear: number = 1991;
    const data: CountryCo2Data = {};
    const setTooltip = () => null;

    it("should render and match snapshot", () => {
        const output = renderComponent({ geo, curYear, setTooltip, data });
        expect(output.container.firstChild).toMatchSnapshot();
    });
});
