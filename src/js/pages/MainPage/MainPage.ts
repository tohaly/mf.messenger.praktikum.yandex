import { Block } from '../../util/Block/Block';

import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';
import template from './main-page-template';

import { ChatApi } from '../../API/chatApi';
import { AuthApi } from '../../API/authApi';
import { authorization } from '../../authorization';
import { logoutHelper } from '../../util/authHelpers';

import router from '../../router';

import { testMessages } from '../../testMessages';
import { randomNumber } from '../../util/HTTP/randomNumber';

import {
  AVATAR_URL,
  EMPTY_CHATS,
  CHATS_LOAD_ERROR,
  AUTH_ERR_AND_REDIRECT,
  CHAT_CREATING_ERROR,
  PIC_LOAD_ERR,
} from '../../constants';
import AVATAR_MINI from '../../../../static/images/chat-card__img.png';

import { Avatar, ChatCard, Message, Popup, Input, Button, Loader } from '../../components/index';

const mainPage = new SimpleTemplateEngine(template);
const chatApi = new ChatApi();
const authApi = new AuthApi();

class MainPage extends Block {
  inputElement: HTMLInputElement;
  sendButton: HTMLButtonElement;
  popupInputValue: string;
  chats: {}[];
  activeChatId: string;
  chatsCard: NodeListOf<HTMLDivElement>;
  messages: string[];
  userAvatar: string;
  userName: string;
  scrollTopChats: number;
  chatListContainer: HTMLDivElement;

  constructor() {
    super('div', {
      chatCards: null,
      message: new Message({
        avatar: new Avatar({
          link: AVATAR_MINI,
          alt: 'User avatar',
          className: 'message__avatar',
        }),
        text: "Why didn't he come and talk to me himself?",
      }).render(),
      messages: '',
      popup: false,
      isLoad: false,
    });

    this.inputElement;
    this.sendButton;
    this.popupInputValue;

    this.chatsCard;
    this.chats;
    this.activeChatId;

    this.messages = [];

    this.userAvatar;
    this.userName;

    this.chatListContainer;
    this.scrollTopChats;

    this.handleInput = this.handleInput.bind(this);
    this.handleClickSendMessage = this.handleClickSendMessage.bind(this);
    this.handleClickSendMessage = this.handleClickSendMessage.bind(this);
    this.handleGetActiveChat = this.handleGetActiveChat.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleCreateChat = this.handleCreateChat.bind(this);
    this.handleLoadAvatar = this.handleLoadAvatar.bind(this);
    this.handleOnChangePopupInput = this.handleOnChangePopupInput.bind(this);
    this.getUserDataFromServer = this.getUserDataFromServer.bind(this);
  }

  _popupTemplate(isCreateChat: boolean, errorText: string = undefined) {
    const attributes = isCreateChat
      ? `
    type="text"
    placeholder="Chat title"
    minlength="2"
    maxlength="20"
    required
  `
      : `
    type="file"
    required
  `;

    const name = isCreateChat ? 'title' : 'avatar';

    return new Popup({
      titleInput: new Input({
        attributes,
        name,
        className: `popup__input ${isCreateChat ? 'popup__input_create' : 'popup__input_load'}`,
      }).render(),
      buttonSubmit: new Button({
        text: isCreateChat ? 'Create' : 'Load',
        className: `popup__button  ${isCreateChat ? 'popup__button_create' : 'popup__button_load'}`,
        disabled: true,
      }).render(),
      buttonCancel: new Button({
        text: 'Cancel',
        className: 'popup__button popup__button_cancel',
        disabled: false,
      }).render(),
      errorText,
    }).render();
  }

  _placeholderChatTemplate(message: string): string {
    return `<p class="aside-panel__empty">${message}</p>`;
  }

  parseDate(date: Date) {
    return `${date.toLocaleString('ru', {
      hour: 'numeric',
      month: 'long',
      minute: 'numeric',
      day: 'numeric',
    })}, ${date.getFullYear()}`;
  }

  getUserDataFromServer() {
    authApi.getUserInfo().then(({ avatar, display_name }) => {
      this.userAvatar = `${AVATAR_URL}${avatar}`;
      this.userName = display_name;
    });
  }

