import { Block } from '../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const title = new SimpleTemplateEngine(template);

class Title extends Block {
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    return title.compile({
      className: this.props.className,
      text: this.props.text,
    });
  }
}

export { Title };
