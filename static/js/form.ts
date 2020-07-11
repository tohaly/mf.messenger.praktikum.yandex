type objectKyString = { [key: string]: string };

interface IForm {
  _form: HTMLFormElement;
  _button: Element;
  virtualForm: objectKyString;
  _customValidator(): boolean;

  _toggleButton(isActive: boolean): void;
  _saveValue(event: Event): void;
  formIsValid(event: Event): void;
  _clear(): void;
  getData(): objectKyString;
}

interface Window {
  Form: new (
    form: HTMLFormElement,
    button: Element,
    customValidator?: () => boolean
  ) => IForm;
}

(function () {
  class Form implements IForm {
    _form: HTMLFormElement;
    _button: Element;
    virtualForm: objectKyString;
    _customValidator: () => boolean;

    constructor(
      form: HTMLFormElement,
      button: Element,
      customValidator = (): boolean => true
    ) {
      this._form = form;
      this._button = button;
      this.virtualForm = {};
      this._customValidator = customValidator;
    }

    _toggleButton(isActive: boolean): void {
      if (isActive) {
        this._button.removeAttribute("disabled");
      } else {
        this._button.setAttribute("disabled", "true");
      }
    }

    _saveValue = (event: Event): void => {
      this.virtualForm[
        (event.target as HTMLInputElement).name
      ] = (event.target as HTMLInputElement).value;
    };

    formIsValid = (event: Event): void => {
      this._saveValue(event);

      if (this._form.checkValidity() && this._customValidator()) {
        this._toggleButton(true);
        return;
      }
      this._toggleButton(false);
    };

    _clear(): void {
      this._form.reset();
    }

    getData = (): objectKyString => {
      const data = this.virtualForm;
      this._clear();
      this._toggleButton(false);
      return data;
    };
  }

  window.Form = Form;
})();
