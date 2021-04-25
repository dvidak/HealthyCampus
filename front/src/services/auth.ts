import { LoginData, SignUpData } from '../models/Auth';
import { postAuth } from './api';

const login = async (data: LoginData) => {
  return await postAuth('auth/login', data);
};

const signUp = async (data: SignUpData) => {
  return await postAuth('auth/signUp', data);
};

const authService = {
  login,
  signUp,
};

export default authService;
