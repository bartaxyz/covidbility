import { watch, write, read } from "../../localstorage/index";
import { InputComponent } from "../utils/InputComponent";

export class HospitalizationInput extends InputComponent {
  static component = "hospitalization-input";

  isAverage: boolean = false;
  index?: number;

  constructor(element: Element) {
    super(element);

    const attributeValue = this.element.getAttribute(
      `data-${HospitalizationInput.component}`
    );

    if (attributeValue === "average") {
      this.isAverage = true;
    } else {
      this.index = parseInt(
        this.element.getAttribute(`data-${HospitalizationInput.component}`)!,
        10
      );
    }

    watch("hospitalizationRates", hospitalizationRates => {
      if (!this.isFocused && hospitalizationRates) {
        if (
          typeof this.index !== "undefined" &&
          typeof hospitalizationRates[this.index] !== "undefined" &&
          parseInt(this.element.value, 10) !== hospitalizationRates[this.index]
        ) {
          this.element.value = `${hospitalizationRates[this.index]}`;
        } else if (this.isAverage) {
          this.element.value = `${hospitalizationRates.reduce(
            (previous, current) => previous + current,
            0
          ) / hospitalizationRates.length}`;
        }
      }
    });

    this.element.addEventListener("input", () => {
      const hospitalizationRates = read("hospitalizationRates");
      if (typeof this.index !== "undefined" && hospitalizationRates) {
        hospitalizationRates[this.index] = this.getValueInt();
        write("hospitalizationRates", hospitalizationRates);
      }
    });
  }
}
