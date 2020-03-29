import { population } from "../population";

export const getPopulation = (country: "World" | string = "World") => {
  if (country === "World") {
    return 7794798739; // Taken from https://www.worldometers.info/world-population/
  } else {
    const result = population.find(item => item.country === country);

    if (!result) {
      console.error(new Error(`Population for ${country} not found`));
      return 7794798739; // Taken from https://www.worldometers.info/world-population/
    }

    return result.population!;
  }
};
