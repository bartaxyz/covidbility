import { Component } from "./Component";

export class SelectComponent extends Component {
  element: HTMLSelectElement;

  constructor(element: Element) {
    super(element);

    this.element = element as HTMLSelectElement;
  }
}
