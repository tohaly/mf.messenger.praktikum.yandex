import { Block } from '../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const avatar = new SimpleTemplateEngine(template);

class Avatar extends Block {
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    return avatar.compile({
      link: this.props.link,
      alt: this.props.alt,
      className: this.props.className,
    });
  }
}

export { Avatar };
