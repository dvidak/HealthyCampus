export interface Unit {
  id: number;
  name: string;
}

export interface UpdateUnitData {
  universityId: number;
  unitId: number;
  name: string;
}

export enum RowType {
  university = 'university',
  unit = 'unit',
}
