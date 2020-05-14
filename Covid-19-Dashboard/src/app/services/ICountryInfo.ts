export interface ICountryInfo {
    _id:  number | null;
    iso2: null | string;
    iso3: null | string;
    lat:  number;
    long: number;
    flag: string;
}
export class CountryInfo implements ICountryInfo{
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
    constructor(
        _id: number,
        iso2: string,
        iso3: string,
        lat: number,
        long: number,
        flag: string,
    ){}
}