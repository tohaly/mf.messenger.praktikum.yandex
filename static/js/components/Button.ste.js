window.AuthButton = (function () {
  return `
    <button class="button auth__button" onClick = {% handleClick %} disabled>{% text %}</button>
  `;
})();
