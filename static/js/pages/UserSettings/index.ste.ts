import { Block } from "../../util/Block/Block.js";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine.js";
import {
  passwordValidator,
  simpleTextValidator,
  emailValidator,
} from "../../util/validators.js";

import template from "./user-settings-template.js";

import router from "../../router.js";

import { Title } from "../../components/Title/Title.ste.js";
import { Avatar } from "../../components/Avatar/Avatar.ste.js";
import { Input } from "../../components/Input/Input.ste.js";
import { Button } from "../../components/Button/Button.ste.js";

import { Form, IForm } from "../../form.js";
import {
  InputValidate,
  IInputValidate,
} from "../../components/Input/InputValidate.js";

const userSettingsTemplatePage = new SimpleTemplateEngine(template);
let form: IForm;

const inputsProps = [
  {
    attributes: `
        type="text"
        placeholder="name" 
        minlength="2"
        maxlength="20"
        required
      `,
    name: "name",
    handleBlur: simpleTextValidator,
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
      if (element.value === form.virtualForm["old-password"]) {
        callback(true, PASSWORD_COINCIDES);
        return;
      }
    },
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
      if (element.value !== form.virtualForm["new-password"]) {
        callback(true, PASSWORD_MISMATCH);
        return;
      }
    },
  },
];

const data = {
  title: new Title({ text: "User settings" }),
  avatar: new Avatar({
    link: "../../images/example-user-img.jpg",
    alt: "User avatar",
    className: "auth-user-settings__img",
  }),
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
    text: "Save changes",
    className: "button auth__button auth-user-settings__button",
    handleClick() {
      event.preventDefault();
      console.log(form.getData());
    },
  }),
};

class UserSettings extends Block {
  constructor() {
    super("div", data);
  }

  componentDidMount() {
    const customFormValidate = () => {
      const { virtualForm } = form;

      if (virtualForm["new-password"] !== virtualForm["repeat-password"])
        return false;
      if (virtualForm["old-password"] === virtualForm["new-password"])
        return false;
      return true;
    };
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const formContainer = this.element.querySelector("form");
      const formButton = this.element.querySelector(".auth__button");

      form = new Form(formContainer, formButton, customFormValidate);
      formContainer.addEventListener("input", form.formIsValid);
    });
  }

  render(): string {
    return userSettingsTemplatePage.compile({
      title: this.props.title.render(),
      avatar: this.props.avatar.render(),
      inputs: this.props.inputs.map((item: any) => item.render()).join(""),
      button: this.props.button.render(),
    });
  }
}

export { UserSettings };
