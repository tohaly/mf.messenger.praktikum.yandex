const template: string = `
    <div class="form__input-wrapper">
      <input
      class="input auth__input"
      {% attributes %}
      name="{% name %}"
      {% value %}     
      />
      <span class="auth__error"></span>
    </div>
  `;

export { template };
