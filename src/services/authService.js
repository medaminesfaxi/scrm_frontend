const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};
const login = (username, password) => {
  const user = {
    id: 1,
    username: 'Mohamed amine',
    avatarSrc:
      'https://scontent.ftun11-1.fna.fbcdn.net/v/t1.0-9/56196777_2370263756337563_5897750826310434816_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=l-JoEUse1d4AX-GM_Gm&_nc_ht=scontent.ftun11-1.fna&oh=828cc2709b0c837cd67159c0f60467f0&oe=5EF36B5E',
    status: 'success ', //error, warning
    token: 'fake__token',
    is_admin: true
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
