import { Request } from '../shared/utils';

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

const login = async (email, password) => {
  const res = await Request('POST', '/api/auth/login', { email, password });
  if (res.data) {
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    window.location.reload(true);
  }
};

const signup = async (fullname, email, password) => {
  const res = await Request('POST', '/api/auth/signup', {
    fullname,
    email,
    password,
  });
  if (res.data) {
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    window.location.reload(true);
  }
};

const logout = () => {
  localStorage.removeItem('currentUser');
  window.location.reload(true);
};

const updatePhoneNumber = async (phone) => {
  await Request('PUT', '/api/user/update', { phone });
  const user = getCurrentUser();
  user.phone = phone;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

const updateUserAvatar = async (data) => {
  let res = await Request('POST', 'api/user/upload_avatar', data);
  const user = getCurrentUser();
  user.avatarSrc = res.data.avatarSrc;
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.reload(true);
};

export const authService = {
  login,
  signup,
  logout,
  updatePhoneNumber,
  updateUserAvatar,
  getCurrentUser,
};
