import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine";
import router from "../../router";
import { AuthApi } from "../../API/auth-api";

import template from "./signin-template";
import { inputsProps } from "./inputProps";
import {
  InputValidate,
  IInputValidate,
} from "../../components/Input/InputValidate";

import { Title, Input, Button, ServerError } from "../../components/index";

import { Form, IForm } from "../../form";

const signinPageTemplate = new SimpleTemplateEngine(template);
const auth = new AuthApi("/auth/");

interface IInputsProp {
  attributes: string;
  name: string;
  handleBlur(element: HTMLInputElement, callback: Function): void;
}

class SigninPage extends Block {
  inputsValue: { [key: string]: string };
  validate: IInputValidate[];
  form: IForm;

  constructor() {
    super("div", {
      title: new Title({ text: "Signup" }),
      serverError: new ServerError({
        text: "",
      }),
      button: new Button({
        text: "Signin",
        className: "auth__button",
        isDisabled: true,
      }),
      altLinkClassName: "auth__link_signin",
      altText: "don't have an account?",
      isLoad: false,
    });

    this.inputsValue;
    this.validate = [];
    this.form;
  }

  _getInputs() {
    this.inputsValue = this.inputsValue || {};
    this.validate = this.validate || [];
    return (inputsProps as IInputsProp[])
      .map((item) => {
        const { name, attributes } = item;
        const value = this.inputsValue[name]
          ? `value="${this.inputsValue[name]}"`
          : " ";
        this.validate.push(new InputValidate(item.handleBlur));

        return new Input({
          attributes,
          name,
          value,
        }).render();
      })
      .join("");
  }

  _getInputsValue() {
    this.form.saveValue(<HTMLInputElement>event.target, this.inputsValue);
  }

  handleSigninClick() {
    event.preventDefault();
    this.setProps({ isLoad: true });
    auth
      .signin(this.inputsValue)
      .then(() => {
        localStorage.setItem("login", this.inputsValue.login);
      })
      .then(() => {
        this.inputsValue = {};
      })
      .then(() => {
        router.go("#/");
      })
      .catch((err) => {
        const { message = "Server error" } = err;
        this.inputsValue.password = "";
        this.setProps({
          serverError: new ServerError({
            text: message,
          }),
        });
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });
  }

  goSignup() {
    event.preventDefault();
    router.go("#/signup");
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const { element, validate } = this;
      const formContainer = element.querySelector("form");
      const formButton: HTMLButtonElement = element.querySelector(
        ".auth__button"
      );
      const inputs = element.querySelectorAll(".input");
      const altButton: HTMLButtonElement = element.querySelector(
        ".auth__link_signin"
      );

      this.form = new Form(formContainer, formButton);
      inputs.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validate[i].handleFocus;
        (input as HTMLInputElement).onblur = validate[i].handleBlur;
      });

      formContainer.onchange = this._getInputsValue.bind(this);
      formContainer.oninput = this.form.formIsValid;
      formButton.onclick = this.handleSigninClick.bind(this);
      altButton.onclick = this.goSignup;
    });
  }

  render(): string {
    const {
      title,
      serverError,
      isLoad,
      button,
      altLinkClassName,
      altText,
    } = this.props;

    const loaderActivateClass = isLoad ? "loader_is-active" : "";

    return signinPageTemplate.compile({
      title: title.render(),
      inputs: this._getInputs(),
      serverError: serverError.render(),
      button: button.render(),
      altLinkClassName,
      altText,
      loaderActivateClass,
    });
  }
}

export { SigninPage };
