import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine";
import {
  passwordValidator,
  simpleTextValidator,
  emailValidator,
} from "../../util/validators";

import template from "./user-settings-template";

import { Title, Input, Button, Avatar } from "../../components/index";

import { Form, IForm } from "../../form";
import {
  InputValidate,
  IInputValidate,
} from "../../components/Input/InputValidate";

const userSettingsTemplatePage = new SimpleTemplateEngine(template);
let form: IForm;
const validate: IInputValidate[] = [];

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
    link: "./images/example-user-img.jpg",
    alt: "User avatar",
    className: "auth-user-settings__img",
  }),
  inputs: inputsProps.map((item) => {
    validate.push(new InputValidate(item.handleBlur));

    return new Input({
      attributes: item.attributes,
      name: item.name,
      className: "auth__input",
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

  customFormValidate() {
    const { virtualForm } = form;

    if (virtualForm["new-password"] !== virtualForm["repeat-password"])
      return false;
    if (virtualForm["old-password"] === virtualForm["new-password"])
      return false;
    return true;
  }

  getFormData() {
    event.preventDefault();
    console.log(form.getData());
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const { element } = this;
      const formContainer = element.querySelector("form");
      const inputs = element.querySelectorAll(".input");
      const formButton: HTMLButtonElement = element.querySelector(
        ".auth-user-settings__button"
      );

      form = new Form(formContainer, formButton, this.customFormValidate);

      inputs.forEach((input, i) => {
        (input as HTMLInputElement).onfocus = validate[i].handleFocus;
        (input as HTMLInputElement).onblur = validate[i].handleBlur;
      });

      formContainer.oninput = form.formIsValid;
      formButton.onclick = this.getFormData;
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
