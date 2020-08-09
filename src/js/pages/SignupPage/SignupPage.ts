import { Block } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import router from '../../router';
import { AuthApi } from '../../API/authApi';
import { authorization } from '../../authorization';
import { setLogin } from '../../util/authHelpers';

import template from './signup-template';
import { inputsProps } from './inputProps';
import { InputValidate, IInputValidate } from '../../components/Input/InputValidate';

import { Title, Input, ServerMessage, Button, Loader } from '../../components/index';

import { ALT_TEXT_SIGNUP, REGISTRATION_ERROR } from '../../constants';
import { Form, IForm } from '../../form';

interface IInputsProp {
  attributes: string;
  name: string;
  className: string;
  handleBlur?(element: HTMLInputElement, callback: Function): void;
}

const signupTemplatePage = new SimpleTemplateEngine(template);
const auth = new AuthApi();

class SignupPage extends Block {
  inputsValue: { [key: string]: string };
  validate: IInputValidate[];
  form: IForm;
  isServerMessageSet: boolean;

  constructor() {
    super('div', {
      title: new Title({ text: 'Signup' }),
      serverMessage: new ServerMessage({
        text: '',
        isError: false,
      }).render(),
      button: new Button({
        text: 'Signup',
        className: 'auth__button',
        isDisabled: true,
      }),
      altLinkClassName: 'auth__link_signup',
      altText: ALT_TEXT_SIGNUP,
      isLoad: false,
    });

    this.inputsValue;
    this.validate = [];
    this.form;
    this.isServerMessageSet = false;
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

  _setLoader(isLoad: boolean) {
    return new Loader({ isLoad }).render();
  }

  handleSigninClick(event: any) {
    event.preventDefault();

    this.setProps({ isLoad: true });
    auth
      .signup(this.inputsValue)
      .then(() => {
        setLogin(authorization, this.inputsValue.login);
      })
      .then(() => {
        router.go('#/');
      })
      .catch((err) => {
        const { status, responseText = REGISTRATION_ERROR } = err;

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

  _getInputsValue(event: Event) {
    this.form.saveValue(<HTMLInputElement>event.target, this.inputsValue);
  }

  goSignin() {
    event.preventDefault();
    router.go('#/signin');
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const { element, validate, _clearError, _getInputsValue, handleSigninClick, goSignin } = this;

      const formContainer = element.querySelector('form');
      const formButton: HTMLButtonElement = element.querySelector('.auth__button');
      const inputs = element.querySelectorAll('.input');
      const altButton: HTMLButtonElement = element.querySelector('.auth__link_signup');

      this.form = new Form(formContainer, formButton);
      inputs.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validate[i].handleFocus;
        (input as HTMLInputElement).onblur = validate[i].handleBlur;
        (input as HTMLInputElement).onclick = _clearError.bind(this);
      });
      formContainer.onchange = _getInputsValue.bind(this);
      formContainer.oninput = this.form.formIsValid;
      formButton.onclick = handleSigninClick.bind(this);
      altButton.onclick = goSignin;
    });
  }

  show() {
    super.show();
    this._clearError();
    this.eventBus().emit(this.EVENTS.FLOW_CDU);
  }

  render(): string {
    const { title, serverMessage, isLoad, button, altLinkClassName, altText } = this.props;

    return signupTemplatePage.compile({
      title: title.render(),
      inputs: this._getInputs(),
      serverMessage,
      button: button.render(),
      altLinkClassName,
      altText,
      loader: this._setLoader(isLoad),
    });
  }
}

export { SignupPage };
