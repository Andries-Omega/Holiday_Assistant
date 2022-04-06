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
  let upperCase = new RegExp('[A-Z]');
  let lowerCase = new RegExp('[a-z]');
  let numbers = new RegExp('[0-9]');
  let specialCharacters = new RegExp('[^a-zA-Z0-9]');

  return {
    lengthValid: password.length > 6,
    upperCaseValid: upperCase.test(password),
    lowerCaseValid: lowerCase.test(password),
    charactersValid: specialCharacters.test(password),
    numbersValid: numbers.test(password),
  };
};
