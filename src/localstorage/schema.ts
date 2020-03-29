export type LocalStorageSchemaKey = keyof LocalStorageSchema;

export interface LocalStorageSchema {
  totalChance: number;
  currentPopulation: number;
  currentConfirmed: number;
  currentRecovered: number;
  currentDeaths: number;

  // user input
  country: string;

  // settings
  undocumentedCasesMultiplicator: number;
}
