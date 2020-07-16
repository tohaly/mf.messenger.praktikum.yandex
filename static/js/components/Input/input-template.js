const inputTemplate = `
    <div class="form__input-wrapper">
      <input
      class="input {% className %}"
      {% attributes %}
      name="{% name %}"
      onFocus="{% handleFocus %}"
      onBlur="{% handleBlur %}"
      
      id="{% name %}"
      />
      <span class="auth__error"></span>
    </div>
  `;
export default inputTemplate;
