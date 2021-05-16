import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Sphere, Graticule } from "react-simple-maps";
import { CountryCo2Data } from "./types";
import Geography from "../Geography";
import styled from "styled-components/macro";
import Slider from "../Slider";
import ReactTooltip from "react-tooltip";

const projectionConfig = {
    scale: 147,
};

function ChoroplethMap() {
    const [data, setData] = useState<CountryCo2Data>({});
    const [geo, setGeo] = useState({});
    const [loading, setLoading] = useState(false);
    const [curYear, setYear] = useState<number>(2019);
    const [content, setTooltip] = useState("");

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch("https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.json")
                .then((response) => response.json())
                .then((data) => setData(data)),
            fetch(
                "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
            )
                .then((response) => response.json())
                .then((data) => setGeo(data)),
        ]).finally(() => {
            setLoading(false);
        });
    }, []);

    if (!data) {
        return null;
    }

    return (
        <>
            <ReactTooltip>{content}</ReactTooltip>
            <Slider
                curYear={curYear}
                onChange={(_evt, value) => {
                    if (Array.isArray(value)) return;
                    setYear(value);
                }}
            />
            {loading && <Loading>Loading CO2 data...</Loading>}
            <ComposableMap data-tip="World" height={500} projectionConfig={projectionConfig}>
                <Sphere fill="#F8F8F8" id="choropleth" stroke="#E4E5E6" strokeWidth={0.5} />
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                {Object.keys(data).length > 0 && (
                    <Geographies geography={geo}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    setTooltip={setTooltip}
                                    data={data}
                                    curYear={curYear}
                                    geo={geo}
                                />
                            ))
                        }
                    </Geographies>
                )}
            </ComposableMap>
        </>
    );
}

const Loading = styled.p`
    position: absolute;
    top: 140px;
`;

export default ChoroplethMap;
