import { Block, IBlock } from "../../util/Block/Block.js";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine.js";
import { range } from "../../util/range.js";

import { Avatar } from "../../components/Avatar/Avatar.ste.js";
import { ChatCard } from "../../components/ChatCard/ChatCard.ste.js";
import { Message } from "../../components/Message/Message.ste.js";

import template from "./main-page-template.js";

const mainPage = new SimpleTemplateEngine(template);

const data = {
  chatCards: range(10).map(
    () =>
      new ChatCard({
        activateHandle() {
          console.log("active");
        },
        Avatar: new Avatar({
          link: "./images/chat-card__img.png",
          alt: "User avatar",
          className: "chat-card__img",
        }),
        title: "Title",
        text: "Sorry, its just that I get very ne...",
      })
  ),
  message: new Message({
    avatar: new Avatar({
      link: "./images/chat-card__img.png",
      alt: "User avatar",
      className: "message__avatar",
    }),
    text: "Why didn't he come and talk to me himself?",
  }),
  handleInput: (element: HTMLInputElement) => {
    const button = element.nextElementSibling;
    const text = element.value;
    const spaces = text.match(/\s*/)[0];

    if (element.value && element.value !== spaces) {
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

class MainPage extends Block {
  constructor() {
    super("div", data);
  }

  render(): string {
    return mainPage.compile({
      chatCards: this.props.chatCards
        .map((item: IBlock) => item.render())
        .join(""),
      message: this.props.message.render(),
      handleInput: this.props.handleInput,
      handleClickButton: this.props.handleClickButton,
    });
  }
}

export { MainPage };
