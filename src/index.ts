import { api } from "./api/index";
import { initComponents } from "./components/index";
import { write } from "./localstorage/index";
import { getGlobalPopulation } from "./api/population/getGlobalPopulation";

const { corona, population } = api;

console.log("Hello World");

addEventListener("DOMContentLoaded", () => {
  initComponents();
});

// Clear data
write("undocumentedCasesMultiplicator", 10);

write("currentPopulation", getGlobalPopulation());

(async () => {
  const data = await corona.getCurrent();

  write("currentConfirmed", data.confirmed);
  write("currentRecovered", data.recovered);
  write("currentDeaths", data.deaths);
})();
