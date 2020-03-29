export type LocalStorageSchemaKey = keyof LocalStorageSchema;

export interface LocalStorageSchema {
  currentPopulation: number;
  currentConfirmed: number;
  currentRecovered: number;
  currentDeaths: number;

  deathRates: number[];
  hospitalizationRates: number[];

  // user input
  country: "global" | string;
  age: "average" | number;

  // settings
  undocumentedCasesMultiplicator: number;
}
