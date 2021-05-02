export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  unitId: number;
  policy: boolean;
  roleId: boolean | number;
}
