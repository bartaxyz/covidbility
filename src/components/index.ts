import { DeathChance } from "./DeathChance";
import { HospitalizationChance } from "./HospitalizationChance";
import { TotalChance } from "./TotalChance";
import { UndocumentedCasesMultiplicator } from "./UndocumentedCasesMultiplicator";
import { Collapse } from "./ui/Collapse";

const components = [
  Collapse,
  DeathChance,
  HospitalizationChance,
  TotalChance,
  UndocumentedCasesMultiplicator
];

export const refreshComponents = () => {
  components.forEach(Component => {
    const elements = document.querySelectorAll(`[data-${Component.component}]`);

    Array.from(elements).map(element => new Component(element));
  });
};

export const initComponents = refreshComponents;
