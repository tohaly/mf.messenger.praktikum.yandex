window.Form = class {
  constructor(form, button, customValidator = () => true) {
    // Не совсем понял как можно было бы передать список валидаторов сюда))
    // Постарался учесть все замечания, теперь с DOM работаем только при инициализации и с ошибками
    // для инпутов сделал отдельный класс у каждого инпута теперь свой обработчик.
    // Так же валидацию формы можно настроить в зависимости от конкретного случая.
    this._form = form;
    this._button = button;
    this.virtualForm = {};
    this._customValidator = customValidator;
  }

  _toggleButton(isActive) {
    if (isActive) {
      this._button.removeAttribute("disabled");
    } else {
      this._button.setAttribute("disabled", "true");
    }
  }

  _saveValue = (event) => {
    this.virtualForm[event.target.name] = event.target.value;
  };

  formIsValid = (event) => {
    this._saveValue(event);

    if (this._form.checkValidity() && this._customValidator(this.virtualForm)) {
      this._toggleButton(true);
      return;
    }
    this._toggleButton(false);
  };

  _clear() {
    this._form.reset();
  }

  getData = () => {
    const data = this.virtualForm;
    this._clear();
    this._toggleButton(false);
    return data;
  };
};
