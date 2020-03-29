import { watch, write, read } from "../../localstorage/index";
import { InputComponent } from "../utils/InputComponent";

export class DeathInput extends InputComponent {
  static component = "death-input";

  isAverage: boolean = false;
  index?: number;

  constructor(element: Element) {
    super(element);

    const attributeValue = this.element.getAttribute(
      `data-${DeathInput.component}`
    );

    if (attributeValue === "average") {
      this.isAverage = true;
    } else {
      this.index = parseInt(
        this.element.getAttribute(`data-${DeathInput.component}`)!,
        10
      );
    }

    watch("deathRates", deathRates => {
      if (!this.isFocused && deathRates) {
        if (
          typeof this.index !== "undefined" &&
          typeof deathRates[this.index] !== "undefined" &&
          parseInt(this.element.value, 10) !== deathRates[this.index]
        ) {
          this.element.value = `${deathRates[this.index]}`;
        } else if (this.isAverage) {
          this.element.value = `${deathRates.reduce(
            (previous, current) => previous + current,
            0
          ) / deathRates.length}`;
        }
      }
    });

    this.element.addEventListener("input", () => {
      const deathRates = read("deathRates");
      if (typeof this.index !== "undefined" && deathRates) {
        deathRates[this.index] = this.getValueInt();
        write("deathRates", deathRates);
      }
    });
  }
}
