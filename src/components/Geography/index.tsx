import React, { useMemo } from "react";
import { Geography as SimpleMapsGeography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { CountryCo2Data } from "../ChoroplethMap/types";

const colorScale = scaleLinear().domain([0, 100, 500, 5000, 10000]).range([0, 150, 200, 225, 255]);

export type Props = {
    geo: any;
    data: CountryCo2Data;
    curYear: number;
    setTooltip: (content: string) => void;
};

function Geography({ geo, data, curYear, setTooltip }: Props) {
    const key: string | undefined = useMemo(
        () => Object.keys(data).find((s: string) => data[s].iso_code === geo.properties.ISO_A3),
        [data, geo],
    );

    const year = useMemo(
        () =>
            key
                ? data[key].data.find(({ year }) => {
                      return year === curYear;
                  })
                : null,
        [data, key, curYear],
    );

    return (
        <SimpleMapsGeography
            geography={geo}
            onMouseOver={(event) => {
                setTooltip(`${geo.properties.NAME} - CO2 PPM : ${year && year.co2 ? year.co2.toFixed(2) : 0}`);
            }}
            onMouseOut={() => {
                setTooltip("");
            }}
            style={{
                default: {
                    outline: "none",
                },
                hover: {
                    stroke: "#FFFFFF",
                    outline: "none",
                },
                pressed: {
                    stroke: "#FFFFFF",
                    outline: "none",
                },
            }}
            fill={`rgba(${year ? colorScale(year.co2 ? year.co2 : 0) : 0}, 98, 71, 1)`}
        />
    );
}

export default Geography;
