type objectKyString = { [key: string]: string };

interface IForm {
  _form: HTMLFormElement;
  _button: Element;
  _customValidator(): boolean;
  _toggleButton(isActive: boolean): void;
  formIsValid(): void;
  saveValue(event: HTMLInputElement, obj: objectKyString): void;
}

class Form implements IForm {
  _form: HTMLFormElement;
  _button: Element;
  _customValidator: () => boolean;

  constructor(form: HTMLFormElement, button: Element, customValidator = (): boolean => true) {
    this._form = form;
    this._button = button;
    this._customValidator = customValidator;
  }

  saveValue(input: HTMLInputElement, obj: objectKyString) {
    obj[input.name] = input.value;
  }

  _toggleButton(isActive: boolean): void {
    if (isActive) {
      this._button.removeAttribute('disabled');
    } else {
      this._button.setAttribute('disabled', 'true');
    }
  }

  formIsValid = (): void => {
    if (this._form.checkValidity() && this._customValidator()) {
      this._toggleButton(true);
      return;
    }
    this._toggleButton(false);
  };
}

export { Form, IForm };
