import { AdminRegInput } from "src/resolvers/admin";

const INPUT_LENGTH = 6;

const emailValidation =
  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;

export const validateRegister = (options: AdminRegInput) => {
  if (!options.email.match(emailValidation)) {
    return [
      {
        field: "email",
        message: "blogas el. pašto formatas",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "negali turėti '@'",
      },
    ];
  }

  if (options.username.length <= INPUT_LENGTH) {
    return [
      {
        field: "username",
        message: `ilgis turi būti didesnis už ${INPUT_LENGTH}`,
      },
    ];
  }

  if (options.password.length <= INPUT_LENGTH) {
    return [
      {
        field: "password",
        message: `ilgis turi būti didesnis už ${INPUT_LENGTH}`,
      },
    ];
  }

  return null;
};
