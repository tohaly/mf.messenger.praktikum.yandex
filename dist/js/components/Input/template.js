const template = `
    <div class="form__input-wrapper">
      <input
      class="input {% className %}"
      {% attributes %}
      name="{% name %}"     
      />
      <span class="auth__error"></span>
    </div>
  `;
export { template };
