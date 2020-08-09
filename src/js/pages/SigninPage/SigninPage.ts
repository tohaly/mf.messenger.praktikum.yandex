import { Block } from '../../util/Block/Block';

import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';
import { template } from './signin-template';
import { inputsProps } from './inputProps';

import { InputValidate, IInputValidate } from '../../components/Input/InputValidate';
import { Form, IForm } from '../../form';

import { AuthApi } from '../../API/authApi';
import { authorization } from '../../authorization';
import { setLogin } from '../../util/authHelpers';

import router from '../../router';

import { AUTH_ERR, AlT_TEXT_SIGNIN } from '../../constants';

import { Title, Input, Button, ServerMessage, Loader } from '../../components/index';

const signinPageTemplate = new SimpleTemplateEngine(template);
const authApi = new AuthApi();

interface IInputsProp {
  attributes: string;
  name: string;
  className: string;
  handleBlur?(element: HTMLInputElement, callback: Function): void;
}

class SigninPage extends Block {
  inputsValue: { [key: string]: string };
  validate: IInputValidate[];
  form: IForm;
  isServerMessageSet: boolean;

  constructor() {
    super('div', {
      title: new Title({ text: 'Signup' }).render(),
      serverMessage: new ServerMessage({
        text: '',
      }).render(),
      button: new Button({
        text: 'Signin',
        className: 'auth__button',
        isDisabled: true,
      }).render(),
      altLinkClassName: 'auth__link_signin',
      altText: AlT_TEXT_SIGNIN,
      isLoad: false,
    });

    this.inputsValue;
    this.validate = [];
    this.form;
    this.isServerMessageSet = false;

    this._clearError = this._clearError.bind(this);
  }

  _getInputs() {
    this.inputsValue = this.inputsValue || {};
    this.validate = this.validate || [];
    return (inputsProps as IInputsProp[])
      .map(({ name, attributes, handleBlur, className }) => {
        const value = this.inputsValue[name] ? `value="${this.inputsValue[name]}"` : ' ';
        this.validate.push(new InputValidate(handleBlur));

        return new Input({
          attributes,
          name,
          value,
          className,
        }).render();
      })
      .join('');
  }

  _getInputsValue() {
    this.form.saveValue(<HTMLInputElement>event.target, this.inputsValue);
  }

  _setLoader(isLoad: boolean) {
    return new Loader({ isLoad }).render();
  }

  _clearError() {
    if (this.isServerMessageSet) {
      this.setProps({
        serverMessage: new ServerMessage({
          text: '',
          isError: false,
        }).render(),
      });
    }
    this.isServerMessageSet = false;
  }

  handleSigninClick() {
    event.preventDefault();

    this.setProps({ isLoad: true });
    authApi
      .signin(this.inputsValue)
      .then(() => {
        setLogin(authorization, this.inputsValue.login);
      })
      .then(() => {
        router.go('#/');
      })
      .catch((err) => {
        const { status, responseText = AUTH_ERR } = err;

        if (status === 500) {
          router.go('#/error');
        }

        this.setProps({
          serverMessage: new ServerMessage({
            text: responseText,
            isError: true,
          }).render(),
        });

        this.isServerMessageSet = true;
      })
      .finally(() => {
        this.inputsValue = {};
        this.setProps({ isLoad: false });
      });
  }

  goSignup() {
    event.preventDefault();
    router.go('#/signup');
  }

  show() {
    super.show();
    this._clearError();
    this.eventBus().emit(this.EVENTS.FLOW_CDU);
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const { element, validate, _clearError, _getInputsValue, handleSigninClick, goSignup } = this;

      const formContainer = element.querySelector('form');
      const formButton: HTMLButtonElement = element.querySelector('.auth__button');
      const inputs = element.querySelectorAll('.input');
      const altButton: HTMLButtonElement = element.querySelector('.auth__link_signin');

      this.form = new Form(formContainer, formButton);

      inputs.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validate[i].handleFocus;
        (input as HTMLInputElement).onblur = validate[i].handleBlur;
        (input as HTMLInputElement).onclick = _clearError;
      });

      formContainer.onchange = _getInputsValue.bind(this);
      formContainer.oninput = this.form.formIsValid;
      formButton.onclick = handleSigninClick.bind(this);
      altButton.onclick = goSignup;
    });
  }

  render(): string {
    const { title, serverMessage, isLoad, button, altLinkClassName, altText } = this.props;
    return signinPageTemplate.compile({
      title,
      inputs: this._getInputs(),
      serverMessage,
      button,
      altLinkClassName,
      altText,
      loader: this._setLoader(isLoad),
    });
  }
}

export { SigninPage };
