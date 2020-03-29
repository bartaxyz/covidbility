import { read, write, watch } from "../localstorage/index";
import { LocalStorageSchema } from "../localstorage/schema";

export class TotalChance {
  static component = "total-chance";

  element: HTMLElement;
  undocumentedCasesMultiplicator:
    | LocalStorageSchema["undocumentedCasesMultiplicator"]
    | undefined;
  currentPopulation: LocalStorageSchema["currentPopulation"] | undefined;
  currentConfirmed: LocalStorageSchema["currentConfirmed"] | undefined;

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

    watch("currentConfirmed", currentConfirmed => {
      this.currentConfirmed = currentConfirmed;
      this.refresh();
    });
  }

  refresh() {
    if (
      typeof this.undocumentedCasesMultiplicator === "undefined" ||
      typeof this.currentConfirmed === "undefined" ||
      typeof this.currentPopulation === "undefined"
    ) {
      this.element.innerText = "-";
      return;
    }

    this.element.innerText =
      (this.currentConfirmed / this.currentPopulation) *
      this.undocumentedCasesMultiplicator *
      100;
  }
}
