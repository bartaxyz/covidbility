import { SelectComponent } from "./utils/SelectComponent";
import { getCurrent } from "../api/corona/getCurrent";
import { LocalStorageSchema } from "../localstorage/schema";
import { write } from "../localstorage/index";
import { getPopulation } from "../data/utils/getPopulation";
import { getCorona } from "../api/corona/getCorona";

export class CountrySelect extends SelectComponent {
  static component = "country-select";

  country?: LocalStorageSchema["country"];

  constructor(element: Element) {
    super(element);

    this.element.addEventListener("change", async () => {
      write("country", this.element.value);
      this.country = this.element.value;

      if (!this.country) return;

      const data = (await getCorona())[this.country];

      const lastDataPoint = data[data.length - 1];

      if (!data || !lastDataPoint || !this.element.value) return;

      write("currentConfirmed", lastDataPoint.confirmed);
      write("currentDeaths", lastDataPoint.deaths);
      write("currentRecovered", lastDataPoint.recovered);
      write("currentPopulation", getPopulation(this.element.value));
    });
  }
}
