export class DisabledSection {
  static component = "disabled-section";

  element: HTMLElement;

  constructor(element: Element) {
    this.element = element as HTMLElement;

    this.element.style.pointerEvents = "none";
    this.element.style.opacity = "0.2";
  }
}
