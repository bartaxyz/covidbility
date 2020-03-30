import { read, watch } from "../index";
import { getPopulation } from "../../data/utils/getPopulation";
import { getCorona } from "../../api/corona/getCorona";

export const watchChances = (callback: () => void) => {
  watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
    callback();
  });

  watch("currentPopulation", currentPopulation => {
    callback();
  });

  watch("currentConfirmed", currentConfirmed => {
    callback();
  });

  watch("currentRecovered", currentRecovered => {
    callback();
  });

  watch("currentDeaths", currentDeaths => {
    callback();
  });
};

export const getChance = async (day: number = 0) => {
  const undocumentedCasesMultiplicator = read("undocumentedCasesMultiplicator");
  const country = read("country") || "World";
  const currentPopulation = getPopulation(country);
  const corona = await getCorona();

  if (typeof corona === "undefined") {
    return;
  }

  const coronaData = corona[country];
  const coronaDataPoint = coronaData[coronaData.length - 1 - Math.abs(day)];

  const currentConfirmed = coronaDataPoint.confirmed;
  const currentRecovered = coronaDataPoint.recovered;
  const currentDeaths = coronaDataPoint.deaths;

  if (
    typeof undocumentedCasesMultiplicator === "undefined" ||
    typeof currentPopulation === "undefined" ||
    typeof currentConfirmed === "undefined" ||
    typeof currentRecovered === "undefined" ||
    typeof currentDeaths === "undefined"
  ) {
    return;
  }

  return (
    ((currentConfirmed * undocumentedCasesMultiplicator -
      currentRecovered -
      currentDeaths) /
      currentPopulation) *
    100
  );
};
