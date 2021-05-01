export interface ActivityType {
  id: number;
  fitbitActivityId: number;
  type: string;
  subType: string;
}

export enum RowType {
  type = 'type',
  subType = 'subType',
}