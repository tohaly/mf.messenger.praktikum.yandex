import { Block } from "../../util/Block/Block.js";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine.js";

import router from "../../router.js";

import { Button } from "../Header/HeaderButton/ButtonHeader.js";
import { Header } from "../Header/Header.ste.js";

const template: string = `
  {% header %}
  <main id="main-content"></main>
`;

const appTemplate = new SimpleTemplateEngine(template);

const headerClickEvents = (event: Event): void => {
  if ((<HTMLButtonElement>event.target).classList.contains("header__button")) {
    event.preventDefault();
    const reg = /header__button_(.*)/gi;
    const result = reg.exec((<HTMLElement>event.target).classList[2]);
    let path = result[1];
    if (path === "main") {
      path = "";
    }
    router.go(`#/${path}`);
  }

  if (
    (<HTMLButtonElement>event.target).classList.contains("header__logo-link")
  ) {
    event.preventDefault();
    router.go(`#/`);
  }
};

const buttons = [
  new Button({
    text: "Main",
    className: "header__button_main",
  }),
  new Button({
    text: "Signin",
    className: "header__button_signin",
  }),
  new Button({
    text: "Signup",
    className: "header__button_signup",
  }),
  new Button({
    text: "Settings",
    className: "header__button_settings",
  }),
];

const data = {
  header: new Header({
    buttons: buttons.map((item) => item.render()).join(""),
  }),
};

class App extends Block {
  constructor(props: any) {
    super("div", props);
  }

  componentDidMount() {
    this.element.addEventListener("click", headerClickEvents);

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {});
  }

  render(): string {
    return appTemplate.compile({
      header: this.props.header.render(),
    });
  }
}

const app = new App(data);

export { app };
