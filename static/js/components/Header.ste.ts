interface Window {
  Header: string;
}

window.Header = (function () {
  return `
  <header class="header">
    <a href="../../" class="header__logo-link">
      <div class="header__logo-img"></div>
      <h1 class="header__title">Simple chat</h1>
    </a>
    <div class="header__hamburger"></div>
  </header>
  `;
})();
