import React from "react";
import MaterialSlider from "@material-ui/core/slider";
import styled from "styled-components/macro";

const marks = [
    {
        value: 1864,
        label: "1864",
    },
    {
        value: 1900,
        label: "1900",
    },
    {
        value: 1950,
        label: "1950",
    },
    {
        value: 2000,
        label: "2000",
    },
    {
        value: 2019,
        label: "2019",
    },
];

export type Props = {
    curYear: number;
    onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
};

function Slider({ curYear, onChange }: Props) {
    return (
        <SliderContainer>
            <SliderLabel data-testid="slider-label">CO2 Emissions in Year {curYear}</SliderLabel>
            <MaterialSlider
                onChangeCommitted={onChange}
                marks={marks}
                defaultValue={2019}
                min={1864}
                step={1}
                max={2019}
            />
        </SliderContainer>
    );
}

const SliderLabel = styled.p``;

const SliderContainer = styled.div`
    width: 400px;
`;

export default Slider;
