export type LocalStorageSchemaKey = keyof LocalStorageSchema;

export interface LocalStorageSchema {
  totalChance: number;
  undocumentedCasesMultiplicator: number;
  currentPopulation: number;
  currentConfirmed: number;
  currentRecovered: number;
  currentDeaths: number;
}
