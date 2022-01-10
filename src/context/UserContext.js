import { createContext } from 'react';

// Create a new user context and define 
// what it will contain. 
const UserContext = createContext({
    userObject:
    {
      user: '',
      updateUser: () => { },
      logout: () => { }
    }
  });

export { UserContext };