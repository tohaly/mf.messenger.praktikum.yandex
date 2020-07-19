class InputValidate {
    constructor(customValidate) {
        this._FIELD_REQUIRED = "This is felid required";
        this._toggleError = (isActive, message = "") => {
            const err = event.target.nextElementSibling;
            if (isActive) {
                err.classList.add("auth__error_active");
                err.textContent = message;
            }
            else {
                err.classList.remove("auth__error_active");
                err.textContent = message;
            }
        };
        this.handleBlur = () => {
            if (event.target.validity.valueMissing) {
                this._toggleError(true, this._FIELD_REQUIRED);
                return;
            }
            this._customValidate(event.target, this._toggleError);
        };
        this.handleFocus = () => {
            this._toggleError(false);
        };
        this._customValidate = customValidate;
    }
}
export { InputValidate };
