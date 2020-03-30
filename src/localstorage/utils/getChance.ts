import { read } from "../index";
import { getPopulation } from "../../data/utils/getPopulation";
import { getCorona } from "../../api/corona/getCorona";

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
