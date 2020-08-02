import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/simple-template-engine";
import router from "../../router";
import { isLogin } from "../../util/isLogin";
import { auth } from "../../../index";

import { Button } from "./HeaderButton/HeaderButton";
import { template } from "./template";

const tmplButton = new SimpleTemplateEngine(template);

const buttonsLogout = [
  new Button({
    text: "Signin",
    className: "header__button_signin",
  }),
  new Button({
    text: "Signup",
    className: "header__button_signup",
  }),
];

const buttonsLogin = [
  new Button({
    text: "Settings",
    className: "header__button_settings",
  }),
  new Button({
    text: `${localStorage.getItem("login")} ❌`,
    className: "header__button_logout",
  }),
];

const initButtons = isLogin() ? buttonsLogin : buttonsLogout;

class Header extends Block {
  constructor() {
    super("div", {
      buttons: initButtons.map((item) => item.render()).join(""),
    });
  }

  logout() {
    auth
      .logout()
      .then(() => {
        localStorage.removeItem("login");
      })
      .then(() => {
        router.go("#/signin");
      })
      .catch(() => {
        router.go("#/error");
      });
  }

  headerClickEvents(event: Event): void {
    event.preventDefault();
    const reg = /header__button_(.*)/gi;
    const result = reg.exec((<HTMLElement>event.target).classList[2]);
    let path = result[1];
    if (path === "logout") {
      this.logout();
      return;
    }
    router.go(`#/${path}`);
  }

  headerLogoClickHeader(): void {
    router.go("#/");
  }

  componentDidMount() {
    document.addEventListener(
      "changeLocalStorage",
      () => {
        const buttonsLogin = [
          new Button({
            text: "Settings",
            className: "header__button_settings",
          }),
          new Button({
            text: `${localStorage.getItem("login")} ❌`,
            className: "header__button_logout",
          }),
        ];
        const buttons = isLogin() ? buttonsLogin : buttonsLogout;
        this.setProps({
          buttons: buttons.map((item) => item.render()).join(""),
        });
      },
      false
    );

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const menuBatons = this.element.querySelectorAll(".header__button");
      menuBatons.forEach((element) => {
        (element as HTMLElement).onclick = this.headerClickEvents.bind(this);
      });

      (this.element.querySelector(
        ".header__logo-link"
      ) as HTMLDivElement).onclick = this.headerLogoClickHeader;
    });
  }

  render(): string {
    const { buttons, loginName } = this.props;
    return tmplButton.compile({
      buttons,
    });
  }
}

export { Header };
