import { Block } from '../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const chatCard = new SimpleTemplateEngine(template);

class ChatCard extends Block {
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    const { chatId, text, title, chatAvatar, isActiveChat } = this.props;
    const activeSelector = isActiveChat ? 'chat-card_active' : ' ';
    return chatCard.compile({
      chatAvatar: chatAvatar.render(),
      activeSelector,
      title,
      text,
      chatId,
    });
  }
}

export { ChatCard };
