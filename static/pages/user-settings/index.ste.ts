(function () {
  const headerTemplate = window.Header;
  const titleTemplate = window.Title;
  const avatarTemplate = window.Avatar;
  const inputTemplate = window.Input;
  const buttonTemplate = window.AuthButton;

  const Header = new window.SimpleTemplateEngine(headerTemplate);
  const Title = new window.SimpleTemplateEngine(titleTemplate);
  const Avatar = new window.SimpleTemplateEngine(avatarTemplate);
  const Input = new window.SimpleTemplateEngine(inputTemplate);
  const Button = new window.SimpleTemplateEngine(buttonTemplate);

  const { passwordValidator, simpleTextValidator, emailValidator } = window;

  const data = {
    title: {
      text: "User settings",
    },
    avatar: {
      link: "../../images/example-user-img.jpg",
      alt: "User avatar",
      className: "auth-user-settings__img",
    },
    inputs: [
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
    ],
    saveButton: {
      handleClick() {
        event.preventDefault();
        console.log(form.getData());
      },
      text: "Save changes",
    },
  };

  const { inputs, saveButton, avatar, title } = data;

  const inputWrappers = inputs
    .map((item) => {
      return `
    <div class="form__input-wrapper">
      ${Input.compile(item, "auth__input")}           
      <span class="auth__error">Failed required</span>
    </div>`;
    })
    .join("\n");

  const SignInPageTemplate = `
  <div class="root">
  ${Header.compile()}
  <main class="main-content">
    <div class="auth-user-settings">
      ${Title.compile(title, "auth-user-settings__title")}
      <div class="auth-user-settings__container">
      ${Avatar.compile(avatar)}
        <div class="auth">
          <form class="auth__form" novalidate="true">
            ${inputWrappers}
          </form>
        </div>
      </div>
      <span class="auth__error auth__error_server">Server error</span>
      ${Button.compile(saveButton, "auth-user-settings__button")}
    </div>
  </main>
</div>
`;

  document
    .querySelector(".page")
    .appendChild(
      new window.SimpleTemplateEngine(SignInPageTemplate).getNode(data)
    );

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
    const input = new window.InputValidate(element, inputs[i].handleBlur);
    inputClones.push(input);
    element.addEventListener("focus", input.handleFocus);
    element.addEventListener("blur", input.handleBlur);
  });
})();
