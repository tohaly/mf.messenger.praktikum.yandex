import { Block } from "../../util/Block/Block.js";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine.js";

import template from "./message-template.js";

const message = new SimpleTemplateEngine(template);

class Message extends Block {
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    return message.compile({
      avatar: this.props.avatar.render(),
      text: this.props.text,
    });
  }
}

export { Message };
