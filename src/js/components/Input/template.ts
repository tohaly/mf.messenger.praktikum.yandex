const template = `
    <div class="form__input-wrapper">
      <input
      class="input auth__input {% className %}"
      {% attributes %}
      name="{% name %}"
      {% value %}     
      />
      <span class="auth__error"></span>
    </div>
  `;

export { template };
