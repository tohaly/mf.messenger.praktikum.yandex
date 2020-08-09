import { Block } from '../../util/Block/Block';

import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';
import { template } from './error-template';

import router from '../../router';

const templateEngine = new SimpleTemplateEngine(template);

class NotFound extends Block {
  constructor() {
    super('div');
  }

  goMain() {
    router.go('#/');
  }

  componentDidMount() {
    this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
      const link: HTMLLinkElement = this.element.querySelector('.error__link');
      link.onclick = this.goMain.bind(this);
    });
  }

  render(): string {
    return templateEngine.compile({
      errorCode: 'Error 404',
      errorTitle: 'Not found',
    });
  }
}

export { NotFound };
