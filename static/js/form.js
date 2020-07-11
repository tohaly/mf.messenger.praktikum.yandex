"use strict";
(function () {
    class Form {
        constructor(form, button, customValidator = () => true) {
            this._saveValue = (event) => {
                this.virtualForm[event.target.name] = event.target.value;
            };
            this.formIsValid = (event) => {
                this._saveValue(event);
                if (this._form.checkValidity() && this._customValidator()) {
                    this._toggleButton(true);
                    return;
                }
                this._toggleButton(false);
            };
            this.getData = () => {
                const data = this.virtualForm;
                this._clear();
                this._toggleButton(false);
                return data;
            };
            this._form = form;
            this._button = button;
            this.virtualForm = {};
            this._customValidator = customValidator;
        }
        _toggleButton(isActive) {
            if (isActive) {
                this._button.removeAttribute("disabled");
            }
            else {
                this._button.setAttribute("disabled", "true");
            }
        }
        _clear() {
            this._form.reset();
        }
    }
    window.Form = Form;
})();
