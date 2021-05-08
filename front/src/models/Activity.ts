import { User } from './User';

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
  type?: {
    id: number;
    type: string;
    subType: string;
  };
  userActivities?: StudentActivity[];
}

export interface StudentActivity {
  id: number;
  userId: number;
  activityId: string;
  distance: number;
  duration: number;
  calories: number;
  elevation: number;
  startTime: string;
  student: User;
}
