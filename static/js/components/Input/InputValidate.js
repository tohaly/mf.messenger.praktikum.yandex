window.InputValidate = class {
  _FIELD_REQUIRED = "This is felid required";

  constructor(input, customValidate) {
    this._input = input;
    this._errorContainer = this._input.nextElementSibling;
    this._customValidate = customValidate;
  }

  _toggleError = (isActive, message = "") => {
    const err = this._errorContainer;
    if (isActive) {
      err.classList.add("auth__error_active");
      err.textContent = message;
    } else {
      err.classList.remove("auth__error_active");
      err.textContent = message;
    }
  };

  handleBlur = () => {
    if (this._input.validity.valueMissing) {
      this._toggleError(true, this._FIELD_REQUIRED);
      return;
    }
    this._customValidate(this._input, this._toggleError);
  };

  handleFocus = () => {
    this._toggleError(false);
  };
};
