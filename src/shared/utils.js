// import { authService } from '../services/authService';
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
// export function authHeader() {
//   const currentUser = authService.currentUserValue;
//   if (currentUser && currentUser.token) {
//     return { Authorization: `Bearer ${currentUser.token}` };
//   } else {
//     return {};
//   }
// }

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
