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
    settings: {
      getBranches: 'Branch/getBranchs',
      getBranchesById: 'Branch/getBranchById',
      saveBranch: 'Branch/saveBranch',
      deleteBranch: 'Branch/deleteBranch',

      getDepartments: 'Department/getDepartments',
      getDepartmentsById: 'Department/getDepartmentById',
      saveDepartments: 'Department/saveDepartment',
      deleteDepartments: 'Department/deleteDepartment',

      getJobTitle: 'JobTitle/getJobTitles',
      getJobTitleById: 'JobTitle/getJobTitleById',
      saveJobTitle: 'JobTitle/saveJobTitle',
      deleteJobTitle: 'JobTitle/deleteJobTitle',

      getPositions: 'Position/getPositions',
      getPositionById: 'Position/getPositionById',
      savePosition: 'Position/savePosition',
      deletePosition: 'Position/deletePosition',

    }
  }
}
