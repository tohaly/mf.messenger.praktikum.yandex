import { Block, propsObject } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const avatar = new SimpleTemplateEngine(template);

class Avatar extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { link, alt, className } = this.props;

    return avatar.compile({
      link,
      alt,
      className,
    });
  }
}

export { Avatar };
