var BASE_URL = 'http://localhost:4000';

module.exports = {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + '/login',
  LOGOUT_URL: BASE_URL + '/logout',
  USERS_URL: '/users',
  USER_URL:'/users/:id',
  PASSWORD_RESET_URL:'/users/:id/reset'
};
