import { api } from "./api/index";
import { initComponents } from "./components/index";
import { write } from "./localstorage/index";
import { deathRate } from "./data/deathRate";
import { hospitalizationRate } from "./data/hospitalizationRate";
import { ageRanges } from "./data/ageRanges";
import { getPopulation } from "./data/utils/getPopulation";

const { corona } = api;

console.log("Hello World");

addEventListener("DOMContentLoaded", () => {
  initComponents();
});

console.log(ageRanges);

// Clear data
// TODO: Load data from url
write("undocumentedCasesMultiplicator", 10);
write("deathRates", deathRate.average);
write("hospitalizationRates", hospitalizationRate.average);
write("age", "average");

write("currentPopulation", getPopulation("World"));

(async () => {
  const data = await corona.getCurrent();

  write("currentConfirmed", data.confirmed);
  write("currentRecovered", data.recovered);
  write("currentDeaths", data.deaths);
})();
