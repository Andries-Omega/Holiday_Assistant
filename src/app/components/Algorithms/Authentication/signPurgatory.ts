import { Users } from 'src/app/models/Users';

// First Sign In is where we set the user id to state
export const firstSignIn = (userID: string): Users => {
  return {
    userID,
    name: '',
    email: '',
    preferredName: '',
    password: '',
  };
};

// Second Sign In is where we set the user information to state
export const secondSignIn = (
  userID: string,
  name: string,
  preferredName: string,
  email: string
): Users => {
  return {
    userID,
    name,
    preferredName,
    email,
    password: '',
  };
};
// Third Sign In is where we set the user itenaries
