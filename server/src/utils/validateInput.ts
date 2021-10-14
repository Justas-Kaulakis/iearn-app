import { AdminRegInput } from "src/resolvers/admin";

const INPUT_LENGTH = 6;

const emailValidation =
  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;

export const checkInputLength = (field: string, input: string) => {
  if (input.length < INPUT_LENGTH) {
    return [
      {
        field,
        message: `negali būti mažesnis kaip ${INPUT_LENGTH}`,
      },
    ];
  }
  return null;
};

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

  const err1 = checkInputLength("username", options.username);
  if (err1) return err1;

  const err2 = checkInputLength("username", options.username);
  if (err2) return err2;

  return null;
};
