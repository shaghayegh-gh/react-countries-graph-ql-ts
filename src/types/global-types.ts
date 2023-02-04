
type Continent = {
  continent: {
    name: string;
  };
};
export type CountryType = { [k: string]: string } & Continent;
export type CountriesType = CountryType[];
export type Data = {
  countries: CountriesType
}