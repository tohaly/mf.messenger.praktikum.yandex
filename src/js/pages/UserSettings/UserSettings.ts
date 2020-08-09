import { Block } from '../../util/Block/Block';

import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';
import template from './user-settings-template';

import { Form, IForm } from '../../form';
import router from '../../router';
import { authorization } from '../../authorization';

import { logoutHelper } from '../../util/authHelpers';
import { inputsProps } from './inputsProps';
import { passwordValidator } from '../../util/validators';

import { AuthApi } from '../../API/authApi';
import { UserApi } from '../../API/useApi';

import {
  AVATAR_URL,
  SUCCESS_MESSAGE,
  UNEXPECTED_ERROR,
  PASSWORD_COINCIDES,
  AUTH_ERR_AND_REDIRECT,
} from '../../constants';
import AVATAR_BIG from '../../../../static/images/example-user-img.jpg';

import { Title, Input, Button, Avatar, ServerMessage, Loader } from '../../components/index';

import { InputValidate, IInputValidate } from '../../components/Input/InputValidate';

interface IInputsProp {
  attributes: string;
  name: string;
  className: string;
  handleBlur?(element: HTMLInputElement, callback: Function): void;
}

const userSettingsTemplatePage = new SimpleTemplateEngine(template);

const authApi = new AuthApi();
const userApi = new UserApi();

class UserSettings extends Block {
  inputsValueInfo: { [key: string]: string };
  inputsValuePassword: { [key: string]: string };
  validateInfo: IInputValidate[];
  validatePassword: IInputValidate[];
  formInfo: IForm;
  formPassword: IForm;
  isServerMessageSet: boolean;
  constructor() {
    super('div', {
      title: new Title({ text: 'User settings' }).render(),
      avatar: new Avatar({
        link: AVATAR_BIG,
        alt: 'User avatar',
        className: 'auth-user-settings__img',
      }).render(),
      avatarServerMessage: new ServerMessage({
        text: '',
        isError: false,
      }).render(),
      userInfoServerMessage: new ServerMessage({
        text: '',
        isError: false,
      }).render(),
      passwordServerMessage: new ServerMessage({
        text: '',
        isError: false,
      }).render(),
      inputAvatar: new Input({
        attributes: inputsProps.avatar[0].attributes,
        name: inputsProps.avatar[0].name,
        className: 'auth__input auth__input_avatar',
      }).render(),
      buttonAvatar: new Button({
        text: 'Load avatar',
        className: 'auth__button auth__button_avatar',
        isDisabled: true,
      }).render(),
      buttonUserInfo: new Button({
        text: 'Save user info',
        className: 'auth__button auth__button_user-setting',
        isDisabled: true,
      }).render(),
      buttonPassword: new Button({
        text: 'Change',
        className: 'auth__button auth__button_password',
        isDisabled: true,
      }).render(),
      isLoad: false,
    });

    this.inputsValueInfo;
    this.inputsValuePassword = {};
    this.validateInfo = [];
    this.validatePassword = [];
    this.formInfo;
    this.formPassword;
    this.isServerMessageSet = false;

    this._errCatcher = this._errCatcher.bind(this);
    this._clearErrors = this._clearErrors.bind(this);
    this._getInputsValueInfo = this._getInputsValueInfo.bind(this);
    this.handleChangeUserInfo = this.handleChangeUserInfo.bind(this);
    this._getInputsValuePassword = this._getInputsValuePassword.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLoadAvatar = this.handleLoadAvatar.bind(this);
    this.handleBlurPassword = this.handleBlurPassword.bind(this);
    this.customValidatePassword = this.customValidatePassword.bind(this);
  }

  _setServerMessage(key: string, message: string | number = '', isError = false) {
    this.setProps({
      [key]: new ServerMessage({
        text: message,
        isError,
      }).render(),
    });

    if (message) {
      this.isServerMessageSet = true;
    }
  }

