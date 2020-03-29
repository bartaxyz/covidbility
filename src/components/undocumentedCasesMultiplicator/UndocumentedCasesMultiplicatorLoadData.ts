import { write } from "../../localstorage/index";
import { Component } from "../utils/Component";

export class UndocumentedCasesMultiplicatorLoadData extends Component {
  static component = "undocumented-cases-multiplicator-load-data";

  constructor(element: Element) {
    super(element);

    this.element.addEventListener("click", () => {
      write("undocumentedCasesMultiplicator", 10);
    });
  }
}
