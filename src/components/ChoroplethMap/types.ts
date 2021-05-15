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

export type CountryCo2Data = {
    [key: string]: CountryData;
};
