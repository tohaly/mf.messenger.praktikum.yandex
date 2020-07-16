import { Block } from "../../util/Block/Block.js";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine.js";
import {
  passwordValidator,
  simpleTextValidator,
} from "../../util/validators.js";
import router from "../../router.js";

import template from "./signin-template.js";

import { Title } from "../../components/Title/Title.ste.js";
import { Input } from "../../components/Input/Input.ste.js";
import { Button } from "../../components/Button/Button.ste.js";

import { Form, IForm } from "../../form.js";
import { InputValidate } from "../../components/Input/InputValidate.js";

const signinPageTemplate = new SimpleTemplateEngine(template);
let form: IForm;

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
    const validate = new InputValidate(item.handleBlur);

    return new Input({
      attributes: item.attributes,
      name: item.name,
      className: "auth__input",
      handleFocus: validate.handleFocus,
      handleBlur: validate.handleBlur,
    });
  }),
  button: new Button({
    text: "Signin",
    className: "button auth__button",
    handleClick() {
      event.preventDefault();
      console.log(form.getData());
    },
  }),
  altText: "don't have an account?",
};

class SigninPage extends Block {
  constructor() {
    super("div", data);
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const formContainer = this.element.querySelector("form");
      const formButton = this.element.querySelector(".auth__button");

      form = new Form(formContainer, formButton);
      formContainer.addEventListener("input", form.formIsValid);
      formContainer.addEventListener("click", (event) => {
        if (
          (<HTMLLinkElement>event.target).classList.contains(
            "auth__link_signin"
          )
        ) {
          event.preventDefault();
          router.go("#/signup");
        }
      });
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
