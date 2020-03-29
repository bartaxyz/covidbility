import { read, watch } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";
import { TotalChance } from "../TotalChance";

export class HospitalizationChance extends TotalChance {
  static component = "hospitalization-chance";

  age: LocalStorageSchema['age'] | undefined;
  hospitalizationRates: LocalStorageSchema['hospitalizationRates'] | undefined;

  constructor(element: Element) {
    super(element);

    watch('age', (age) => {
      this.age = age;
      this.refresh();
    });

    watch('hospitalizationRates', (hospitalizationRates) => {
      this.hospitalizationRates = hospitalizationRates;
      this.refresh();
    })
  }

  refresh() {
    const currentHospitalizationProbability = this.getCurrentHospitalizationProbability();
    const totalChance = this.getTotalChance();

    if (
      typeof currentHospitalizationProbability === "undefined" ||
      typeof totalChance === "undefined"
    ) {
      this.element.innerText = "-";
    } else {
      this.element.innerText = this.getNormalizedOutput(
        totalChance * (currentHospitalizationProbability / 100)
      );
    }
  }

  getCurrentHospitalizationProbability() {
    const hospitalizationRates = read("hospitalizationRates");
    const age = read("age");

    if (!hospitalizationRates) return;

    if (age === "average") {
      return (
        hospitalizationRates.reduce(
          (previous, current) => previous + current,
          0
        ) / hospitalizationRates.length
      );
    } else if (typeof age !== "undefined") {
      return hospitalizationRates[age];
    }
  }
}
