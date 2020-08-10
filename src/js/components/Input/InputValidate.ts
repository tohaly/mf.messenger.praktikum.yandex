interface IInputValidate {
  _FIELD_REQUIRED: string;
  _customValidate: Function;
  _toggleError(isActive: boolean, message?: string): void;
  handleBlur(): void;
  handleFocus(): void;
}

class InputValidate implements IInputValidate {
  readonly _FIELD_REQUIRED = 'This is felid required';
  readonly _customValidate: Function;

  constructor(customValidate: Function) {
    this._customValidate = customValidate;
  }

  _toggleError = (isActive: boolean, message = ''): void => {
    const err = (<HTMLInputElement>event.target).nextElementSibling;
    if (isActive) {
      err.classList.add('auth__error_active');
      err.textContent = message;
    } else {
      err.classList.remove('auth__error_active');
      err.textContent = message;
    }
  };

  handleBlur = (): void => {
    if ((<HTMLInputElement>event.target).validity.valueMissing) {
      this._toggleError(true, this._FIELD_REQUIRED);
      return;
    }
    this._customValidate(<HTMLInputElement>event.target, this._toggleError);
  };

  handleFocus = () => {
    this._toggleError(false);
  };
}

export { InputValidate, IInputValidate };
