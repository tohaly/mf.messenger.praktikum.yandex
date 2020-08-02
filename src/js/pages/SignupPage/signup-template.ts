const signupPageTemplate: string = `
  <div class="root">
  <main class="main-content">
    <div class="auth-with-container">
      <div class="auth">
        {% title %}
        <form class="auth__form">
          {% inputs %}
          {% serverError %}
          {% button %}
          <a href="№" class="link auth__link {% altLinkClassName %}"
            >{% altText %}</a
          >          
      </form>        
      </div>
    </div>
    <div class="loader {% loaderActivateClass %}">
      <div class="loader__item"></div>
      <p class="loader__text">Загрузка, подождите...</p>
    </div>
  </main>
  </div>
  `;
export default signupPageTemplate;
