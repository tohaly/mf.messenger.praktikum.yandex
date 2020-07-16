(function () {
  const Block = window.Block;

  const Header = window.Header;
  const Title = window.Title;
  const Avatar = window.Avatar;
  const Input = window.Input;
  const Button = window.Button;

  const template = window.userSettingsPageTemplate;
  const userSettingsTemplatePage = new window.SimpleTemplateEngine(template);

  const { passwordValidator, simpleTextValidator, emailValidator } = window;

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
    header: new Header(),
    title: new Title({ text: "User settings" }),
    avatar: new Avatar({
      link: "../../images/example-user-img.jpg",
      alt: "User avatar",
      className: "auth-user-settings__img",
    }),
    inputs: inputsProps.map(
      (item) =>
        new Input({
          attributes: item.attributes,
          name: item.name,
          className: "auth__input",
        })
    ),
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

    render(): string {
      return userSettingsTemplatePage.compile({
        header: this.props.header.render(),
        title: this.props.title.render(),
        avatar: this.props.avatar.render(),
        inputs: this.props.inputs.map((item: any) => item.render()).join(""),
        button: this.props.button.render(),
      });
    }
  }

  const userSettings = new UserSettings();
  document.querySelector(".page").appendChild(userSettings.getContent());

  const inputClones: IInputValidate[] = [];

  const formContainer = document.querySelector("form");
  const inputsContainer = formContainer.querySelectorAll("input");
  const formButton = document.querySelector(".auth__button");

  const customFormValidate = () => {
    const { virtualForm } = form;
    inputClones.forEach((input) => {
      input.handleFocus();
      input.handleBlur();
    });
    if (virtualForm["new-password"] !== virtualForm["repeat-password"])
      return false;
    if (virtualForm["old-password"] === virtualForm["new-password"])
      return false;
    return true;
  };

  const form = new window.Form(formContainer, formButton, customFormValidate);
  formContainer.addEventListener("input", form.formIsValid);
  inputsContainer.forEach((element, i) => {
    const input = new window.InputValidate(element, inputsProps[i].handleBlur);
    inputClones.push(input);
    element.addEventListener("focus", input.handleFocus);
    element.addEventListener("blur", input.handleBlur);
  });
})();
