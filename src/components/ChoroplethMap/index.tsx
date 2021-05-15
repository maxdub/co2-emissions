import React, { useEffect, useState } from "react";
// import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from "react-simple-maps";
import Slider from "@material-ui/core/slider";
import styled from "styled-components/macro";

type Props = {};

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear().domain([0, 100, 500, 1000]).range([0, 150, 200, 255]);

type Co2Data = {
    co2: number;
    co2_per_capita: number;
    coal_co2: number;
    coal_co2_per_capita: number;
    cumulative_co2: number;
    cumulative_coal_co2: number;
    population: number;
    share_global_co2: number;
    share_global_coal_co2: number;
    share_global_cumulative_co2: number;
    share_global_cumulative_coal_co2: number;
    year: number;
};

type CountryData = {
    iso_code: string;
    data: Array<Co2Data>;
};

type CountryCo2Data = {
    [key: string]: CountryData;
};

function ChoroplethMap(props: Props) {
    const [data, setData] = useState<CountryCo2Data>({});
    const [curYear, setYear] = useState<number>(2019);

    useEffect(() => {
        // get a loading screen
        // error screen?

        fetch("https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.json")
            .then((response) => response.json())
            .then((data) => setData(data));
        // csv(`/vulnerability.csv`).then((data) => {
        //   setData(data);
        // });
    }, []);

    if (!data) {
        return null;
    }

    return (
        <>
            <Slider
                onChangeCommitted={(_evt, value) => {
                    console.log("value", value);
                    if (Array.isArray(value)) return;
                    setYear(value);
                }}
                marks={true}
                defaultValue={2019}
                min={1864}
                step={1}
                max={2019}
            />

            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147,
                }}
            >
                <Sphere fill="#FFFFFF" id="choropleth" stroke="#E4E5E6" strokeWidth={0.5} />
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                {Object.keys(data).length > 0 && (
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                // console.log("geo", geo);
                                const key: string | undefined = Object.keys(data).find(
                                    (s: string) => data[s].iso_code === geo.properties.ISO_A3,
                                );

                                const year = key
                                    ? data[key].data.find(({ year }) => {
                                          return year === curYear;
                                      })
                                    : null;

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={`rgba(${year ? colorScale(year.co2 ? year.co2 : 0) : 0}, 98, 71, 1)`}
                                    />
                                );
                            })
                        }
                    </Geographies>
                )}
            </ComposableMap>
        </>
    );
}

export default ChoroplethMap;
