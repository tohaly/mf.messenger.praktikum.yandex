import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine.js';
import { range } from '../../util/range.js';
import { Avatar, ChatCard, Message } from '../../components/index.js';
import template from './main-page-template.js';
const mainPage = new SimpleTemplateEngine(template);
const data = {
    chatCards: range(10).map(() => new ChatCard({
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
    })),
    message: new Message({
        avatar: new Avatar({
            link: "./images/chat-card__img.png",
            alt: "User avatar",
            className: "message__avatar",
        }),
        text: "Why didn't he come and talk to me himself?",
    }),
};
class MainPage extends Block {
    constructor() {
        super("div", data);
        this.inputElement;
        this.sendButton;
    }
    handleInput() {
        const button = this.sendButton;
        const text = this.inputElement.value;
        const spaces = text.match(/\s*/)[0];
        if (text && text !== spaces) {
            button.classList.add("control-panel__send-button_active");
        }
        else {
            button.classList.remove("control-panel__send-button_active");
        }
    }
    handleSendMessage() {
        event.preventDefault();
        const input = this.inputElement;
        const form = input.parentNode;
        console.log(input.value);
        form.reset();
        this.sendButton.classList.remove("control-panel__send-button_active");
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const { element, handleInput, handleSendMessage } = this;
            this.inputElement = element.querySelector(".control-panel__input");
            this.sendButton = element.querySelector(".control-panel__send-button");
            this.inputElement.oninput = handleInput.bind(this);
            this.sendButton.onclick = handleSendMessage.bind(this);
        });
    }
    render() {
        return mainPage.compile({
            chatCards: this.props.chatCards
                .map((item) => item.render())
                .join(""),
            message: this.props.message.render(),
            handleInput: this.props.handleInput,
            handleClickButton: this.props.handleClickButton,
        });
    }
}
export { MainPage };
