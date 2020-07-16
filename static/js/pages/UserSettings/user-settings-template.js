const userSettingsPageTemplate = `
  <div class="root">
  <main class="main-content">
    <div class="auth-user-settings">
      {% title %}
      <div class="auth-user-settings__container">
      {% avatar %}
        <div class="auth">
          <form class="auth__form" novalidate="true">
            {% inputs %}
          </form>
        </div>
      </div>
      <span class="auth__error auth__error_server">Server error</span>
      {% button %}
    </div>
  </main>
</div>
  `;
export default userSettingsPageTemplate;
