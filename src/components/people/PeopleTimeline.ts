import { Component } from "../utils/Component";
import { getChance } from "../../localstorage/utils/getChance";
import { normalizeOutput } from "../../localstorage/utils/normalizeOutput";
import { LocalStorageSchema } from "../../localstorage/schema";
import { read, watch, write } from "../../localstorage/index";
import { getCombinedChance } from "../../data/utils/getCombinedChance";

export class PeopleTimeline extends Component {
  static component = "people-timeline";

  itemTemplate: any;
  containers: { element: HTMLElement; day: number }[];
  people: LocalStorageSchema["people"] = [];

  draggable: any;
  draggingPerson?: LocalStorageSchema["people"][number];
  draggingOverContainer?: string;

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
    this.initDraggable();

    watch("country", () => {
      this.refreshChances();
    });

    watch("people", people => {
      this.refreshChances();
      this.refreshDraggable();
    });
  }

  destroyDraggable() {
    this.draggable.destroy();
  }

  initDraggable() {
    this.draggable = new Draggable.Sortable(
      document.querySelectorAll("[data-drag-container]"),
      {
        draggable: `.item-person`,
        mirror: { constrainDimensions: true },
        classes: { "source:dragging": "is-ghosted" },
        plugins: [Draggable.Plugins.ResizeMirror]
      }
    );

    this.draggable.on(
      "drag:start",
      ({ originalSource }: { originalSource: HTMLElement }) => {
        const people = read("people")!;
        const name = originalSource.getAttribute("data-person");
        this.draggingPerson = people.find(person => person.name === name);
      }
    );

    this.draggable.on(
      "drag:over:container",
      ({ overContainer }: { overContainer: HTMLElement }) => {
        this.draggingOverContainer = overContainer.getAttribute(
          "data-drag-container"
        )!;
      }
    );

    this.draggable.on("drag:stop", () => {
      const people = read("people")!;
      const personIndex = people.findIndex(
        person => person.name === this.draggingPerson!.name
      );
      people[personIndex].day = parseInt(this.draggingOverContainer!, 10);
      write("people", people);
      this.refreshChances();
    });
  }

  refreshDraggable() {
    if (!this.draggable) {
      this.initDraggable();
    } else {
      this.draggable.destroy();
      this.refreshTimeline();
      this.initDraggable();
    }
  }

  renderItem(person: LocalStorageSchema["people"][0]) {
    const template = this.itemTemplate.content.children[0];
    const personItem = template.cloneNode(true);

    personItem.addEventListener("mouseover", () =>
      Array.from<HTMLElement>(
        document.querySelectorAll(`[data-person="${person.name}"]`)
      ).forEach(element => {
        element.classList.add("is-highlighted");
      })
    );
    personItem.addEventListener("mouseout", () =>
      Array.from<HTMLElement>(
        document.querySelectorAll(`[data-person="${person.name}"]`)
      ).forEach(element => {
        element.classList.remove("is-highlighted");
      })
    );

    personItem.querySelector("[data-name]").innerText = person.name;

    personItem.setAttribute("data-person", person.name);

    return personItem;
  }

  refreshTimeline() {
    const people = read("people")!;

    this.containers.forEach(container => {
      console.log(container);
      // Remove all content from container
      container.element.innerHTML = "";

      const currentPeople = people.filter(
        person => person.day === container.day
      );
      console.log(currentPeople);

      currentPeople!.forEach(person => {
        container.element.appendChild(this.renderItem(person));
      });
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
