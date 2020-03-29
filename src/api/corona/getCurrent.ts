import { endpoint } from "./endpoint";

export type GetCurrentResult = Promise<{
  confirmed: number;
  recovered: number;
  deaths: number;
}>;

export const getCurrent = async (country?: string): GetCurrentResult => {
  return await fetch(
    `${endpoint}/${country ? `current?country=${country}` : ""}`
  ).then(body => body.json());
};
