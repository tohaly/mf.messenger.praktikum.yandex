import {
  passwordValidator,
  simpleTextValidator,
  emailValidator,
  phoneValidator,
} from '../../util/validators';

export const inputsProps = [
  {
    attributes: `
        type="text" 
        placeholder="First name" 
        minlength="2"
        maxlength="20"
        required
        `,
    className: 'auth__input_first-name',
    name: 'first_name',
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
    className: 'auth__input_second-name',
    name: 'second_name',
    handleBlur: simpleTextValidator,
  },
  {
    attributes: `
        type="email" 
        placeholder="email" 
        pattern="^.{1,}@([-0-9A-Za-z]{1,}\\.){1,3}[-A-Za-z]{2,}$"
        required
        `,
    className: 'auth__input_email',
    name: 'email',
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
    className: 'auth__input_login',
    name: 'login',
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
    className: 'auth__input_password',
    name: 'password',
    handleBlur: passwordValidator,
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
    className: 'auth__input_phone',
    name: 'phone',
    handleBlur: phoneValidator,
  },
];
