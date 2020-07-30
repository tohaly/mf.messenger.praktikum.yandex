const signupPageTemplate: string = `
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
          <a href="№" class="link auth__link auth__link_signup"
            >{% altText %}</a
          >
        </form>
      </div>
    </div>
  </main>
  </div>
  `;
export default signupPageTemplate;
