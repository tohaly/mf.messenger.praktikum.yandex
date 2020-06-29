window.AuthButton = (function () {
  return `
    <button class="button auth__button" onClick = {% handleClick %}(% bind(this) %) disabled>{% text %}</button>
  `;
})();
