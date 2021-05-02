export interface User {
  id: number;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  fitbit: {
    accessToken: string;
    refreshToken: string;
    fitbitId: string;
  };
  userUnit: {
    unit: {
      name: string;
      id: number;
    };
  };
  role: {
    id: string;
    roleName: Role;
  };
}

export interface UserUpdateData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  unitId: number;
  password: string;
}

export enum Role {
  ADMIN = 'Admin',
  STUDENT = 'Student',
  PROFESOR = 'Profesor',
  NONE = 'None',
}
