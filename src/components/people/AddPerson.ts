import { Component } from "../utils/Component";
import { read, write } from "../../localstorage/index";

export class AddPerson extends Component {
  static component = "add-person";

  letters = "ABCDEFGHIKLMNOPQRSTVXYZ";

  constructor(element: Element) {
    super(element);

    console.log("add-person");

    this.element.addEventListener("click", () => {
      const people = read("people")!;

      const name = this.letters[people.length]
        ? this.letters[people.length]
        : "" + (people.length - this.letters.length);

      people.push({
        name,
        day: 0
      });

      write("people", people);
    });
  }
}
