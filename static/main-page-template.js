"use strict";
(function () {
    const mainPageTemplate = `
    <div class="root">
      {% header %}
      <main class="main-content">
        <section class="aside-panel">
          <form class="aside-panel__search-form">
            <div class="aside-panel__search-icon"></div>
            <input
              type="text"
              class="aside-panel__search-input"
              placeholder="Search"
            />
          </form>
          <div class="aside-panel__card-list">
            {% chatCards %}
          </div>
        </section>
        <section class="messages-window">
          <div
            class="messages-window__start-container messages-window__start-container_hidden"
          >
            <p class="messages-window__start-container-text">
              select or create a chat to start communicate
            </p>
          </div>
          <div class="messages-window__container">
            <div class="messages-window__list">
              <time class="messages-window__date-separator"
                >thursday, 6 august 2020</time
              >
              {% message %}
              <time class="messages-window__date-separator"
                >thursday, 6 august 2020</time
              >
              {% message %}
            </div>
            <div class="control-panel">
              <form class="control-panel__form">
                <input
                  type="text"
                  class="input control-panel__input"
                  placeholder="Start to write..."
                  onInput="{% handleInput %}(% bind(this, this) %)"
                />
                <button class="control-panel__send-button" onClick={% handleClickButton %}></button>
              </form>
              <div class="control-panel__media">
                <div
                  class="control-panel__media-item control-panel__media-item_file"
                ></div>
                <div
                  class="control-panel__media-item control-panel__media-item_camera"
                ></div>
                <div
                  class="control-panel__media-item control-panel__media-item_mic"
                ></div>
                <div class="control-panel__emojis">
                  😄😁😡🤐🤑
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer class="footer">
        <h2 class="footer__title">Useful links</h2>        
        <a href="./pages/signin" class="footer__test-link">Signin</a>
        <a href="./pages/signup" class="footer__test-link">Signup</a>
        <a href="./pages/user-settings" class="footer__test-link">User settings</a>
        <a href="./pages/not-found" class="footer__test-link">404</a>
        <a href="./pages/server-error" class="footer__test-link">500</a>
      </footer>
    </div>
  `;
    window.mainPageTemplate = mainPageTemplate;
})();
