export interface Users {
  name: string;
  preferredName: string;
  email: string;
  password: string;
}

export interface PasswordRequirements {
  lengthValid: boolean;
  upperCaseValid: boolean;
  lowerCaseValid: boolean;
  charactersValid: boolean;
  numbersValid: boolean;
}
