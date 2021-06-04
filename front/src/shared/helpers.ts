import { Activity } from '../models/Activity';
import { Unit } from '../models/Unit';
import { University } from '../models/University';

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

export const activityOptions = (activities: Activity[]): any[] => {
  return activities.map((a) => ({
    id: a.id,
    name: a.name,
  }));
};

export const getDate = (date: string) => {
  const parsed = new Date(parseInt(date));

  const parsedMonth = parsed.getMonth() + 1;
  const month = parsedMonth < 10 ? `0${parsedMonth}` : parsedMonth;

  const parsedDate = parsed.getDate();
  const day = parsedDate < 10 ? `0${parsedDate}` : parsedDate;

  return day + '.' + month + '.' + parsed.getFullYear() + '.';
};

export const getDateYYYYMMDDFormat = (date: string) => {
  const parsed = new Date(parseInt(date));

  const parsedMonth = parsed.getMonth() + 1;
  const month = parsedMonth < 10 ? `0${parsedMonth}` : parsedMonth;

  const parsedDate = parsed.getDate();
  const day = parsedDate < 10 ? `0${parsedDate}` : parsedDate;

  return parsed.getFullYear() + '.' + month + '.' + day + '.';
};
