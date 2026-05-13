export const users = {
  standard: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },

  lockedOut: {
    username: process.env.LOCKED_OUT_USER || 'locked_out_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },

  invalidPassword: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: 'wrong_password',
  },

  empty: {
    username: '',
    password: '',
  },
};

export const loginErrors = {
  lockedOut: 'Sorry, this user has been locked out.',
  invalidCredentials: 'Username and password do not match any user in this service',
  usernameRequired: 'Username is required',
};