import { Block } from '../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const serverMessage = new SimpleTemplateEngine(template);

class ServerMessage extends Block {
  ERR_CLASS_NAME = 'auth__server-message_show_err';
  MESSAGE_CLASS_NAME = 'auth__server-message_show_message';
  activeClass: string;
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    const { text, isError } = this.props;
    const activeClass = text ? (isError ? this.ERR_CLASS_NAME : this.MESSAGE_CLASS_NAME) : ' ';
    return serverMessage.compile({
      activeClass,
      text,
    });
  }
}

export { ServerMessage };
