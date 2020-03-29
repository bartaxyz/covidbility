import { watch } from "../localstorage/index";
import { LocalStorageSchema } from "../localstorage/schema";

export class TotalChance {
  static component = "total-chance";

  element: HTMLElement;
  undocumentedCasesMultiplicator:
    | LocalStorageSchema["undocumentedCasesMultiplicator"]
    | undefined;
  currentPopulation: LocalStorageSchema["currentPopulation"] | undefined;
  currentConfirmed: LocalStorageSchema["currentConfirmed"] | undefined;
  currentRecovered: LocalStorageSchema["currentRecovered"] | undefined;

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

    watch("currentRecovered", currentRecovered => {
      this.currentRecovered = currentRecovered;
      this.refresh();
    });
  }

  refresh() {
    console.log([
      this.undocumentedCasesMultiplicator,
      this.currentPopulation,
      this.currentConfirmed,
      this.currentRecovered
    ]);
    if (
      typeof this.undocumentedCasesMultiplicator === "undefined" ||
      typeof this.currentPopulation === "undefined" ||
      typeof this.currentConfirmed === "undefined" ||
      typeof this.currentRecovered === "undefined"
    ) {
      this.element.innerText = "-";
      return;
    }

    const value =
      ((this.currentConfirmed - this.currentRecovered) /
        this.currentPopulation) *
      this.undocumentedCasesMultiplicator *
      100;

    this.element.innerText = Number(
      (value >= 100 ? 100 : value).toFixed(4)
    ).toString();
  }
}
