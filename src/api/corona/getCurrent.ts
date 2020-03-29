import { endpoint } from "./endpoint";

export const getCurrent = async (country: string | undefined) => {
  console.log("getCurrent");
  return await fetch(
    `${endpoint}/${country ? `current?country=${country}` : ""}`
  ).then(body => body.json());
};
