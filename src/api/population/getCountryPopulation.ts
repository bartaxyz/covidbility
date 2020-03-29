const endpoint = "https://restcountries.eu/rest/v2";

export const getCountryPopulation = async (countryCode: string) => {
  return await fetch(
    `${endpoint}/alpha/${countryCode}?fields=population`
  ).then(body => body.json());
};
