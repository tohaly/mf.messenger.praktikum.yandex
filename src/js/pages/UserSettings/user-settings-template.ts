const userSettingsPageTemplate = `
  <div class="root">
    <main class="main-content">
      <div class="auth-user-settings">
        {% title %}
        <div class="auth-user-settings__container">
            <form 
              class="auth__form auth__form_avatar" 
              novalidate="true"
            >
            {% avatar %}
            {% inputAvatar %}
            {% avatarServerMessage %}
            
            {% buttonAvatar %}
            </form>
          <div class="auth auth_user-settings ">
            <form class="auth__form auth__form_user-info auth_right-margin" novalidate="true">
              {% inputsUserInfo %}
              {% userInfoServerMessage %}
              {% buttonUserInfo %}
            </form>
            <form class="auth__form auth__form_password" novalidate="true">
              {% inputsUserPassword %}  
              {% passwordServerMessage %}
              {% buttonPassword %}          
            </form>
          </div>
        </div>
        <span class="auth__error auth__error_server">Server error</span>      
      </div>
      {% loader %}
  </main>
</div>
  `;

export default userSettingsPageTemplate;
