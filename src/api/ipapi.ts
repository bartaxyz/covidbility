export interface IPApiResponseType {
  ip?: string;
  city?: string;
  region?: string;
  region_code?: string;
  country?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  country_name?: string;
  continent_code?: string;
  in_eu?: boolean;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  utc_offset?: string;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number;
  country_population?: number;
  asn?: string;
  org?: string;
}

let cachedData: IPApiResponseType;

let fetchPromise: Promise<IPApiResponseType> = fetch(
  "https://ipapi.co/json"
).then<IPApiResponseType>((response) => response.json());

export const getIPApi = async () => {
  if (cachedData) {
    return cachedData;
  }

  const data: IPApiResponseType = await fetchPromise;

  cachedData = data;

  return data;
};
