import { api } from "./api/index";
import { initComponents } from "./components/index";
import { write } from "./localstorage/index";
import { deathRate } from "./data/deathRate";
import { hospitalizationRate } from "./data/hospitalizationRate";
import { getPopulation } from "./data/utils/getPopulation";
import { getCorona } from "./api/corona/getCorona";

const { corona } = api;

addEventListener("DOMContentLoaded", () => {
  initComponents();
});

// Clear data
write("country", "World");
write("undocumentedCasesMultiplicator", 10);
write("deathRates", deathRate.average);
write("hospitalizationRates", hospitalizationRate.average);
write("age", 0);
write("people", [
  {
    day: 0,
    name: "A"
  }
]);

write("currentPopulation", getPopulation("World"));

console.log("Hello World");

(async () => {
  // await corona.getCurrent();

  const worldData = (await getCorona())["World"];

  const data = worldData[worldData.length - 1];

  write("currentConfirmed", data.confirmed);
  write("currentRecovered", data.recovered);
  write("currentDeaths", data.deaths);
})();
