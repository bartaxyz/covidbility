import { watch, write } from "../../localstorage/index";
import { InputComponent } from "../utils/InputComponent";

export class UndocumentedCasesMultiplicator extends InputComponent {
  static component = "undocumented-cases-multiplicator";

  constructor(element: Element) {
    super(element);

    watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
      if (!this.isFocused) {
        this.element.value = undocumentedCasesMultiplicator
          ? `${undocumentedCasesMultiplicator}`
          : "";
      }
    });

    this.element.addEventListener("input", () => {
      write(
        "undocumentedCasesMultiplicator",
        this.element.value ? parseInt(this.element.value, 10) : 0
      );
    });
  }
}
