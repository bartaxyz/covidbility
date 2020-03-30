import { watch, write } from "../localstorage/index";
import { InputComponent } from "./utils/InputComponent";

export class AgeSelect extends InputComponent {
  static component = "age-select";

  isAverage: boolean = false;
  index?: number;

  constructor(element: Element) {
    super(element);

    watch("age", age => {
      const ageString = `${age}`;
      if (ageString !== this.element.value && age) {
        this.element.value = ageString;
      }
    });

    this.element.addEventListener("change", () => {
      if (this.element.value === "average") {
        write("age", this.element.value);
      } else {
        write("age", parseInt(this.element.value, 10));
      }
    });
  }
}
