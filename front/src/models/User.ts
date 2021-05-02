export interface User {
  id: number;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  fitbit: {
    accessToken: string;
    refreshToken: string;
    fitbitId: string;
  };
  userUnit: {
    unit: {
      name: string;
    };
  };
  role: {
    id: string;
    roleName: Role;
  };
}

export enum Role {
  ADMIN = 'Admin',
  STUDENT = 'Student',
  PROFESOR = 'Profesor',
  NONE = 'None',
}
