import { Request } from '../shared/utils';

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

const login = (email, password, setLoading) => {
  Request('POST', '/api/user/login', { email, password }, setLoading);
};
const logout = () => {
  localStorage.removeItem('currentUser');
};

export const authService = {
  login,
  logout,
  getCurrentUser
};
