import { Component } from "../utils/Component";
import { watch } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";

export class People extends Component {
  static component = "people";

  personTemplate: any;
  people?: LocalStorageSchema["people"];

  constructor(element: Element) {
    super(element);

    this.personTemplate = document.getElementById("template-person")!;

    watch("people", people => {
      this.people = people;
      this.refreshPeopleList();
    });
  }

  renderPerson() {
    const personElement = this.personTemplate.content.children[0];

    return personElement;
  }

  refreshPeopleList() {
    console.log("refreshPeopleList");

    console.log(this.personTemplate);
  }
}
