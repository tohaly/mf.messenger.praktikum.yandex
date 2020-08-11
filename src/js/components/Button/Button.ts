import { Block, propsObject } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const button = new SimpleTemplateEngine(template);

class Button extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { text, className, isDisabled } = this.props;

    return button.compile({
      text,
      className,
      disabled: isDisabled ? 'disabled' : '',
    });
  }
}

export { Button };
