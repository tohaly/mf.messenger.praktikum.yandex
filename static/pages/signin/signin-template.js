"use strict";
(function () {
    const signinPageTemplate = `
  <div class="root">
  <main class="main-content">
    <div class="auth-with-container">
      <div class="auth">
        {% title %}
        <form class="auth__form">
          {% inputs %}
          <span class="auth__error auth__error_server"
            >Server error</span
          >
          {% button %}
          <a href="../signup/" class="link auth__link"
            >don't have an account?</a
          >
          </form>
        </form>
      </div>
    </div>
  </main>
  </div>
  `;
    window.signinPageTemplate = signinPageTemplate;
})();
