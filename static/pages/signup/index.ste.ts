(function () {
  const Block = window.Block;

  const Header = window.Header;
  const Title = window.Title;
  const Input = window.Input;
  const Button = window.Button;

  const template = window.signupPageTemplate;
  const signupTemplatePage = new window.SimpleTemplateEngine(template);

  const { passwordValidator, simpleTextValidator, emailValidator } = window;

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
    header: new Header(),
    title: new Title({ text: "Signup" }),
    inputs: inputsProps.map(
      (item) =>
        new Input({
          attributes: item.attributes,
          name: item.name,
          className: "auth__input",
        })
    ),
    button: new Button({
      text: "Signup",
      className: "button auth__button",
      handleClick() {
        event.preventDefault();
        console.log(form.getData());
      },
    }),
  };

  class SignupPage extends Block {
    constructor() {
      super("div", data);
    }

    render(): string {
      return signupTemplatePage.compile({
        header: this.props.header.render(),
        title: this.props.title.render(),
        inputs: this.props.inputs.map((item: any) => item.render()).join(""),
        button: this.props.button.render(),
      });
    }
  }
  const signupPage = new SignupPage();
  document.querySelector(".page").appendChild(signupPage.getContent());

  const inputClones: IInputValidate[] = [];

  const formContainer = document.querySelector("form");
  const inputsContainer = formContainer.querySelectorAll("input");
  const formButton = document.querySelector(".auth__button");

  const customFormValidate = () => {
    inputClones.forEach((input) => {
      input.handleFocus();
      input.handleBlur();
    });
    if (form.virtualForm["password"] !== form.virtualForm["repeat-password"])
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
