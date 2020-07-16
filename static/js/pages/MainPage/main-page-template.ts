const mainPageTemplate: string = `
    <div class="root">
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
    </div>
  `;

export default mainPageTemplate;
