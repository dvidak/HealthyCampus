export interface Activity {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  goalDistance: number;
  goalDuration: number;
  goalCalories: number;
  goalElevation: number;
  activityTypeId: number;
  userId: number;
}
