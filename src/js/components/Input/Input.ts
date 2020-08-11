import { Block, propsObject } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const input = new SimpleTemplateEngine(template);

class Input extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { attributes, name, className = '', value = ' ' } = this.props;
    return input.compile({
      attributes,
      name,
      value,
      className,
    });
  }
}

export { Input };
