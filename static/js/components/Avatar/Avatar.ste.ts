import { Block } from "../../util/Block/Block.js";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine.js";

import template from "./avatar-template.js";

const avatar = new SimpleTemplateEngine(template);

class Avatar extends Block {
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    return avatar.compile({
      link: this.props.link,
      alt: this.props.alt,
      className: this.props.className,
    });
  }
}

export { Avatar };
