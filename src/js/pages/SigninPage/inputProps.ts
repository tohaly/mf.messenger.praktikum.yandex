import { passwordValidator, simpleTextValidator } from "../../util/validators";
export const inputsProps = [
  {
    attributes: `
        type="text"
        placeholder="login"
        minlength="2"
        maxlength="20"
        required
      `,
    name: "login",
    handleBlur: simpleTextValidator,
  },
  {
    attributes: `
        type="password"
        placeholder="password"
        pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
        minlength="8"
        autocomplete="on"
        required
      `,
    name: "password",
    handleBlur: passwordValidator,
  },
];
