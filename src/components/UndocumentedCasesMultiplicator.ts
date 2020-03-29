import { watch, write } from "../localstorage/index";

export class UndocumentedCasesMultiplicator {
  static component = "undocumented-cases-multiplicator";

  element: HTMLInputElement;
  isFocused: boolean = false;

  constructor(element: Element) {
    this.element = element as HTMLInputElement;

    this.element.addEventListener("focus", () => (this.isFocused = true));
    this.element.addEventListener("blur", () => (this.isFocused = false));

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
