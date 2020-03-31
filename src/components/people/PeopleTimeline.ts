import { Component } from "../utils/Component";
import { getChance } from "../../localstorage/utils/getChance";
import { normalizeOutput } from "../../localstorage/utils/normalizeOutput";
import { LocalStorageSchema } from "../../localstorage/schema";
import { read } from "../../localstorage/index";

export class PeopleTimeline extends Component {
  static component = "people-timeline";

  itemTemplate: any;
  containers: HTMLElement[];

  constructor(element: Element) {
    super(element);

    console.log("people-timeline");

    this.itemTemplate = document.getElementById("template-timeline-item")!;
    this.containers = Array.from(document.querySelectorAll("[data-drag-container]"));

    this.refreshChances();

    this.refreshTimeline();

    new Draggable.Sortable(document.querySelectorAll("[data-drag-container]"), {
      draggable: `.item-person`,
      mirror: {
        constrainDimensions: true
      },
      classes: {
        // mirror: 'is-ghosted',
        // 'source:origina': 'is-ghosted',
        'source:dragging': 'is-ghosted',
      },
      plugins: [Draggable.Plugins.ResizeMirror]
    });
  }

  renderItem(person: LocalStorageSchema["people"][0]) {
    const template = this.itemTemplate.content.children[0];
    const personItem = template.cloneNode(true);

    personItem.addEventListener("mouseover", () =>
      personItem.classList.add("is-highlighted")
    );
    personItem.addEventListener("mouseout", () =>
      personItem.classList.remove("is-highlighted")
    );

    personItem.querySelector("[data-name]").innerText = person.name;

    return personItem;
  }

  refreshTimeline() {
    const people = read('people');
    people?.forEach((person) => {
      this.renderItem(person);
    })
  }

  refreshChances() {
    const elements = this.element.querySelectorAll("[data-chance]");

    elements.forEach(async (element: any) => {
      const day = parseInt(element.getAttribute("data-chance")!, 10);
      const chance = await getChance(day);
      element.innerText = chance ? normalizeOutput(chance) : "-";
    });
  }
}
