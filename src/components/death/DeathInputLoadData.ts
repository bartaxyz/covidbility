import { write } from "../../localstorage/index";
import { deathRate } from "../../data/deathRate";
import { Component } from "../utils/Component";

export class DeathInputLoadData extends Component {
  static component = "death-input-load-data";

  key: keyof typeof deathRate;

  constructor(element: Element) {
    super(element);

    this.key = this.element.getAttribute(
      `data-${DeathInputLoadData.component}`
    ) as keyof typeof deathRate;

    this.element.addEventListener("click", () => {
      const rates = deathRate[this.key];
      if (rates) {
        write("deathRates", rates);
      }
    });
  }
}
