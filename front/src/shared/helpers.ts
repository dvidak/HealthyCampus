import { Unit } from "../models/Unit";
import { University } from "../models/University";

export const universityGroupOptions = (
  universities: University[],
): Record<string, Record<number, string>> => {
  const options: Record<string, Record<number, string>> = {};

  Object.values(universities).forEach((university) => {
    options[university.name] = {};
    university.units.forEach((unit: Unit) => {
      options[university.name][unit.id] = unit.name;
    });
  });

  return options;
};