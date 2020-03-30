import { api } from "./api/index";
import { initComponents } from "./components/index";
import { write } from "./localstorage/index";
import { deathRate } from "./data/deathRate";
import { hospitalizationRate } from "./data/hospitalizationRate";
import { ageRanges } from "./data/ageRanges";
import { getPopulation } from "./data/utils/getPopulation";
import { getCorona } from "./api/corona/getCorona";

const { corona } = api;

addEventListener("DOMContentLoaded", () => {
  initComponents();
});

// Clear data
// TODO: Load data from url
write("undocumentedCasesMultiplicator", 10);
write("deathRates", deathRate.average);
write("hospitalizationRates", hospitalizationRate.average);
write("age", "average");

write("currentPopulation", getPopulation("World"));

(async () => {
  // await corona.getCurrent();

  const worldData = (await getCorona())["World"];

  const data = worldData[worldData.length - 1];

  write("currentConfirmed", data.confirmed);
  write("currentRecovered", data.recovered);
  write("currentDeaths", data.deaths);
})();
