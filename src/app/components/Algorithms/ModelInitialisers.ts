import { Holiday } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';

export const initUsers = (): Users => {
  return {
    userID: '',
    name: '',
    email: '',
    password: '',
    preferredName: '',
  };
};
