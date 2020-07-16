// (function () {
//   const Block = window.Block;

//   const range = window.range;

//   const Header = window.Header;
//   const Avatar = window.Avatar;
//   const ChatCard = window.ChatCard;
//   const Message = window.Message;

//   const template = window.mainPageTemplate;
//   const mainPage = new window.SimpleTemplateEngine(template);

//   const data = {
//     header: new Header(),
//     chatCards: range(10).map(
//       () =>
//         new ChatCard({
//           activateHandle() {
//             console.log("active");
//           },
//           Avatar: new Avatar({
//             link: "./images/chat-card__img.png",
//             alt: "User avatar",
//             className: "chat-card__img",
//           }),
//           title: "Title",
//           text: "Sorry, its just that I get very ne...",
//         })
//     ),
//     message: new Message({
//       avatar: new Avatar({
//         link: "./images/chat-card__img.png",
//         alt: "User avatar",
//         className: "message__avatar",
//       }),
//       text: "Why didn't he come and talk to me himself?",
//     }),
//     handleInput: (element: HTMLInputElement) => {
//       const button = element.nextElementSibling;
//       const text = element.value;
//       const spaces = text.match(/\s*/)[0];

//       if (element.value && element.value !== spaces) {
//         button.classList.add("control-panel__send-button_active");
//       } else {
//         button.classList.remove("control-panel__send-button_active");
//       }
//     },
//     handleClickButton() {
//       event.preventDefault();
//       const input = this.previousElementSibling;
//       const form = input.parentNode;
//       console.log(input.value);
//       form.reset();
//       this.classList.remove("control-panel__send-button_active");
//     },
//   };

//   class MainPage extends Block {
//     constructor() {
//       super("div", data);
//     }

//     render(): string {
//       return mainPage.compile({
//         header: this.props.header.render(),
//         chatCards: this.props.chatCards
//           .map((item: IChatCard) => item.render())
//           .join(""),
//         message: this.props.message.render(),
//         handleInput: this.props.handleInput,
//         handleClickButton: this.props.handleClickButton,
//       });
//     }
//   }

//   window.MainPage = MainPage;
// })();
