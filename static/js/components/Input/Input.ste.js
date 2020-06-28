window.Input = (function () {
  return `
    <input
      class="input"
      {% attributes %}
      onBlur="{% onBlur %}"
      onFocus="{% onFocus %}"
    />
  `;
})();
