import { Component } from "./Component";

export class InputComponent extends Component {
  isFocused: boolean = false;
  element: HTMLInputElement;

  constructor(element: Element) {
    super(element);

    this.element = element as HTMLInputElement;

    this.element.addEventListener("focus", () => (this.isFocused = true));
    this.element.addEventListener("blur", () => (this.isFocused = false));
  }

  getValueInt() {
    return parseInt(this.element.value, 10);
  }
}