  _errCatcher(err: { [key: string]: string | number }, errorPropsName: string) {
    const { status, responseText = UNEXPECTED_ERROR } = err;

    if (status === 500) {
      router.go('#/error');
    }

    if (status === 401) {
      this._setServerMessage(errorPropsName, AUTH_ERR_AND_REDIRECT, true);
      setTimeout(() => {
        logoutHelper(authorization);
        router.go('#/signin');
      }, 2000);
      return;
    }

    this._setServerMessage(errorPropsName, responseText, true);
  }

  _setLoader(isLoad: boolean) {
    return new Loader({ isLoad }).render();
  }

  _clearErrors() {
    if (this.isServerMessageSet) {
      this._setServerMessage('avatarServerMessage');
      this._setServerMessage('userInfoServerMessage');
      this._setServerMessage('passwordServerMessage');
      this.isServerMessageSet = false;
    }
  }

  getUserInfoInputs() {
    this.inputsValueInfo = this.inputsValueInfo || {};
    this.validateInfo = this.validateInfo || [];
    return (inputsProps.userInfo as IInputsProp[])
      .map(({ name, attributes, className, handleBlur }) => {
        const value = this.inputsValueInfo[name] ? `value="${this.inputsValueInfo[name]}"` : ' ';
        this.validateInfo.push(new InputValidate(handleBlur));

        return new Input({
          attributes,
          name,
          value,
          className,
        }).render();
      })
      .join('');
  }

  getPasswordInputs() {
    this.inputsValuePassword = this.inputsValuePassword || {};
    this.validatePassword = this.validatePassword || [];
    return (inputsProps.password as IInputsProp[])
      .map(({ name, attributes, className }) => {
        const value = this.inputsValuePassword[name]
          ? `value="${this.inputsValuePassword[name]}"`
          : ' ';
        this.validatePassword.push(new InputValidate(this.handleBlurPassword));

        return new Input({
          attributes,
          name,
          value,
          className,
        }).render();
      })
      .join('');
  }

  _getInputsValueInfo(event: Event) {
    this.formInfo.saveValue(<HTMLInputElement>event.target, this.inputsValueInfo);
  }

  _getInputsValuePassword(event: Event) {
    this.formPassword.saveValue(<HTMLInputElement>event.target, this.inputsValuePassword);
  }

  customValidatePassword() {
    const { newPassword, oldPassword } = this.inputsValuePassword;
    if (newPassword === oldPassword) {
      return false;
    }
    return true;
  }

  handleBlurPassword(element: HTMLInputElement, callback: Function): void {
    const { newPassword, oldPassword } = this.inputsValuePassword;
    passwordValidator(element, callback);
    if (newPassword === oldPassword) {
      callback(true, PASSWORD_COINCIDES);
      return;
    }
  }

  handleChangePassword() {
    event.preventDefault();
    this.setProps({ isLoad: true });
    userApi
      .changePassword(this.inputsValuePassword)
      .then(() => {
        this.inputsValuePassword = {};
      })
      .then(() => {
        this._setServerMessage('passwordServerMessage', SUCCESS_MESSAGE, false);
      })
      .catch((err) => {
        this._errCatcher(err, 'passwordServerMessage');
      })
      .finally(() => {
        this.inputsValuePassword = {};
        this.setProps({ isLoad: false });
      });
  }

  handleChangeUserInfo() {
    event.preventDefault();
    this.setProps({ isLoad: true });
    userApi
      .profile(this.inputsValueInfo)
      .then(() => this._setServerMessage('userInfoServerMessage', SUCCESS_MESSAGE, false))
      .catch((err) => {
        this._errCatcher(err, 'userInfoServerMessage');
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });
  }

  handleLoadAvatar() {
    event.preventDefault();
    const input: HTMLInputElement = this.element.querySelector('.auth__input_avatar');
    const formData = new FormData();
    formData.append('avatar', input.files[0]);

    this.setProps({ isLoad: true });
    userApi
      .avatar(formData)
      .then(({ avatar, login }) => {
        this.setProps({
          avatar: new Avatar({
            link: `${AVATAR_URL}${avatar}`,
            alt: login,
            className: 'auth-user-settings__img',
          }).render(),
        });
      })
      .catch((err) => {
        this._errCatcher(err, 'avatarServerMessage');
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });
  }

