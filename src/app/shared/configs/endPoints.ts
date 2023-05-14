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
      deleteUser: 'Auth/delete',
      resetPassword: 'Auth/reset-password',
      getBranches: "branches",
      getPositions: "positions",
      getDepartments: "departments",
      getJobTitles: "jobTitles",
      getAccountById: 'getAccount',
      getUserRoles: 'userRoles',
      getUserPermissions: 'userPermissions',
      addPermissions: "addPermissions"
    },
  }
}
