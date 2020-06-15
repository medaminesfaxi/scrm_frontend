import { authService } from '../services/authService';
import axios from 'axios';
import { message } from 'antd';

/* type : error || success */
export const centeredNotification = (type, msg) => {
  message.config({
    duration: 1,
    top: 20,
  });
  if (type === 'success') message.success(msg);
  else message.error(msg);
};
/* format text max symboles 27 */
export const formatText = (text) => {
  if (text.length >= 27) return text.substr(0, 27) + '...';
  else return text;
};
/* email pattern */
export const emailPattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validImage = (file) => {
  if (file !== null) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    if (acceptedImageTypes.includes(file['type']) === false) {
      return false;
    }
    return true;
  }
  return false;
};

/* return authorization header with jwt token */
export function authHeader() {
  const currentUser = authService.getCurrentUser();
  if (currentUser && currentUser.token) {
    return currentUser.token;
  } else {
    return {};
  }
}

/* handle responses */
export function handleResponse(e) {
  if (typeof e === 'undefined') return;
  if ([401, 403].indexOf(e.status) !== -1) {
    authService.logout();
    window.location.reload(true);
    return false;
  }
}

export const Request = async (type, path, data = {}) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json',
  });
  const options = {
    headers: {
      token: authHeader(),
    },
  };
  try {
    let res;
    if (type === 'POST') res = await api.post(path, data, options);
    else if (type === 'GET') res = await api.get(path, options);
    else if (type === 'DELETE') res = await api.delete(path, options);
    else if (type === 'PUT') res = await api.put(path, data, options);
    if (res.data.message) centeredNotification('success', res.data.message);
    return res;
  } catch (e) {
    handleResponse(e.response);
    if (typeof e.response !== 'undefined' && e.response.data !== null) {
      if (typeof e.response.data.error.message !== 'undefined')
        centeredNotification('danger', e.response.data.error.message);
      // muler error
      else centeredNotification('danger', e.response.data.error);
    }
    return false;
  }
};
