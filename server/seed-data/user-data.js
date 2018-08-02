const userData = {
  userWithCompleteDetails: {
    name: 'Andrew Okoye',
    password: 'pythonismystack',
    confirmPassword: 'pythonismystack',
    username: 'andy',
    email: 'andrewinsoul@gmail.com',
  },
  userWithSpaceAsName: {
    name: '      ',
    password: 'pythonismystack',
    confirmPassword: 'pythonismystack',
    username: 'andy',
    email: 'andrewinsoul@gmail.com',
  },
  userWithSpaceAsUserName: {
    name: 'Andrew Okoye',
    password: 'pythonismystack',
    confirmPassword: 'pythonismystack',
    username: 'andy  python',
    email: 'andrewinsoul@gmail.com',
  },
  userWithNotSamePassword: {
    name: 'Andrew Okoye',
    password: 'pythonismystack',
    confirmPassword: 'javascriptismystack',
    username: 'andy',
    email: 'andrewinsoul@gmail.com',
  },
  userWithIncompleteDetails: {
    name: 'Andrew Okoye',
    password: 'pythonismystack',
    confirmPassword: 'pythonismystack',
    username: 'andy',
  },
};
export default userData;
