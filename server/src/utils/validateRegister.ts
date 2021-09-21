import { AdminRegInput } from "src/resolvers/admin";

const INPUT_LENGTH = 6;

export const validateRegister = (options: AdminRegInput) => {
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an '@'",
      },
    ];
  }

  if (options.username.length <= INPUT_LENGTH) {
    return [
      {
        field: "username",
        message: `length must be greater than ${INPUT_LENGTH}`,
      },
    ];
  }

  if (options.password.length <= INPUT_LENGTH) {
    return [
      {
        field: "password",
        message: `length must be greater than ${INPUT_LENGTH}`,
      },
    ];
  }

  return null;
};
