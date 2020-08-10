const template = `
  <div class="error">
    <h1 class="error__title">{% errorCode %}</h1>
    <p class="error__subtitle">{% errorTitle %}</p>
    <div class="error__img"></div>
    <a class="link error__link">back to main</a>
  </div>
`;

export { template };
