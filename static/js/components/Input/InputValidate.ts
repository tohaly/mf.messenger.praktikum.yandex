interface IInputValidate {
  _FIELD_REQUIRED: string;
  _input: HTMLInputElement;
  _errorContainer: Element;
  _customValidate: Function;
  _toggleError(isActive: boolean, message?: string): void;
  handleBlur(): void;
  handleFocus(): void;
}

interface Window {
  InputValidate: new (
    input: HTMLInputElement,
    customValidate: Function
  ) => IInputValidate;
}
(function () {
  class InputValidate implements IInputValidate {
    readonly _FIELD_REQUIRED = "This is felid required";
    readonly _input: HTMLInputElement;
    readonly _errorContainer: Element;
    readonly _customValidate: Function;

    constructor(input: HTMLInputElement, customValidate: Function) {
      this._input = input;
      this._errorContainer = this._input.nextElementSibling;
      this._customValidate = customValidate;
    }

    _toggleError = (isActive: boolean, message: string = ""): void => {
      const err = this._errorContainer;
      if (isActive) {
        err.classList.add("auth__error_active");
        err.textContent = message;
      } else {
        err.classList.remove("auth__error_active");
        err.textContent = message;
      }
    };

    handleBlur = (): void => {
      if (this._input.validity.valueMissing) {
        this._toggleError(true, this._FIELD_REQUIRED);
        return;
      }
      this._customValidate(this._input, this._toggleError);
    };

    handleFocus = () => {
      this._toggleError(false);
    };
  }
  window.InputValidate = InputValidate;
})();
