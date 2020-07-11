interface Window {
  AuthButton: string;
}

window.AuthButton = (function () {
  return `
    <button type="submit" class="button auth__button" onClick = {% handleClick %}(% bind(this) %) disabled>{% text %}</button>
  `;
})();
