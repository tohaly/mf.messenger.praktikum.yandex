import { Block, propsObject } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const message = new SimpleTemplateEngine(template);

class Message extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { avatar, text, time, isOwn, userName } = this.props;
    const className = isOwn ? 'message_reverse' : ' ';

    return message.compile({
      avatar,
      text,
      time,
      className,
      userName,
    });
  }
}

export { Message };
