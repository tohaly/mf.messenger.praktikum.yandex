"use strict";
window.Input = (function () {
    return `
    <input
      class="input"
      {% attributes %}
      name="{% name %}"
    />
  `;
})();
