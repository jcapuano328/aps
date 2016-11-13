var BASE_URL = 'http://localhost:4000';

module.exports = {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + '/login',
  LOGOUT_URL: BASE_URL + '/logout',
  USERS_URL: BASE_URL + '/api/users',
  USER_URL: BASE_URL + '/api/users/:id',
  PASSWORD_RESET_URL: BASE_URL + '/api/users/:id/reset',
  GROSSES_SEARCH_URL: '/api/grosses/:unit/:start'
};
