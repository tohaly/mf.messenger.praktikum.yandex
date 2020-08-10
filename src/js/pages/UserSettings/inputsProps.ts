import {
  passwordValidator,
  simpleTextValidator,
  emailValidator,
  phoneValidator,
} from '../../util/validators';

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
      className: 'auth__input_user auth__input_user_first-name',
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
      className: 'auth__input_user auth__input_user_second-name',
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
      className: 'auth__input_user auth__input_user_first-email',
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
      name: 'login',
      className: 'auth__input_user auth__input_user_login',
      handleBlur: simpleTextValidator,
    },
    {
      attributes: `
          type="text"
          placeholder="Display name" 
          minlength="2"
          maxlength="20"
          required
        `,
      className: 'auth__input_user auth__input_user_display-name',
      name: 'display_name',
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
      className: 'auth__input_user auth__input_user_phone',
      name: 'phone',
      handleBlur: phoneValidator,
    },
  ],
  avatar: [
    {
      attributes: `
      type="file"
      required
    `,
      name: 'avatar',
      className: 'auth__input_avatar',
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
      name: 'oldPassword',
      className: 'auth__input_password auth__input_password_old',
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
      name: 'newPassword',
      className: 'auth__input_password auth__input_password_new',
    },
  ],
};
