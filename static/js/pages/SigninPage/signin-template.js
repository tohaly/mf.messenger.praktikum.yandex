const signinPageTemplate = `
  <div class="root">
  <main class="main-content">
    <div class="auth-with-container">
      <div class="auth">
        {% title %}
        <form class="auth__form auth__form_signin">
          {% inputs %}
          <span class="auth__error auth__error_server"
            >Server error</span
          >
          {% button %}
          <a href="#" class="link auth__link auth__link_signin"
            > {% altText %} </a
          >
          </form>
        </div>
      </div>
    </main>
  </div>
  `;
export default signinPageTemplate;
