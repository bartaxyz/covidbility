import { endpoint } from "./endpoint";

export const getCurrent = async (country: string = "global") => {
  return await fetch(`${endpoint}/current?country=${country}`).then(body =>
    body.json()
  );
};
