window.Form = class Form {
  _FIELD_REQUIRED = "This is felid required";
  _INCORRECT_EMAIL = "Incorrect email";
  _INCORRECT_LOGIN = "Login must be from 2 to 20 characters";
  _TO_SHORT_PASSWORD = "Min password length 8 characters";
  _PASSWORD_REGISTER = "Need two letters in different registers";
  _PASSWORD_UNDEFINE = "Password must contain latin letters and numbers";
  _PASSWORD_NUMBER = "Password must contain at least one number";
  _PASSWORD_MISMATCH = "Passwords mismatch";
  _PASSWORD_COINCIDES = "Same as old password";

  constructor(form) {
    this._form = form;
  }

  _toggleError(element, isActive, message = "") {
    if (isActive) {
      element.classList.add("auth__error_active");
      element.textContent = message;
    } else {
      element.classList.remove("auth__error_active");
      element.textContent = message;
    }
  }

  _toggleButton(isActive) {
    const button = document.querySelector("button");
    if (isActive) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "true");
    }
  }

  _validateForm() {
    if (this._form.checkValidity() && this._checkValidMismatchPassword()) {
      this._toggleButton(true);
    } else {
      this._toggleButton(false);
    }
  }

  _onFocus(element) {
    const neighbor = element.nextElementSibling;
    this._toggleError(neighbor, false);
  }

  _onBlur = (element) => {
    const neighbor = element.nextElementSibling;

    if (element.validity.valueMissing) {
      this._toggleError(neighbor, true, this._FIELD_REQUIRED);
    } else {
      if (
        element.classList.contains("auth__input_email") &&
        !element.validity.valid
      ) {
        this._toggleError(neighbor, true, this._INCORRECT_EMAIL);
      }

      if (
        (element.classList.contains("auth__input_login") ||
          element.classList.contains("auth__input_name")) &&
        (element.validity.tooLong || element.validity.tooShort)
      ) {
        this._toggleError(neighbor, true, this._INCORRECT_LOGIN);
      }

      this._passwordIsValid(element);
    }
  };

  _passwordIsValid(element) {
    const neighbor = element.nextElementSibling;

    if (
      element.type === "password" &&
      !element.classList.contains("auth__input_repeat-password")
    ) {
      if (element.validity.tooShort) {
        this._toggleError(neighbor, true, this._TO_SHORT_PASSWORD);
      } else if (!element.validity.valid) {
        if (!/[A-Z]/g.test(element.value)) {
          this._toggleError(neighbor, true, this._PASSWORD_REGISTER);
        } else if (!/[a-z]/g.test(element.value)) {
          this._toggleError(neighbor, true, this._PASSWORD_REGISTER);
        } else if (/[\W_]/g.test(element.value)) {
          this._toggleError(neighbor, true, this._PASSWORD_UNDEFINE);
        } else if (!/[\d]/g.test(element.value)) {
          this._toggleError(neighbor, true, this._PASSWORD_NUMBER);
        }
      }
    }

    if (
      element.classList.contains("auth__input_repeat-password") &&
      !element.classList.contains("auth__input_old-password")
    ) {
      const prevPassword = element.parentNode.previousElementSibling.querySelector(
        "input"
      ).value;
      if (prevPassword !== element.value) {
        this._toggleError(neighbor, true, this._PASSWORD_MISMATCH);
      }
    }

    if (element.classList.contains("auth__input_new-password")) {
      const prevPassword = element.parentNode.previousElementSibling.querySelector(
        "input"
      ).value;
      if (prevPassword === element.value) {
        this._toggleError(neighbor, true, this._PASSWORD_COINCIDES);
      }
    }
  }

  _checkValidMismatchPassword() {
    const repeatPassword = this._form.querySelector(
      ".auth__input_repeat-password"
    );
    const newPassword = this._form.querySelector(".auth__input_new-password");

    if (repeatPassword) {
      const prevPassword = repeatPassword.parentNode.previousElementSibling.querySelector(
        "input"
      ).value;
      if (prevPassword !== repeatPassword.value) {
        return false;
      }
    }

    if (newPassword) {
      const prevPassword = newPassword.parentNode.previousElementSibling.querySelector(
        "input"
      ).value;
      if (prevPassword === newPassword.value) {
        return false;
      }
    }
    return true;
  }

  setOnBlurHandler = (event) => {
    this._onBlur(event.target);
  };

  setOnFocusHandler = (event) => {
    this._onFocus(event.target);
  };

  setInputHandler = () => {
    this._validateForm();
  };
};
