import { Component } from "../utils/Component";
import { read, write, watch } from "../../localstorage/index";

export class AddPerson extends Component {
  static component = "add-person";

  letters = "ABCDEFGHIKLMNOPQRSTVXYZ";

  constructor(element: Element) {
    super(element);

    this.element.addEventListener("click", () => {
      const people = read("people")!;

      people.push({
        name: this.getNewName(),
        day: 0
      });

      write("people", people);
    });
  }

  getNewName(additionalIndex = 0) {
    const people = read("people")!;
    if (people.length === 0) {
      return "A";
    }

    const lastName = people[people.length - 1].name;

    if (lastName === "Z") {
      return "1";
    } else if (isNaN(+lastName)) {
      return this.letters[this.letters.indexOf(lastName) + 1];
    }

    return `${+lastName + 1}`;
  }
}
