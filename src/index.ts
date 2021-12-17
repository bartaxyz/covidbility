import { api } from "./api/index";
import { initComponents } from "./components/index";
import { write } from "./localstorage/index";
import { deathRate } from "./data/deathRate";
import { hospitalizationRate } from "./data/hospitalizationRate";
import { getPopulation } from "./data/utils/getPopulation";
import { getCorona } from "./api/corona/getCorona";
import { getIPApi } from "./api/ipapi";
import { countries } from "./data/countries";

const { corona } = api;

addEventListener("DOMContentLoaded", () => {
  initComponents();
});

// Clear data

write("country", "World");
write("undocumentedCasesMultiplicator", 1.5);
write("deathRates", deathRate.average);
write("hospitalizationRates", hospitalizationRate.average);
write("age", 0);
write("people", [
  {
    day: 0,
    name: "A",
  },
]);

write("currentPopulation", getPopulation("World"));

console.log("Script Loaded Successfully");

(async () => {
  // await corona.getCurrent();

  const ipCountryName = (await getIPApi()).country_name;

  if (ipCountryName) {
    const result = countries.find(
      (country) =>
        country.text === ipCountryName || country.value === ipCountryName
    );
    if (result) {
      write("country", result.value);
    }
  }

  const worldData = (await getCorona())["World"];

  const data = worldData[worldData.length - 1];

  write("currentConfirmed", data.confirmed);
  write("currentRecovered", data.recovered);
  write("currentDeaths", data.deaths);
})();
