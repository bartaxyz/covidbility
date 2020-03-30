import { Component } from "../utils/Component";
import { watch, write } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";
import { AddPerson } from "./AddPerson";
import { getChance } from "../../localstorage/utils/getChance";
import { normalizeOutput } from "../../localstorage/utils/normalizeOutput";

export class PeopleList extends Component {
  static component = "people-list";

  itemTemplate: any;
  emptyItemTemplate: any;
  people?: LocalStorageSchema["people"];

  constructor(element: Element) {
    super(element);

    this.itemTemplate = document.getElementById("template-person-list-item")!;
    this.emptyItemTemplate = document.getElementById(
      "template-person-list-empty-item"
    )!;

    watch("people", people => {
      this.people = people;
      this.refreshPeopleList();
    });
  }

  renderEmptyItem() {
    const template = this.emptyItemTemplate.content.children[0];
    const emptyItem = template.cloneNode(true);
    new AddPerson(emptyItem.querySelector("[data-add-person]"));
    return emptyItem;
  }

  async renderItem(person: LocalStorageSchema["people"][0], index: number) {
    const template = this.itemTemplate.content.children[0];
    const personItem = template.cloneNode(true);

    personItem.addEventListener("mouseover", () =>
      personItem.classList.add("is-highlighted")
    );
    personItem.addEventListener("mouseout", () =>
      personItem.classList.remove("is-highlighted")
    );

    personItem.querySelector("[data-name]").innerText = person.name;

    personItem.querySelector("[data-day]").innerText =
      person.day === 0
        ? "Today"
        : person.day === 1
        ? "Yesterday"
        : `${-person.day}`;

    personItem.querySelector("[data-remove]").addEventListener("click", () => {
      this.people?.splice(index, 1);
      write("people", this.people!);
    });

    console.log(await getChance(0));

    const chance = await getChance(person.day);

    personItem.querySelector("[data-chance]").innerText = chance
      ? normalizeOutput(chance)
      : "-";

    return personItem;
  }

  clearChildren() {
    const { children } = this.element;

    Array.from(children).forEach((child: Element) => {
      this.element.removeChild(child);
    });
  }

  async refreshPeopleList() {
    this.clearChildren();

    console.log("element", this.element);

    this.people?.forEach(async (person, index) => {
      this.element.appendChild(await this.renderItem(person, index));
    });

    setTimeout(() => {
      this.element.appendChild(this.renderEmptyItem());
    }, 0);
  }
}
