import { authService } from '../services/authService';
import axios from 'axios';
import { message } from 'antd';

/* type : error || success */
export const notification = (type, msg) => {
  message.config({
    duration: 1,
    top: 20
  });
  if (type === 'success') message.success(msg);
  else message.error(msg);
};
/* format text max symboles 27 */
export const formatText = text => {
  return text.substr(0, 27) + '...';
};
/* email pattern */
export const emailPattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validImage = file => {
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
    return { token: currentUser.token };
  } else {
    return {};
  }
}

export const Request = async (type, path, data = {}, setLoading) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json'
  });
  const options = {
    headers: {
      token: authHeader()
    }
  };
  try {
    setLoading({ loading: true });
    let res;
    if (type === 'POST') res = await api.post(path, data, options);
    else if (type === 'GET') res = await api.get(path, options);
    else if (type === 'DELETE') res = await api.delete(path, options);
    else notification('danger', 'Request type is not defined');
    setLoading({ loading: false });
    return res;
  } catch (e) {
    setLoading({ loading: false });
    if (e.response) notification('danger', e.response.data.error);
    return false;
  }
};

/* handle responses */
// export function handleResponse(response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if ([401, 403].indexOf(response.status) !== -1) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         authService.logout();
//         window.location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
