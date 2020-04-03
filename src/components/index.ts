// ui
import { Collapse } from "./ui/Collapse";
import { DisabledSection } from "./ui/DisabledSection";
// people
import { AddPerson } from "./people/AddPerson";
import { PeopleList } from "./people/PeopleList";
import { PeopleTimeline } from "./people/PeopleTimeline";
// undocumented cases multiplicator
import { UndocumentedCasesMultiplicator } from "./undocumentedCasesMultiplicator/UndocumentedCasesMultiplicator";
import { UndocumentedCasesMultiplicatorLoadData } from "./undocumentedCasesMultiplicator/UndocumentedCasesMultiplicatorLoadData";
// hospitalization probability
import { HospitalizationChance } from "./hospitalization/HospitalizationChance";
import { HospitalizationInput } from "./hospitalization/HospitalizationInput";
import { HospitalizationInputLoadData } from "./hospitalization/HospitalizationInputLoadData";
// death probability
import { DeathChance } from "./death/DeathChance";
import { DeathInput } from "./death/DeathInput";
import { DeathInputLoadData } from "./death/DeathInputLoadData";
// components
import { AgeSelect } from "./AgeSelect";
import { CountrySelect } from "./CountrySelect";
import { TotalChance } from "./TotalChance";
import { TotalChanceTitle, TotalChanceTitleCountry } from "./TotalChanceTitle";

const components = [
  // ui
  Collapse,
  DisabledSection,
  // people
  AddPerson,
  PeopleList,
  PeopleTimeline,
  // undocumented cases multiplicator
  UndocumentedCasesMultiplicator,
  UndocumentedCasesMultiplicatorLoadData,
  // hospitalization probability
  HospitalizationChance,
  HospitalizationInput,
  HospitalizationInputLoadData,
  // death probability
  DeathChance,
  DeathInput,
  DeathInputLoadData,
  // components
  AgeSelect,
  CountrySelect,
  TotalChance,
  TotalChanceTitle,
  TotalChanceTitleCountry,
];

export const refreshComponents = () => {
  components.forEach((Component) => {
    const elements = document.querySelectorAll(`[data-${Component.component}]`);

    Array.from(elements).map((element) => new Component(element));
  });
};

export const initComponents = refreshComponents;
