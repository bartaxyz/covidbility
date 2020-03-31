import { Component } from "../utils/Component";
import { read, write, watch } from "../../localstorage/index";
import { LocalStorageSchema } from "../../localstorage/schema";

export class AddPerson extends Component {
  static component = "add-person";

  letters = "ABCDEFGHIKLMNOPQRSTVXYZ";
  people?: LocalStorageSchema["people"];

  constructor(element: Element) {
    super(element);

    watch("people", people => {
      this.people = people;
    });

    this.element.addEventListener("click", () => {
      const people = read("people")!;

      people.push({
        name: this.getNewName(),
        day: 0
      });

      write("people", people);
    });
  }

  getNewName() {
    const people = read("people")!;
    if (people.length === 0) {
      return "A";
    }

    const lastName = people[people.length - 1].name;

    const firstAvailableLetter = Array.from(this.letters).find(letter => {
      let isAvailable = true;

      people.forEach(person => {
        if (person.name === letter) {
          isAvailable = false;
        }
      });

      return isAvailable;
    });

    if (firstAvailableLetter) {
      return firstAvailableLetter;
    }

    if (lastName === "Z") {
      return "1";
    } else if (isNaN(+lastName)) {
      return this.letters[this.letters.indexOf(lastName) + 1];
    }

    return `${+lastName + 1}`;
  }
}
