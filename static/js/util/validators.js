const TO_SHORT_PASSWORD = "Min password length 8 characters";
const PASSWORD_REGISTER = "Need two letters in different registers";
const PASSWORD_UNDEFINE = "Password must contain latin letters and numbers";
const PASSWORD_NUMBER = "Password must contain at least one number";
const INCORRECT_TEXT = "Login must be from 2 to 20 characters";
const INCORRECT_EMAIL = "Incorrect email";

window.passwordValidator = (element, callback) => {
  if (element.validity.tooShort) {
    callback(true, TO_SHORT_PASSWORD);
    return;
  }

  if (!element.validity.valid) {
    if (!/[A-Z]/g.test(element.value)) {
      callback(true, PASSWORD_REGISTER);
      return;
    }

    if (!/[a-z]/g.test(element.value)) {
      callback(true, PASSWORD_REGISTER);
      return;
    }

    if (/[\W_]/g.test(element.value)) {
      callback(true, PASSWORD_UNDEFINE);
      return;
    }

    if (!/[\d]/g.test(element.value)) {
      callback(true, PASSWORD_NUMBER);
      return;
    }
  }
};

window.simpleTextValidator = (element, callback) => {
  if (element.validity.tooLong || element.validity.tooShort) {
    callback(true, INCORRECT_TEXT);
    return;
  }
};

window.emailValidator = (element, callback) => {
  if (!element.validity.valid) {
    callback(true, INCORRECT_EMAIL);
    return;
  }
};