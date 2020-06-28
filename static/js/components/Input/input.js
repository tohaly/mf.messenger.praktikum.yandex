window.InputValidate = class Input {
  FIELD_REQUIRED = "This is felid required";
  INCORRECT_EMAIL = "Incorrect email";
  INCORRECT_LOGIN = "Login must be from 2 to 20 characters";
  TO_SHORT_PASSWORD = "Min password length 8 characters";
  PASSWORD_REGISTER =
    "Password must contain min two letters in different registers";
  PASSWORD_UNDEFINE = "Password must contain latin letters and numbers";
  PASSWORD_NUMBER = "Password must contain at least one number";
  PASSWORD_MISMATCH = "Passwords mismatch";
  PASSWORD_COINCIDES = "Same as old password";

  onFocus = (element) => {
    const neighbor = element.nextElementSibling;
    this.toggleError(neighbor, false);
  };

  onBlur = (element) => {
    const form = element.parentNode.parentNode;
    const neighbor = element.nextElementSibling;

    if (element.validity.valueMissing) {
      this.toggleError(neighbor, true, this.FIELD_REQUIRED);
    } else {
      if (element.placeholder === "email" && !element.validity.valid) {
        this.toggleError(neighbor, true, this.INCORRECT_EMAIL);
      }

      if (
        (element.placeholder === "login" || element.placeholder === "name") &&
        (element.validity.tooLong || element.validity.tooShort)
      ) {
        this.toggleError(neighbor, true, this.INCORRECT_LOGIN);
      }

      this.passwordIsValid(element);
    }
    this.buttonValid(form);
  };

  passwordIsValid(element) {
    const neighbor = element.nextElementSibling;

    if (
      element.type === "password" &&
      element.placeholder !== "repeat password"
    ) {
      if (element.validity.tooShort) {
        this.toggleError(neighbor, true, this.TO_SHORT_PASSWORD);
      } else if (!element.validity.valid) {
        if (!/[A-Z]/g.test(element.value)) {
          this.toggleError(neighbor, true, this.PASSWORD_REGISTER);
        } else if (!/[a-z]/g.test(element.value)) {
          this.toggleError(neighbor, true, this.PASSWORD_REGISTER);
        } else if (/[\W_]/g.test(element.value)) {
          this.toggleError(neighbor, true, this.PASSWORD_UNDEFINE);
        } else if (!/[\d]/g.test(element.value)) {
          this.toggleError(neighbor, true, this.PASSWORD_NUMBER);
        }
      }
    }

    if (element.placeholder === "repeat password") {
      const prevPassword = element.parentNode.previousElementSibling.querySelector(
        "input"
      ).value;
      if (prevPassword !== element.value) {
        this.toggleError(neighbor, true, this.PASSWORD_MISMATCH);
      }
    }

    if (element.placeholder === "new password") {
      const prevPassword = element.parentNode.previousElementSibling.querySelector(
        "input"
      ).value;
      if (prevPassword === element.value) {
        this.toggleError(neighbor, true, this.PASSWORD_COINCIDES);
      }
    }

    if (element.placeholder === "old password") {
      const nextNeighbor = element.parentNode.nextElementSibling.querySelector(
        "input"
      ).value;
      if (nextNeighbor && nextNeighbor !== element.value) {
        this.toggleError(neighbor, true, this.PASSWORD_MISMATCH);
      }
    }
  }

  toggleError(element, isActive, message = "") {
    if (isActive) {
      element.classList.add("auth__error_active");
      element.textContent = message;
    } else {
      element.classList.remove("auth__error_active");
      element.textContent = message;
    }
  }

  buttonValid(form) {
    if (form.checkValidity()) {
      const button = document.querySelector(".button");
      button.removeAttribute("disabled");
    } else {
      const button = document.querySelector(".button");
      button.setAttribute("disabled", "true");
    }
  }
};
