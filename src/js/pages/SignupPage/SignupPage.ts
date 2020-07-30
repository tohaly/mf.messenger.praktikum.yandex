import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine";
import {
  passwordValidator,
  simpleTextValidator,
  emailValidator,
} from "../../util/validators";

import router from "../../router";

import template from "./signup-template";

import { Title, Input, Button } from "../../components/index";

import { Form, IForm } from "../../form";
import {
  InputValidate,
  IInputValidate,
} from "../../components/Input/InputValidate";

const signupTemplatePage = new SimpleTemplateEngine(template);
let form: IForm;
const validate: IInputValidate[] = [];

const inputsProps = [
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
  {
    attributes: `
        type="password" 
        placeholder="repeat password" 
        pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
        minlength="8"
        autocomplete="on"
        required
      `,
    name: "repeat-password",
    handleBlur(element: HTMLInputElement, callback: Function) {
      const PASSWORD_MISMATCH = "Passwords mismatch";
      if (element.value !== form.virtualForm["password"]) {
        callback(true, PASSWORD_MISMATCH);
        return;
      }
    },
  },
];

const data = {
  title: new Title({ text: "Signup" }),
  inputs: inputsProps.map((item) => {
    validate.push(new InputValidate(item.handleBlur));

    return new Input({
      attributes: item.attributes,
      name: item.name,
      className: "auth__input",
    });
  }),
  button: new Button({
    text: "Signup",
    className: "button auth__button",
  }),
  altText: "already have an account?",
};

class SignupPage extends Block {
  constructor() {
    super("div", data);
  }

  customFormValidate() {
    if (form.virtualForm["password"] !== form.virtualForm["repeat-password"])
      return false;
    return true;
  }

  getFormData() {
    event.preventDefault();
    console.log(form.getData());
  }

  goSignin() {
    event.preventDefault();
    router.go("#/signin");
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const { element } = this;
      const formContainer = element.querySelector("form");
      const formButton: HTMLButtonElement = element.querySelector(
        ".auth__button"
      );
      const inputs = element.querySelectorAll(".input");
      const altButton: HTMLButtonElement = element.querySelector(
        ".auth__link_signup"
      );

      form = new Form(formContainer, formButton, this.customFormValidate);

      inputs.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validate[i].handleFocus;
        (input as HTMLInputElement).onblur = validate[i].handleBlur;
      });

      formContainer.oninput = form.formIsValid;
      formButton.onclick = this.getFormData;
      altButton.onclick = this.goSignin;
    });
  }

  render(): string {
    return signupTemplatePage.compile({
      title: this.props.title.render(),
      inputs: this.props.inputs.map((item: any) => item.render()).join(""),
      button: this.props.button.render(),
      altText: this.props.altText,
    });
  }
}

export { SignupPage };
