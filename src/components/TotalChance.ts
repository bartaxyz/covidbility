import { Component } from "./utils/Component";
import { getChance, watchChances } from "../localstorage/utils/getChance";
import { normalizeOutput } from "../localstorage/utils/normalizeOutput";
import { read, watch } from "../localstorage/index";

export class TotalChance extends Component {
  static component = "total-chance";

  constructor(element: Element) {
    super(element);

    watchChances(() => {
      this.refresh();
    });

    watch("people", () => {
      this.refresh();
    });
  }

  async getTotalChance() {
    const people = read("people")!;
    const peopleChances: number[] = [];

    for (let i = 0; i < people.length; ++i) {
      peopleChances.push((await getChance(people[i].day))!);
    }

    return (
      (1 -
        peopleChances.reduce((previous, current) => {
          return previous * (1 - current / 100);
        }, 1)) *
      100
    );
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
