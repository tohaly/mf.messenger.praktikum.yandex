import { Block } from "../../util/Block/Block.js";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine.js";

import template from "./input-template.js";

const input = new SimpleTemplateEngine(template);

class Input extends Block {
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    return input.compile({
      attributes: this.props.attributes,
      name: this.props.name,
      className: this.props.className,
      handleFocus: this.props.handleFocus,
      handleBlur: this.props.handleBlur,
    });
  }
}

export { Input };
