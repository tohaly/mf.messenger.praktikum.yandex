import { Block } from "../../util/Block/Block.js";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine.js";

import template from "./button-template.js";

const button = new SimpleTemplateEngine(template);

class Button extends Block {
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    return button.compile({
      text: this.props.text,
      handleClick: this.props.handleClick,
      className: this.props.className,
    });
  }
}

export { Button };
