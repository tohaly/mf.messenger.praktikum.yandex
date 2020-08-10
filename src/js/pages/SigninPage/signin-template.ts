export const template = `
  <div class="rot">
  <main class="main-content">
    <div class="auth-with-container">
      <div class="auth">
        {% title %}
        <form class="auth__form auth__form_signin">
          {% inputs %}          
          {% serverMessage %}
          {% button %}
          <a href="#" class="link auth__link auth__link_signin"
            > {% altText %} </a
          >
          </form>          
        </div>
      </div>
      {% loader %}
    </main>
  </div>
  `;
