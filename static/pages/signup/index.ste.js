"use strict";
(function () {
    const headerTemplate = window.Header;
    const titleTemplate = window.Title;
    const inputTemplate = window.Input;
    const buttonTemplate = window.AuthButton;
    const Header = new window.SimpleTemplateEngine(headerTemplate);
    const Title = new window.SimpleTemplateEngine(titleTemplate);
    const Input = new window.SimpleTemplateEngine(inputTemplate);
    const Button = new window.SimpleTemplateEngine(buttonTemplate);
    const { passwordValidator, simpleTextValidator, emailValidator } = window;
    const data = {
        title: {
            text: "Signup",
        },
        inputs: [
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
                handleBlur(element, callback) {
                    const PASSWORD_MISMATCH = "Passwords mismatch";
                    if (element.value !== form.virtualForm["password"]) {
                        callback(true, PASSWORD_MISMATCH);
                        return;
                    }
                },
            },
        ],
        signupButton: {
            handleClick() {
                event.preventDefault();
                console.log(form.getData());
            },
            text: "Signup",
        },
    };
    const { inputs, signupButton, title } = data;
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
      <div class="auth-with-container">
        <div class="auth">
          ${Title.compile(title, "auth__title")}
          <form class="auth__form">
            ${inputWrappers}
            <span class="auth__error auth__error_server"
              >Server error</span
            >
            ${Button.compile(signupButton)}
            <a href="../signup/" class="link auth__link"
              >don't have an account?</a
            >
          </form>
        </div>
      </div>
    </main>
    </div>
  `;
    document
        .querySelector(".page")
        .appendChild(new window.SimpleTemplateEngine(SignInPageTemplate).getNode(data));
    const inputClones = [];
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
        const input = new window.InputValidate(element, inputs[i].handleBlur);
        inputClones.push(input);
        element.addEventListener("focus", input.handleFocus);
        element.addEventListener("blur", input.handleBlur);
    });
})();
