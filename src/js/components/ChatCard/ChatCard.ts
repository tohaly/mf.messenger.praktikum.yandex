import { Block, propsObject } from '../../util/Block/Block';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const chatCard = new SimpleTemplateEngine(template);

class ChatCard extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { chatId, text, title, chatAvatar, isActiveChat } = this.props;
    const activeSelector = isActiveChat ? 'chat-card_active' : ' ';
    return chatCard.compile({
      chatAvatar,
      activeSelector,
      title,
      text,
      chatId,
    });
  }
}

export { ChatCard };
