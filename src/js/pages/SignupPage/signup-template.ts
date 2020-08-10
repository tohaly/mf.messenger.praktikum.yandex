const signupPageTemplate = `
  <div class="root">
  <main class="main-content">
    <div class="auth-with-container">
      <div class="auth">
        {% title %}
        <form class="auth__form auth__form_signup">
          {% inputs %}                
        </form>   
        {% serverMessage %}
        {% button %}
        <a href="№" class="link auth__link {% altLinkClassName %}"
          >{% altText %}</a
        >         
      </div>
    </div>
  </main>
  {% loader %}
  </div>
  `;
export default signupPageTemplate;
