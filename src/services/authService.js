const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};
const login = (username, password) => {
  const user = {
    username: 'Mohamed amine',
    avatarSrc: '',
    status: 'success ', //error, warning
    token: 'fake__token',
    is_admin: true,
    role: 'ADMIN'
  };
  localStorage.setItem('currentUser', JSON.stringify(user));
  //   axios
  //     .post(proccess.env.API_URL, { username, password })
  //     .then(/* handle resp here */)
  //     .then(user => {
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       return user;
  //     });
};

const logout = () => {
  localStorage.removeItem('currentUser');
};

export const authService = {
  login,
  logout,
  getCurrentUser
};
