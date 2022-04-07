import { PasswordRequirements } from 'src/app/models/Users';

export const validateEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  let emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password: string): PasswordRequirements => {
  return {
    lengthValid: password.length > 6,
    upperCaseValid: new RegExp('[A-Z]').test(password),
    lowerCaseValid: new RegExp('[a-z]').test(password),
    charactersValid: new RegExp('[^a-zA-Z0-9]').test(password),
    numbersValid: new RegExp('[0-9]').test(password),
  };
};
