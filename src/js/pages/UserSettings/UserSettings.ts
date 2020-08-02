import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine";
import template from "./user-settings-template";
import {
  Title,
  Input,
  Button,
  Avatar,
  ServerError,
} from "../../components/index";
import { inputsProps } from "./inputsProps";
import { auth } from "../../../index";

import AVATAR_BIG from "../../../../static/images/example-user-img.jpg";

import { Form, IForm } from "../../form";
import {
  InputValidate,
  IInputValidate,
} from "../../components/Input/InputValidate";

interface IInputsProp {
  attributes: string;
  name: string;
  handleBlur(element: HTMLInputElement, callback: Function): void;
}

const userSettingsTemplatePage = new SimpleTemplateEngine(template);

// const data = {
//   title: new Title({ text: "User settings" }),
//   avatar: new Avatar({
//     link: AVATAR_BIG,
//     alt: "User avatar",
//     className: "auth-user-settings__img",
//   }),
//   inputs: inputsProps.map((item) => {
//     validate.push(new InputValidate(item.handleBlur));

//     return new Input({
//       attributes: item.attributes,
//       name: item.name,
//       className: "auth__input",
//     });
//   }),
//   button: new Button({
//     text: "Save changes",
//     className: "button auth__button auth-user-settings__button",
//     handleClick() {
//       event.preventDefault();
//       // console.log(form.getData());
//     },
//   }),
// };

class UserSettings extends Block {
  inputsValue: { [key: string]: string };
  validate: IInputValidate[];
  form: IForm;
  constructor() {
    super("div", {
      title: new Title({ text: "Signup" }).render(),
      avatar: new Avatar({
        link: AVATAR_BIG,
        alt: "User avatar",
        className: "auth-user-settings__img",
      }).render(),
      // serverError: new ServerError({
      //   text: "",
      // }),
      inputAvatar: new Input({
        attributes: inputsProps.avatar[0].attributes,
        name: inputsProps.avatar[0].name,
        className: "auth__input auth__input_avatar",
      }).render(),
      buttonAvatar: new Button({
        text: "Load avatar",
        className: "auth__button auth__button_avatar",
        isDisabled: false,
      }).render(),
      buttonUserInfo: new Button({
        text: "Save user info",
        className: "auth__button auth__button_user-setting",
        isDisabled: false,
      }).render(),
      buttonPassword: new Button({
        text: "Change",
        className: "auth__button auth__button_password",
        isDisabled: false,
      }).render(),
      isLoad: false,
    });

    this.inputsValue;
    this.validate = [];
    this.form;
  }

  getUserInfoInputs() {
    this.inputsValue = this.inputsValue || {};
    this.validate = this.validate || [];
    return (inputsProps.userInfo as IInputsProp[])
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

  getPasswordInputs() {
    this.inputsValue = this.inputsValue || {};
    this.validate = this.validate || [];
    return (inputsProps.password as IInputsProp[])
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

  customFormValidate() {
    // const { virtualForm } = form;
    // if (virtualForm["new-password"] !== virtualForm["repeat-password"])
    //   return false;
    // if (virtualForm["old-password"] === virtualForm["new-password"])
    //   return false;
    // return true;
  }

  getFormData() {
    // event.preventDefault();
    // console.log(form.getData());
  }

  componentDidMount() {
    auth.getUserInfo().then((res) => console.log(res));
    // this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
    //   const { element } = this;
    //   const formContainer = element.querySelector("form");
    //   const inputs = element.querySelectorAll(".input");
    //   const formButton: HTMLButtonElement = element.querySelector(
    //     ".auth-user-settings__button"
    //   );
    //   // form = new Form(formContainer, formButton, this.customFormValidate);
    //   inputs.forEach((input, i) => {
    //     (input as HTMLInputElement).onfocus = validate[i].handleFocus;
    //     (input as HTMLInputElement).onblur = validate[i].handleBlur;
    //   });
    //   // formContainer.oninput = form.formIsValid;
    //   formButton.onclick = this.getFormData;
    // });
  }

  render(): string {
    const {
      title,
      avatar,
      inputAvatar,
      buttonAvatar,
      buttonUserInfo,
      buttonPassword,
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
    });
  }
}

export { UserSettings };
