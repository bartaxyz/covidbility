import { write } from "../../localstorage/index";
import { hospitalizationRate } from "../../data/hospitalizationRate";
import { Component } from "../utils/Component";

export class HospitalizationInputLoadData extends Component {
  static component = "hospitalization-input-load-data";

  key: keyof typeof hospitalizationRate;

  constructor(element: Element) {
    super(element);

    this.key = this.element.getAttribute(
      `data-${HospitalizationInputLoadData.component}`
    ) as keyof typeof hospitalizationRate;

    this.element.addEventListener("click", () => {
      const rates = hospitalizationRate[this.key];
      if (rates) {
        write("hospitalizationRates", rates);
      }
    });
  }
}
