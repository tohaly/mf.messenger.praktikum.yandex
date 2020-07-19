import { Block } from "../../util/Block/Block";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine";

import { template } from "./template";

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
    });
  }
}

export { Input };
