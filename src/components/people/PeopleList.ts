import { Component } from "../utils/Component";
import { watch, write } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";
import { AddPerson } from "./AddPerson";
import { getChance, watchChances } from "../../localstorage/utils/getChance";
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

    watchChances(() => {
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

    const chance = await getChance(person.day);

    personItem.querySelector("[data-chance]").innerText = chance
      ? normalizeOutput(chance)
      : "-";

    return personItem;
  }

  clearChildren() {
    this.element.innerHTML = "";
  }

  async refreshPeopleList() {
    this.clearChildren();

    const emptyItem = this.renderEmptyItem();

    this.element.appendChild(emptyItem);

    this.people?.forEach(async (person, index) => {
      try {
        this.element.insertBefore(
          await this.renderItem(person, index),
          emptyItem
        );
      } catch (e) {}
    });
  }
}
