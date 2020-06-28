(function () {
  const inputValidate = new window.InputValidate();

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

  const data = {
    title: {
      text: "User settings",
    },
    avatar: {
      link: "../../images/example-user-img.jpg",
      alt: "User avatar",
      className: "auth-user-settings__img",
    },
    inputs: {
      attributes: [
        {
          attributes: `
          type="text"
          placeholder="name" 
          minlength="2"
          maxlength="20"
          required
        `,
        },
        {
          attributes: `
          type="text"
          placeholder="login" 
          minlength="2"
          maxlength="20"
          required
        `,
        },
        {
          attributes: `
          type="email" 
          placeholder="email" 
          pattern="^[0-9A-Za-z]{1}[-0-9A-z\\.]{1,}[0-9A-Za-z]{1}@([-0-9A-Za-z]{1,}\\.){1,3}[-A-Za-z]{2,}$"
          required
          `,
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
        },
      ],
      methods: {
        onFocus() {
          return inputValidate.onFocus(this);
        },
        onBlur() {
          return inputValidate.onBlur(this);
        },
      },
    },
    saveButton: {
      handleClick() {
        event.preventDefault();
        return window.logDataForm(this);
      },
      text: "Save changes",
    },
  };

  const { inputs, saveButton, avatar, title } = data;

  const inputWrappers = inputs.attributes
    .map((item) => {
      return `
    <div class="form__input-wrapper">
      ${Input.compile(
        Object.assign(item, inputs.methods),
        "auth__input"
      )}           
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
          <form class="auth__form">
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
})();
