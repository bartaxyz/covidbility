import { watch } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";

export class Collapse {
  static component = "collapse";

  element: HTMLElement;
  header: HTMLElement;
  trigger: HTMLElement;
  content: HTMLElement;
  open = false;

  constructor(element: Element) {
    this.element = element as HTMLElement;

    this.header = this.element.querySelector(
      `[data-${Collapse.component}-header]`
    );
    this.trigger = this.element.querySelector(
      `[data-${Collapse.component}-trigger]`
    );
    this.content = this.element.querySelector(
      `[data-${Collapse.component}-content]`
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
    if (this.content) {
      this.content.style.display = this.open ? "block" : "none";
    }
  }
}
