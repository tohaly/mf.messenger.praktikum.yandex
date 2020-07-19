import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine.js';
import router from '../../router.js';
import { Button } from '../Header/HeaderButton/HeaderButton.js';
import { Header } from '../Header/Header.js';
const template = `
  {% header %}
  <main id="main-content"></main>
`;
const appTemplate = new SimpleTemplateEngine(template);
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
    constructor(props) {
        super("div", props);
    }
    headerClickEvents(event) {
        event.preventDefault();
        const reg = /header__button_(.*)/gi;
        const result = reg.exec(event.target.classList[2]);
        let path = result[1];
        if (path === "main") {
            path = "";
        }
        router.go(`#/${path}`);
    }
    headerLogoClickHeader() {
        router.go("#/");
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const menuBatons = this.element.querySelectorAll(".header__button");
            menuBatons.forEach((element) => {
                element.onclick = this.headerClickEvents;
            });
            this.element.querySelector(".header__logo-link").onclick = this.headerLogoClickHeader;
        });
    }
    render() {
        return appTemplate.compile({
            header: this.props.header.render(),
        });
    }
}
const app = new App(data);
export { app };
