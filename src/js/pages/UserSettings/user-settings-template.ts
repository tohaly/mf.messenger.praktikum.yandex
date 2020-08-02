const userSettingsPageTemplate: string = `
  <div class="root">
  <main class="main-content">
    <div class="auth-user-settings">
      {% title %}
      <div class="auth-user-settings__container">
          <form class="auth__form auth__form_avatar" novalidate="true">            
            {% avatar %}
            {% inputAvatar %}
            {% buttonAvatar %}
          </form>
        <div class="auth auth_user-settings ">
          <form class="auth__form auth__form_user-info auth_right-margin" novalidate="true">
            {% inputsUserInfo %}
            {% buttonUserInfo %}
          </form>
          <form class="auth__form auth__form_user-password" novalidate="true">
            {% inputsUserPassword %}
            {% buttonPassword %}
          </form>
        </div>
      </div>
      <span class="auth__error auth__error_server">Server error</span>      
    </div>
  </main>
</div>
  `;

export default userSettingsPageTemplate;
