import { TotalChance } from "./TotalChance";
import { UndocumentedCasesMultiplicator } from "./UndocumentedCasesMultiplicator";

const components = [TotalChance, UndocumentedCasesMultiplicator];

export const refreshComponents = () => {
  components.forEach(Component => {
    const elements = document.querySelectorAll(`[data-${Component.component}]`);

    Array.from(elements).map(element => new Component(element));
  });
};

export const initComponents = refreshComponents;