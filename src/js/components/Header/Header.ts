import { Block } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';
import router from '../../router';
import { authorization } from '../../authorization';
import { logoutHelper } from '../../util/authHelpers';
import { AuthApi } from '../../API/authApi';

import { Button } from './HeaderButton/HeaderButton';
import { template } from './template';

const tmplButton = new SimpleTemplateEngine(template);

class Header extends Block {
  constructor() {
    super('div', {
      buttons: null,
    });
  }

  logout() {
    const auth = new AuthApi();
    auth
      .logout()
      .then(() => {
        logoutHelper(authorization);
      })
      .then(() => {
        router.go('#/signin');
      })
      .catch(() => {
        router.go('#/error');
      });
  }

  headerClickEvents(event: Event): void {
    event.preventDefault();
    const reg = /header__button_(.*)/gi;
    const result = reg.exec((<HTMLElement>event.target).classList[2]);
    const path = result[1];
    if (path === 'logout') {
      this.logout();
      return;
    }
    router.go(`#/${path}`);
  }

  headerLogoClickHeader(): void {
    router.go('#/');
  }

  setButtons() {
    if (authorization.login) {
      this.setProps({
        buttons: [
          new Button({
            text: 'Settings',
            className: 'header__button_settings',
          }),
          new Button({
            text: `${authorization.login} ❌`,
            className: 'header__button_logout',
          }),
        ]
          .map((item) => item.render())
          .join(''),
      });
      return;
    }
    this.setProps({
      buttons: [
        new Button({
          text: 'Signin',
          className: 'header__button_signin',
        }),
        new Button({
          text: 'Signup',
          className: 'header__button_signup',
        }),
      ]
        .map((item) => item.render())
        .join(''),
    });
  }

  componentDidMount() {
    this.setButtons();
    document.addEventListener(
      'changeAuthorization',
      () => {
        this.setButtons();
      },
      false
    );

    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const menuBatons = this.element.querySelectorAll('.header__button');
      menuBatons.forEach((element) => {
        (element as HTMLElement).onclick = this.headerClickEvents.bind(this);
      });

      (this.element.querySelector(
        '.header__logo-link'
      ) as HTMLDivElement).onclick = this.headerLogoClickHeader;
    });
  }

  render(): string {
    const { buttons } = this.props;
    return tmplButton.compile({
      buttons,
    });
  }
}

export { Header };
