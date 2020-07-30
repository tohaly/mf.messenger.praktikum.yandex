import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine";
import { passwordValidator, simpleTextValidator } from "../../util/validators";
import router from "../../router";

import template from "./signin-template";

import { Title, Input, Button } from "../../components/index";

import { Form, IForm } from "../../form";
import {
  InputValidate,
  IInputValidate,
} from "../../components/Input/InputValidate";

const signinPageTemplate = new SimpleTemplateEngine(template);
let form: IForm;
let validate: IInputValidate[] = [];

const inputsProps = [
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

const data = {
  title: new Title({ text: "Signin" }),
  inputs: inputsProps.map((item) => {
    validate.push(new InputValidate(item.handleBlur));

    return new Input({
      attributes: item.attributes,
      name: item.name,
      className: "auth__input",
    });
  }),
  button: new Button({
    text: "Signin",
    className: "button auth__button",
  }),
  altText: "don't have an account?",
};

class SigninPage extends Block {
  constructor() {
    super("div", data);
  }

  getFormData() {
    event.preventDefault();
    console.log(form.getData());
  }

  goSignup() {
    event.preventDefault();
    router.go("#/signup");
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
        ".auth__link_signin"
      );

      form = new Form(formContainer, formButton);

      inputs.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validate[i].handleFocus;
        (input as HTMLInputElement).onblur = validate[i].handleBlur;
      });
      formContainer.oninput = form.formIsValid;
      formButton.onclick = this.getFormData;
      altButton.onclick = this.goSignup;
    });
  }

  render(): string {
    return signinPageTemplate.compile({
      title: this.props.title.render(),
      inputs: this.props.inputs.map((item: any) => item.render()).join(""),
      button: this.props.button.render(),
      altText: this.props.altText,
    });
  }
}

export { SigninPage };
