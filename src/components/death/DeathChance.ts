import { read, watch } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";
import { TotalChance } from "../TotalChance";

export class DeathChance extends TotalChance {
  static component = "death-chance";

  age: LocalStorageSchema["age"] | undefined;
  deathRates: LocalStorageSchema["deathRates"] | undefined;

  constructor(element: Element) {
    super(element);

    watch("age", age => {
      this.age = age;
      this.refresh();
    });

    watch("deathRates", deathRates => {
      this.deathRates = deathRates;
      this.refresh();
    });
  }

  refresh() {
    const currentDeathProbability = this.getCurrentDeathProbability();
    const totalChance = this.getTotalChance();

    if (
      typeof currentDeathProbability === "undefined" ||
      typeof totalChance === "undefined"
    ) {
      this.element.innerText = "-";
    } else {
      this.element.innerText = this.getNormalizedOutput(
        totalChance * (currentDeathProbability / 100)
      );
    }
  }

  getCurrentDeathProbability() {
    const deathRates = read("deathRates");
    const age = read("age");

    if (!deathRates) return;

    if (age === "average") {
      return (
        deathRates.reduce((previous, current) => previous + current, 0) /
        deathRates.length
      );
    } else if (typeof age !== "undefined") {
      return deathRates[age];
    }
  }
}