  componentDidMount() {
    this.setProps({ isLoad: true });
    authApi
      .getUserInfo()
      .then(({ first_name, second_name, email, login, phone, avatar, display_name }) => {
        this.inputsValueInfo = {
          first_name,
          second_name,
          email,
          login,
          phone,
          display_name,
        };
        return { avatar, login };
      })
      .then(({ avatar, login }) => {
        if (avatar) {
          this.setProps({
            avatar: new Avatar({
              link: `${AVATAR_URL}${avatar}`,
              alt: login,
              className: 'auth-user-settings__img',
            }).render(),
          });
        } else {
          this.eventBus().emit(this.EVENTS.FLOW_CDU);
        }
      })
      .catch((err) => {
        this._errCatcher(err, 'userInfoServerMessage');
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const {
        element,
        validateInfo,
        validatePassword,
        customValidatePassword,
        _getInputsValueInfo,
        _clearErrors,
        handleChangeUserInfo,
        _getInputsValuePassword,
        handleChangePassword,
        handleLoadAvatar,
      } = this;

      const formContainerInfo: HTMLFormElement = element.querySelector('.auth__form_user-info');
      const formButtonInfo: HTMLButtonElement = element.querySelector('.auth__button_user-setting');
      const inputsUserInfo = element.querySelectorAll('.auth__input_user');

      const formContainerPassword: HTMLFormElement = element.querySelector('.auth__form_password');
      const formButtonPassword: HTMLButtonElement = element.querySelector('.auth__button_password');
      const inputsPassword = element.querySelectorAll('.auth__input_password');
      const formContainerAvatar: HTMLFormElement = element.querySelector('.auth__form_avatar');
      const formButtonAvatar: HTMLButtonElement = element.querySelector('.auth__button_avatar');
      const inputAvatar: HTMLInputElement = element.querySelector('.auth__input_avatar');

      const formAvatar = new Form(formContainerAvatar, formButtonAvatar);

      this.formInfo = new Form(formContainerInfo, formButtonInfo);
      inputsUserInfo.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validateInfo[i].handleFocus;
        (input as HTMLInputElement).onblur = validateInfo[i].handleBlur;
        (input as HTMLInputElement).onclick = _clearErrors;
      });

      this.formPassword = new Form(
        formContainerPassword,
        formButtonPassword,
        customValidatePassword
      );
      inputsPassword.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validatePassword[i].handleFocus;
        (input as HTMLInputElement).onblur = validatePassword[i].handleBlur;
        (input as HTMLInputElement).onclick = _clearErrors;
      });

      formContainerInfo.oninput = this.formInfo.formIsValid;
      formContainerInfo.onchange = _getInputsValueInfo;
      formButtonInfo.onclick = handleChangeUserInfo;

      formContainerPassword.oninput = this.formPassword.formIsValid;
      formContainerPassword.onchange = _getInputsValuePassword;
      formButtonPassword.onclick = handleChangePassword;

      formContainerAvatar.onchange = formAvatar.formIsValid;
      formButtonAvatar.onclick = handleLoadAvatar;
      inputAvatar.onclick = _clearErrors;
    });
  }

  show() {
    super.show();
    this._clearErrors();
  }

  render(): string {
    const {
      title,
      avatar,
      inputAvatar,
      buttonAvatar,
      buttonUserInfo,
      buttonPassword,
      userInfoServerMessage,
      passwordServerMessage,
      avatarServerMessage,
      isLoad,
    } = this.props;

    return userSettingsTemplatePage.compile({
      title,
      avatar,
      inputAvatar,
      buttonAvatar,
      inputsUserInfo: this.getUserInfoInputs(),
      buttonUserInfo,
      inputsUserPassword: this.getPasswordInputs(),
      buttonPassword,
      userInfoServerMessage,
      passwordServerMessage,
      avatarServerMessage,
      loader: this._setLoader(isLoad),
    });
  }
}

export { UserSettings };
