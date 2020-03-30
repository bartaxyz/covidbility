import { Component } from "../utils/Component";
import { getChance } from "../../localstorage/utils/getChance";
import { normalizeOutput } from "../../localstorage/utils/normalizeOutput";

console.log("PeopleTimeline", new Draggable.Sortable());

export class PeopleTimeline extends Component {
  static component = "people-timeline";

  constructor(element: Element) {
    super(element);
    console.log("people-timeline");
    this.refreshChances();

    new Draggable.Sortable(document.querySelectorAll("[data-drag-container]"), {
      draggable: `.item-person`,
      mirror: {
        constrainDimensions: true
      },
      plugins: [Draggable.Plugins.ResizeMirror]
    });
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
