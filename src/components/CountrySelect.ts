import { SelectComponent } from "./utils/SelectComponent";
import { getCurrent } from "../api/corona/getCurrent";
import { LocalStorageSchema } from "../localstorage/schema";
import { write } from "../localstorage/index";
import { getPopulation } from "../data/utils/getPopulation";

export class CountrySelect extends SelectComponent {
  static component = "country-select";

  country?: LocalStorageSchema["country"];

  constructor(element: Element) {
    super(element);

    this.element.addEventListener("change", async () => {
      write("country", this.element.value);
      this.country = this.element.value;

      const data = await getCurrent(
        this.element.value === "World" ? undefined : this.element.value
      );

      console.log(data);

      if (!data || !this.element.value) return;

      write("currentConfirmed", data.confirmed);
      write("currentDeaths", data.deaths);
      write("currentRecovered", data.recovered);
      write("currentPopulation", getPopulation(this.element.value));
    });
  }
}
