import { ICountryInfo } from './ICountryInfo';

export interface ICovid {
  updated: any;
  country: string;
  countryInfo: ICountryInfo;
  cases: number;
  todayCases: number;
  diffCases: number;
  deaths: number;
  todayDeaths: number;
  diffDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  todayTests: number;
  testsPerOneMillion: number;
  continent: string;
}
