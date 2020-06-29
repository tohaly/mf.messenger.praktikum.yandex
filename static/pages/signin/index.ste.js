(function () {
  const headerTemplate = window.Header;
  const titleTemplate = window.Title;
  const inputTemplate = window.Input;
  const buttonTemplate = window.AuthButton;

  const Header = new window.SimpleTemplateEngine(headerTemplate);
  const Title = new window.SimpleTemplateEngine(titleTemplate);
  const Input = new window.SimpleTemplateEngine(inputTemplate);
  const Button = new window.SimpleTemplateEngine(buttonTemplate);

  const data = {
    title: { text: "Signin" },
    inputs: {
      attributes: [
        {
          attributes: `
          type="text"
          placeholder="login" 
          minlength="2"
          maxlength="20"
          required
        `,
          className: "auth__input_login",
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
          className: "auth__input_password",
        },
      ],
    },
    signinButton: {
      handleClick() {
        event.preventDefault();
        return window.logDataForm(this);
      },
      text: "Signin",
    },
  };

  const { inputs, signinButton, title } = data;

  const inputWrappers = inputs.attributes
    .map((item) => {
      return `
        <div class="form__input-wrapper">
          ${Input.compile(item, `auth__input ${item.className}`)}           
          <span class="auth__error">Failed required</span>
        </div>`;
    })
    .join("\n");

  const SignInPageTemplate = `
    <div class="root">
    ${Header.compile()}
    <main class="main-content">
      <div class="auth-with-container">
        <div class="auth">
          ${Title.compile(title, "auth__title")}
          <form class="auth__form">
            ${inputWrappers}
            <span class="auth__error auth__error_server"
              >Server error</span
            >
            ${Button.compile(signinButton)}
            <a href="../signup/" class="link auth__link"
              >don't have an account?</a
            >
            </form>
          </form>
        </div>
      </div>
    </main>
    </div>
`;

  document
    .querySelector(".page")
    .appendChild(
      new window.SimpleTemplateEngine(SignInPageTemplate).getNode(data)
    );
})();

const formContainer = document.querySelector("form");
const inputsContainer = formContainer.querySelectorAll("input");

const form = new window.Form(formContainer);

inputsContainer.forEach((input) => {
  input.addEventListener("focus", form.setOnFocusHandler);
  input.addEventListener("blur", form.setOnBlurHandler);
});

formContainer.addEventListener("input", form.setInputHandler);
