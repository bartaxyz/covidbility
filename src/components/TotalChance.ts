import { watch } from "../localstorage/index";
import { LocalStorageSchema } from "../localstorage/schema";
import { Component } from "./utils/Component";

export class TotalChance extends Component {
  static component = "total-chance";

  undocumentedCasesMultiplicator:
    | LocalStorageSchema["undocumentedCasesMultiplicator"]
    | undefined;
  currentPopulation: LocalStorageSchema["currentPopulation"] | undefined;
  currentConfirmed: LocalStorageSchema["currentConfirmed"] | undefined;
  currentRecovered: LocalStorageSchema["currentRecovered"] | undefined;
  currentDeaths: LocalStorageSchema["currentDeaths"] | undefined;

  constructor(element: Element) {
    super(element);

    watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
      this.undocumentedCasesMultiplicator = undocumentedCasesMultiplicator;
      this.refresh();
    });

    watch("currentPopulation", currentPopulation => {
      this.currentPopulation = currentPopulation;
      this.refresh();
    });

    watch("currentConfirmed", currentConfirmed => {
      this.currentConfirmed = currentConfirmed;
      this.refresh();
    });

    watch("currentRecovered", currentRecovered => {
      this.currentRecovered = currentRecovered;
      this.refresh();
    });

    watch("currentDeaths", currentDeaths => {
      this.currentDeaths = currentDeaths;
      this.refresh();
    });
  }

  getTotalChance() {
    if (
      typeof this.undocumentedCasesMultiplicator === "undefined" ||
      typeof this.currentPopulation === "undefined" ||
      typeof this.currentConfirmed === "undefined" ||
      typeof this.currentRecovered === "undefined" ||
      typeof this.currentDeaths === "undefined"
    ) {
      return;
    }

    return (
      ((this.currentConfirmed * this.undocumentedCasesMultiplicator -
        this.currentRecovered -
        this.currentDeaths) /
        this.currentPopulation) *
      100
    );
  }

  getNormalizedOutput(value: number) {
    return Number((value >= 100 ? 100 : value).toFixed(4)).toString();
  }

  refresh() {
    const value = this.getTotalChance();

    if (value) {
      this.element.innerText = this.getNormalizedOutput(value);
    } else {
      this.element.innerText = "-";
    }
  }
}
