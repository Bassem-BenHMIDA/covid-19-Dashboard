export interface Timeline {
    cases: any;
    deaths: any;
    recovered: any;
}

export interface CountryHistorical {
    country: string;
    provinces: string[];
    timeline: Timeline;
}
