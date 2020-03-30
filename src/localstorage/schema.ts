export type LocalStorageSchemaKey = keyof LocalStorageSchema;

export interface PeopleType {
  name: string;
  day: number;
}

export interface LocalStorageSchema {
  currentPopulation: number;
  currentConfirmed: number;
  currentRecovered: number;
  currentDeaths: number;

  deathRates: number[];
  hospitalizationRates: number[];

  // people
  people: PeopleType[];

  // user input
  country: "global" | string;
  age: "average" | number;

  // settings
  undocumentedCasesMultiplicator: number;
}
