export type LocalStorageSchemaKey = keyof LocalStorageSchema;

export interface LocalStorageSchema {
  currentPopulation: number;
  currentConfirmed: number;
  currentRecovered: number;
  currentDeaths: number;

  // user input
  country: string;

  // settings
  undocumentedCasesMultiplicator: number;
}
