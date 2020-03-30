import { watch } from "../localstorage/index";
import { LocalStorageSchema } from "../localstorage/schema";
import { Component } from "./utils/Component";
import { getChance } from "../localstorage/utils/getChance";
import { normalizeOutput } from "../localstorage/utils/normalizeOutput";

export class TotalChance extends Component {
  static component = "total-chance";

  undocumentedCasesMultiplicator?: LocalStorageSchema["undocumentedCasesMultiplicator"];
  currentPopulation?: LocalStorageSchema["currentPopulation"];
  currentConfirmed?: LocalStorageSchema["currentConfirmed"];
  currentRecovered?: LocalStorageSchema["currentRecovered"];
  currentDeaths?: LocalStorageSchema["currentDeaths"];

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

  async getTotalChance() {
    return await getChance(0);
  }

  getNormalizedOutput(value: number) {
    return normalizeOutput(value);
  }

  async refresh() {
    const value = await this.getTotalChance();

    if (value) {
      this.element.innerText = this.getNormalizedOutput(value);
    } else {
      this.element.innerText = "-";
    }
  }
}
