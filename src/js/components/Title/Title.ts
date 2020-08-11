import { Block, propsObject } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const title = new SimpleTemplateEngine(template);

class Title extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { className, text } = this.props;

    return title.compile({ className, text });
  }
}

export { Title };
