type TimeSeriesDataType = {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
};

type TimeSeriesType = {
  [key: string]: TimeSeriesDataType[];
};

let cachedData: TimeSeriesType;
let called = false;

export const getCorona = async () => {
  if (called) {
    return cachedData;
  } else {
    called = true;
  }

  const data: TimeSeriesType = await fetch(
    "https://pomber.github.io/covid19/timeseries.json"
  ).then(response => response.json());

  const dataKeys = Object.keys(data);

  const World = data["China"].map((chinaDatapoint, chinaIndex) => {
    const worldDataPoint: TimeSeriesDataType = {
      date: chinaDatapoint.date,
      confirmed: 0,
      deaths: 0,
      recovered: 0
    };

    dataKeys.forEach(key => {
      const current = data[key][chinaIndex];
      worldDataPoint.confirmed += current.confirmed;
      worldDataPoint.deaths += current.deaths;
      worldDataPoint.recovered += current.recovered;
    });

    return worldDataPoint;
  });

  data.World = World;

  cachedData = data;

  return data;
};
