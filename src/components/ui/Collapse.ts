export class Collapse {
  static component = "collapse";

  element: HTMLElement;
  header: HTMLElement | null;
  trigger: HTMLElement | null;
  triggerLabel: HTMLElement | null;
  content: HTMLElement | null;
  openElements: HTMLElement[];
  closedElements: HTMLElement[];
  open = false;

  constructor(element: Element) {
    this.element = element as HTMLElement;

    this.header = this.element.querySelector(
      `[data-${Collapse.component}-header]`
    );
    this.trigger = this.element.querySelector(
      `[data-${Collapse.component}-trigger]`
    );
    this.triggerLabel = this.element.querySelector(
      `[data-${Collapse.component}-trigger-label]`
    );
    this.content = this.element.querySelector(
      `[data-${Collapse.component}-content]`
    );

    this.openElements = Array.from(
      this.element.querySelectorAll(`[data-${Collapse.component}-open]`)
    );

    this.closedElements = Array.from(
      this.element.querySelectorAll(`[data-${Collapse.component}-closed]`)
    );

    if (this.trigger) {
      this.trigger.addEventListener("click", () => {
        this.open = !this.open;
        this.refresh();
      });
    }

    this.refresh();
  }

  refresh() {
    if (this.triggerLabel) {
      this.triggerLabel.innerText = this.open ? "Hide" : "Show";
    }
    if (this.content) {
      this.content.style.display = this.open ? "block" : "none";
    }

    this.closedElements.map(
      element => (element.style.display = this.open ? "none" : "inline")
    );
    this.openElements.map(
      element => (element.style.display = this.open ? "inline" : "none")
    );
  }
}
