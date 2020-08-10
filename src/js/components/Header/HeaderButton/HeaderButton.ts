import { Block } from '../../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const button = new SimpleTemplateEngine(template);

class Button extends Block {
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    return button.compile({
      text: this.props.text,
      className: this.props.className,
    });
  }
}

export { Button };
