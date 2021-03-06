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
  activityId: number;
  distance: number;
  duration: number;
  calories: number;
  manual: boolean;
  student: {
    user: User;
  };
}

export type CreateUserActivity = Omit<StudentActivity, 'id' | 'student'>;
