interface Window {
  Input: string;
}

window.Input = (function () {
  return `
    <input
      class="input"
      {% attributes %}
      name="{% name %}"
    />
  `;
})();
