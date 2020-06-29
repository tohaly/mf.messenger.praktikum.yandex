(function () {
  const headerTemplate = window.Header;
  const chatCardTemplate = window.ChatCard;
  const avatarTemplate = window.Avatar;

  const Header = new window.SimpleTemplateEngine(headerTemplate);
  const Avatar = new window.SimpleTemplateEngine(avatarTemplate);
  const ChatCard = new window.SimpleTemplateEngine(chatCardTemplate);

  const data = {
    card: {
      Avatar: Avatar.compile({
        link: "./images/chat-card__img.png",
        alt: "Avatar",
        className: "chat-card__img",
      }),
      title: "Title",
      text: "Sorry, its just that I get very ne...",
      activateHandle() {
        document.querySelectorAll(".chat-card").forEach((element) => {
          element.classList.remove("chat-card_active");
        });
        this.classList.add("chat-card_active");
      },
    },
    messageAvatar: {
      link: "./images/chat-card__img.png",
      alt: "Avatar",
      className: "message__avatar",
    },
    handleInput() {
      const button = this.nextElementSibling;
      const text = this.value;
      const spaces = text.match(/\s*/)[0];

      if (this.value && this.value !== spaces) {
        button.classList.add("control-panel__send-button_active");
      } else {
        button.classList.remove("control-panel__send-button_active");
      }
    },
    handleClickButton() {
      event.preventDefault();
      const input = this.previousElementSibling;
      const form = input.parentNode;
      console.log(input.value);
      form.reset();
      this.classList.remove("control-panel__send-button_active");
    },
  };
  const { card, messageAvatar } = data;
  const MainPage = `
  <div class="root">
      ${Header.compile()}
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
            ${ChatCard.eachOf(card, 10)}
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
              <div class="message message_reverse">
                ${Avatar.compile(messageAvatar)}
                <div class="message__content">
                  <h3 class="message__sender">User Name</h3>
                  <p class="message__text">
                    Why didn't he come and talk to me himself?
                  </p>
                </div>
                <time class="message__time">
                  10:44:45
                </time>
              </div>
              <time class="messages-window__date-separator"
                >thursday, 6 august 2020</time
              >
              <div class="message">
                ${Avatar.compile(messageAvatar)}
                <div class="message__content">
                  <h3 class="message__sender">User Name</h3>
                  <p class="message__text">
                    Why didn't he come and talk to me himself?
                  </p>
                </div>
                <time class="message__time">
                  10:44:45
                </time>
              </div>
            </div>
            <div class="control-panel">
              <form class="control-panel__form">
                <input
                  type="text"
                  class="input control-panel__input"
                  placeholder="Start to write..."
                  onInput="{% handleInput %}"
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

  document
    .querySelector(".page")
    .appendChild(new window.SimpleTemplateEngine(MainPage).getNode(data));
})();
