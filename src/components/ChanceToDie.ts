import { watch } from "../localstorage/index";
import { LocalStorageSchema } from "../localstorage/schema";

export class ChanceToDie {
  static component = "chance-to-die";

  element: HTMLElement;
  undocumentedCasesMultiplicator:
    | LocalStorageSchema["undocumentedCasesMultiplicator"]
    | undefined;
  currentPopulation: LocalStorageSchema["currentPopulation"] | undefined;
  currentDeaths: LocalStorageSchema["currentDeaths"] | undefined;

  constructor(element: Element) {
    this.element = element as HTMLElement;

    watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
      this.undocumentedCasesMultiplicator = undocumentedCasesMultiplicator;
      this.refresh();
    });

    watch("currentPopulation", currentPopulation => {
      this.currentPopulation = currentPopulation;
      this.refresh();
    });

    watch("currentDeaths", currentDeaths => {
      this.currentDeaths = currentDeaths;
      this.refresh();
    });
  }

  refresh() {
    if (
      typeof this.undocumentedCasesMultiplicator === "undefined" ||
      typeof this.currentDeaths === "undefined" ||
      typeof this.currentPopulation === "undefined"
    ) {
      this.element.innerText = "-";
      return;
    }

    const value =
      (this.currentDeaths / this.currentPopulation) *
      this.undocumentedCasesMultiplicator *
      100;

    this.element.innerText = Number(
      (value >= 100 ? 100 : value).toFixed(4)
    ).toString();
  }
}
