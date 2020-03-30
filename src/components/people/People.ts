import { Component } from "../utils/Component";

export class People extends Component {
  component = "people";

  constructor(element: Element) {
    super(element);

    console.log("people");
  }
}
