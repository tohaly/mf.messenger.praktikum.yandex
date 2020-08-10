import { Block } from '../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const button = new SimpleTemplateEngine(template);

class Button extends Block {
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    const { text, className, isDisabled } = this.props;
    return button.compile({
      text: text,
      className: className,
      disabled: isDisabled ? 'disabled' : '',
    });
  }
}

export { Button };
