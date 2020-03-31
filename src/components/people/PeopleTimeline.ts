import { Component } from "../utils/Component";
import { getChance } from "../../localstorage/utils/getChance";
import { normalizeOutput } from "../../localstorage/utils/normalizeOutput";
import { LocalStorageSchema } from "../../localstorage/schema";
import { read, watch } from "../../localstorage/index";
import { getCombinedChance } from "../../data/utils/getCombinedChance";

export class PeopleTimeline extends Component {
  static component = "people-timeline";

  itemTemplate: any;
  containers: { element: HTMLElement; day: number }[];

  constructor(element: Element) {
    super(element);

    this.itemTemplate = document.getElementById("template-timeline-item")!;
    this.containers = Array.from<HTMLElement>(
      document.querySelectorAll("[data-drag-container]")
    ).map(element => {
      return {
        element,
        day: parseInt(element.getAttribute("data-drag-container")!, 10)
      };
    });

    this.refreshChances();

    this.refreshTimeline();

    watch("country", () => {
      this.refreshChances();
    });

    new Draggable.Sortable(document.querySelectorAll("[data-drag-container]"), {
      draggable: `.item-person`,
      mirror: { constrainDimensions: true },
      classes: { "source:dragging": "is-ghosted" },
      plugins: [Draggable.Plugins.ResizeMirror]
    });

    watch("people", () => {
      this.refreshChances();
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
    const people = read("people");
    people?.forEach(person => {
      this.renderItem(person);
    });
  }

  getPeopleChances() {}

  refreshChances() {
    const elements = this.element.querySelectorAll("[data-chance]");

    elements.forEach(async (element: any) => {
      const day = parseInt(element.getAttribute("data-chance")!, 10);
      const chance = await getChance(day);

      const people = read("people")?.filter(person => person.day === day);

      const combinedChance = getCombinedChance(
        Array(people!.length).fill(chance)
      );

      element.innerText = combinedChance
        ? normalizeOutput(combinedChance)
        : "0";
    });
  }
}
