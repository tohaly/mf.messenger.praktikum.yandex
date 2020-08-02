import {
  passwordValidator,
  simpleTextValidator,
  emailValidator,
  phoneValidator,
} from "../../util/validators";

export const inputsProps = {
  userInfo: [
    {
      attributes: `
          type="text" 
          placeholder="First name" 
          minlength="2"
          maxlength="20"
          required
          `,
      name: "first_name",
      handleBlur: simpleTextValidator,
    },
    {
      attributes: `
          type="text" 
          placeholder="Second name" 
          minlength="2"
          maxlength="20"
          required
          `,
      name: "second_name",
      handleBlur: simpleTextValidator,
    },
    {
      attributes: `
          type="email" 
          placeholder="email" 
          pattern="^.{1,}@([-0-9A-Za-z]{1,}\\.){1,3}[-A-Za-z]{2,}$"
          required
          `,
      name: "email",
      handleBlur: emailValidator,
    },
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
          type="phone" 
          placeholder="Phone" 
          pattern="^(7|8)\\d{10}$"
          maxlength="11"
          autocomplete="on"
          required
        `,
      name: "phone",
      handleBlur: phoneValidator,
    },
  ],
  avatar: [
    {
      attributes: `
      type="file"
      placeholder="old password"
      pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
      minlength="8"
      autocomplete="on"
      required
      title=" "
    `,
      name: "avatar",
      handleBlur: passwordValidator,
    },
  ],
  password: [
    {
      attributes: `
      type="password"
      placeholder="old password"
      pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
      minlength="8"
      autocomplete="on"
      required
    `,
      name: "old-password",
      handleBlur: passwordValidator,
    },
    {
      attributes: `
      type="password"
      placeholder="new password"
      pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
      minlength="8"
      autocomplete="on"
      required
    `,
      name: "new-password",
      handleBlur(element: HTMLInputElement, callback: Function) {
        const PASSWORD_COINCIDES = "Same as old password";
        passwordValidator(element, callback);
        // if (element.value === form.virtualForm["old-password"]) {
        //   callback(true, PASSWORD_COINCIDES);
        //   return;
        // }
      },
    },
  ],
};
