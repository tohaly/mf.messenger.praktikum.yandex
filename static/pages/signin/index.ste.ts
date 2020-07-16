(function () {
  const Block = window.Block;

  const Header = window.Header;
  const Title = window.Title;
  const Input = window.Input;
  const Button = window.Button;

  const template = window.signinPageTemplate;
  const signinPageTemplate = new window.SimpleTemplateEngine(template);

  const { passwordValidator, simpleTextValidator } = window;

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
    header: new Header(),
    title: new Title({ text: "Signin" }),
    inputs: inputsProps.map(
      (item) =>
        new Input({
          attributes: item.attributes,
          name: item.name,
          className: "auth__input",
        })
    ),
    button: new Button({
      text: "Signin",
      className: "button auth__button",
      handleClick() {
        event.preventDefault();
        console.log(form.getData());
      },
    }),
  };

  class SigninPage extends Block {
    constructor() {
      super("div", data);
    }

    render(): string {
      return signinPageTemplate.compile({
        header: this.props.header.render(),
        title: this.props.title.render(),
        inputs: this.props.inputs.map((item: any) => item.render()).join(""),
        button: this.props.button.render(),
      });
    }
  }
  const signinPage = new SigninPage();
  document.querySelector(".page").appendChild(signinPage.getContent());

  const formContainer = document.querySelector("form");
  const inputsContainer = formContainer.querySelectorAll("input");
  const formButton = document.querySelector(".auth__button");

  const form = new window.Form(formContainer, formButton);
  formContainer.addEventListener("input", form.formIsValid);

  inputsContainer.forEach((element, i) => {
    const input = new window.InputValidate(element, inputsProps[i].handleBlur);
    element.addEventListener("focus", input.handleFocus);
    element.addEventListener("blur", input.handleBlur);
  });
})();
