import { Block } from "../../util/Block/Block.js";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine.js";

import template from "./chat-card-template.js";

const chatCard = new SimpleTemplateEngine(template);

class ChatCard extends Block {
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    return chatCard.compile({
      activateHandle: this.props.activateHandle,
      Avatar: this.props.Avatar.render(),
      title: this.props.title,
      text: this.props.text,
    });
  }
}

export { ChatCard };
