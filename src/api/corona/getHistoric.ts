import { endpoint } from "./endpoint";

export const getHistoric = async (country: string = "global") => {
  return await fetch(`${endpoint}/history?country=${country}`).then(body =>
    body.json()
  );
};
