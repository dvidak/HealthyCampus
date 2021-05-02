import { LoginData, SignUpData } from '../models/Auth';
import { postAuth } from './api';

const login = async (data: LoginData) => {
  return await postAuth('auth/login', data);
};

const signUp = async (data: SignUpData) => {
  return await postAuth('auth/signUp', data);
};

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
};

const authService = {
  login,
  signUp,
  logout,
};

export default authService;
