import { Component } from "./utils/Component";
import { watch, read } from "../localstorage/index";
import { LocalStorageSchema } from "../localstorage/schema";
import { countries } from "../data/countries";

export class TotalChanceTitle extends Component {
  static component = "total-chance-title";

  country: LocalStorageSchema["country"];

  constructor(element: Element) {
    super(element);

    this.country = read("country")!;

    watch("country", (country) => {
      this.country = country!;
      this.refresh();
    });
  }

  async refresh() {
    if (this.country === "World") {
      this.element.style.display = "";
    } else {
      this.element.style.display = "none";
    }
  }
}

export class TotalChanceTitleCountry extends Component {
  static component = "total-chance-title-country";

  country: LocalStorageSchema["country"];

  constructor(element: Element) {
    super(element);

    this.country = read("country")!;

    watch("country", (country) => {
      this.country = country!;
      this.refresh();
    });
  }

  async refresh() {
    if (this.country === "World") {
      this.element.style.display = "none";
    } else {
      this.element.style.display = "";
    }

    const countryNameElement = this.element.querySelector(
      "[data-country-name]"
    ) as HTMLElement;
    if (countryNameElement) {
      const countryName = countries.find(
        (country) => country.value === this.country
      )?.text;
      countryNameElement.innerText = countryName || this.country;
    }
  }
}
