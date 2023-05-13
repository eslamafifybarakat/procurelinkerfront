export const roots = {
  auth: {
    login: '/api/login',
    getUserData: '/get-user-data',
    forgetPassword: '/forget-password',
  },
  dashboard: {
    users: {
      usersList: 'users',
      crateUser: 'Auth/CreateAsync',
      updateUser: 'Auth/UpdateAsync',
      getUserById: 'Auth/GetByIdAsync',
      resetPassword: 'Auth/reset-password',
    },
  }
}