  initChats(): Promise<void> {
    this.setProps({ isLoad: true });
    return chatApi
      .getChats()
      .then((res) => {
        this.chats = res;
      })
      .then(() => {
        this.setProps({ chatCards: this.getChatCards() });
      })
      .then(() => {
        this.getUserDataFromServer();
      })
      .catch((err) => {
        const { status } = err;

        if (status === 500) {
          router.go('#/error');
        }
        if (status === 401) {
          logoutHelper(authorization);
          router.go('#/signin');
        }

        this.setProps({
          chatCards: this._placeholderChatTemplate(CHATS_LOAD_ERROR),
        });
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });
  }

  _setLoader(isLoad: boolean) {
    return new Loader({ isLoad }).render();
  }

  getChatCards() {
    return this.chats
      .map(({ id, title, avatar }: { [key: string]: string }) => {
        return new ChatCard({
          chatAvatar: new Avatar({
            link: !avatar ? AVATAR_MINI : `${AVATAR_URL}${avatar}`,
            alt: title,
            className: 'chat-card__img',
          }),
          title,
          text: 'Sometime the text will appear here...',
          chatId: id,
          isActiveChat: this.activeChatId == id ? true : false,
        }).render();
      })
      .join('');
  }

  getMessages() {
    const random = randomNumber(0, 16);
    return testMessages
      .map((item, i) => {
        if (i >= random) {
          const isEven = i % 2;

          return new Message({
            avatar: new Avatar({
              link: i % 2 ? this.userAvatar : AVATAR_MINI,
              alt: isEven ? this.userName : 'SuperMegaGiper',
              className: 'message__avatar',
            }).render(),
            text: item,
            time: this.parseDate(new Date()),
            isOwn: isEven ? true : false,
            userName: isEven ? this.userName : 'SuperMegaGiper',
          }).render();
        }
      })
      .join('');
  }

  handleInput() {
    const button = this.sendButton;
    const text = this.inputElement.value;
    const spaces = text.match(/\s*/)[0];
    if (text && text !== spaces) {
      button.classList.add('control-panel__send-button_active');
    } else {
      button.classList.remove('control-panel__send-button_active');
    }
  }

  sendMessage() {
    event.preventDefault();

    const messagesList = this.element.querySelector('.messages-window__list');
    const input = this.inputElement;
    const text = input.value;
    const form = input.parentNode;
    (form as HTMLFormElement).reset();
    this.sendButton.classList.remove('control-panel__send-button_active');

    const message = new Message({
      avatar: new Avatar({
        link: this.userAvatar,
        alt: authorization.login,
        className: 'message__avatar',
      }).render(),
      text,
      time: this.parseDate(new Date()),
      isOwn: true,
      userName: this.userName,
    }).render();

    messagesList.insertAdjacentHTML('beforeend', message.trim());
    messagesList.scrollTop = Math.ceil(messagesList.scrollHeight - messagesList.clientHeight);
  }

  handleClickSendMessage() {
    this.sendMessage();
  }

