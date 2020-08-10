const mainPageTemplate = `
    <div class="root">
      <main class="main-content">
        <section class="aside-panel">
          <div class="aside-panel__card-list">
            <div class="aside-panel__add">+</div>
            {% chatCards %}
          </div>
        </section>
        <section class="messages-window">
          <div
            class="messages-window__start-container {% messagesClassNameStartContainer %}"
          >
            <p class="messages-window__start-container-text">
              select or create a chat to start communicate
            </p>
          </div>
          <div class="messages-window__container {% messagesClassNameContainer %}">
            <div class="messages-window__list">
              {% messages %}
            </div>
            <div class="control-panel">
              <form class="control-panel__form">
                <input
                  type="text"
                  class="input control-panel__input"
                  placeholder="Start to write..."
                />
                <button class="control-panel__send-button"></button>
              </form>
              </div>
            </div>
          </div>
          {% popup %}
        </section>
        {% loader %}
      </main>
    </div>
  `;

export default mainPageTemplate;