  handleKeyDownSendMessage(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.sendMessage();
    }
  }

  handleGetPopup(isCreateChat: boolean) {
    this.setProps({ popup: this._popupTemplate(isCreateChat) });
  }

  handleClosePopup() {
    this.setProps({ popup: false });
  }

  handleCreateChat(event: Event) {
    event.preventDefault();

    this.setProps({ isLoad: true });
    chatApi
      .createChat({ title: this.popupInputValue })
      .then(() => {
        this.chats = [
          ...this.chats,
          {
            title: this.popupInputValue,
          },
        ];
      })
      .then(() => {
        this.initChats().then(() => {
          this.setProps({ chatCards: this.getChatCards() });
        });
      })
      .then(() => {
        this.setProps({ popup: false });
      })
      .catch((err) => {
        const { status } = err;

        if (status === 500) {
          router.go('#/error');
        }
        if (status === 401) {
          this.setProps({
            popup: this._popupTemplate(true, AUTH_ERR_AND_REDIRECT),
          });
          setTimeout(() => {
            logoutHelper(authorization);
            router.go('#/signin');
          }, 2000);
          return;
        }
        this.setProps({
          popup: this._popupTemplate(true, CHAT_CREATING_ERROR),
        });
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });
  }

  handleLoadAvatar(event: Event) {
    event.preventDefault();

    const input: HTMLInputElement = this.element.querySelector('.popup__input_load');
    const formData = new FormData();
    formData.append('avatar', input.files[0]);
    formData.append('chatId', this.activeChatId);

    this.setProps({ isLoad: true });
    chatApi
      .avatar(formData)
      .then(() => {
        this.setProps({ chatCards: this.getChatCards() });
      })
      .then(() => this.handleClosePopup())
      .then(() => this.initChats())
      .catch((err) => {
        const { status } = err;

        if (status === 500) {
          router.go('#/error');
        }
        if (status === 401) {
          this.setProps({
            popup: this._popupTemplate(false, AUTH_ERR_AND_REDIRECT),
          });
          setTimeout(() => {
            logoutHelper(authorization);
            router.go('#/signin');
          }, 2000);
          return;
        }
        this.setProps({
          popup: this._popupTemplate(false, PIC_LOAD_ERR),
        });
      })
      .finally(() => {
        this.setProps({ isLoad: false });
      });
  }

  handleOnChangePopupInput(event: Event) {
    this.popupInputValue = (event.target as HTMLInputElement).value;
  }

  handleGetActiveChat(event: Event) {
    const currentElement = event.currentTarget as HTMLDivElement;
    if (currentElement.classList.contains('chat-card')) {
      this.scrollTopChats = this.chatListContainer.scrollTop;
      this.activeChatId = currentElement.dataset.chatid;
      this.setProps({
        chatCards: this.getChatCards(),
        messages: this.getMessages(),
      });
    }
  }

  componentDidMount() {
    document.addEventListener(
      'changeAuthorization',
      () => {
        if (!authorization.login) {
          this.chats = [];
          this.setProps({ messages: '' });
          this.setProps({
            chatCards: '',
          });
        }
      },
      false
    );
    this.initChats();
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const {
        element,
        handleInput,
        handleClickSendMessage,
        props,
        handleGetActiveChat,
        handleGetPopup,
        scrollTopChats,
        handleClosePopup,
        handleCreateChat,
        handleLoadAvatar,
        handleOnChangePopupInput,
      } = this;

      const addChatButton: HTMLButtonElement = element.querySelector('.aside-panel__add');
      const messagesContainer: HTMLDivElement = element.querySelector('.messages-window__list');
      this.chatListContainer = element.querySelector('.aside-panel__card-list');
      this.chatsCard = element.querySelectorAll('.chat-card');
      this.inputElement = element.querySelector('.control-panel__input');
      this.sendButton = element.querySelector('.control-panel__send-button');

      this.inputElement.oninput = handleInput;
      this.sendButton.onclick = handleClickSendMessage;
      this.sendButton.onkeydown = handleClickSendMessage;

      this.chatsCard.forEach((element) => {
        const button: HTMLButtonElement = element.querySelector('.chat-card__img');
        element.onclick = handleGetActiveChat;
        button.onclick = handleGetPopup.bind(this, false);
      });

      messagesContainer.scrollTop = Math.ceil(
        messagesContainer.scrollHeight - messagesContainer.clientHeight
      );
      this.chatListContainer.scrollTop = scrollTopChats;

      //popups

      addChatButton.onclick = handleGetPopup.bind(this, true);

      if (props.popup) {
        const popup = element.querySelector('.popup');
        const popupCancelButton: HTMLButtonElement = popup.querySelector('.popup__button_cancel');
        const submitButton: HTMLButtonElement = popup.querySelector('button');
        const input: HTMLInputElement = popup.querySelector('.popup__input_create');
        popupCancelButton.onclick = handleClosePopup;
        submitButton.onclick = submitButton.classList.contains('popup__button_create')
          ? handleCreateChat
          : handleLoadAvatar;
        input && (input.oninput = handleOnChangePopupInput);
      }
    });
  }

  show() {
    super.show();
    this.initChats();
    this.setProps({ popup: false });
  }

  render(): string {
    const { messages, handleInput, handleClickButton, popup, chatCards, isLoad } = this.props;

    const messagesClassNameStartContainer = messages
      ? ' messages-window__start-container_hidden'
      : ' ';
    const messagesClassNameContainer = messages ? ' ' : 'messages-window__container_hidden';

    return mainPage.compile({
      chatCards: chatCards ? chatCards : this._placeholderChatTemplate(EMPTY_CHATS),
      messages,
      handleInput,
      handleClickButton,
      popup: popup ? popup : ' ',
      messagesClassNameContainer,
      messagesClassNameStartContainer,
      loader: this._setLoader(isLoad),
    });
  }
}

export { MainPage };
