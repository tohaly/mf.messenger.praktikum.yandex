import { Block } from "../../util/Block/Block";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine";

import { template } from "./template";

const serverError = new SimpleTemplateEngine(template);

class ServerError extends Block {
  activeClass: string;
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    const { text } = this.props;
    return serverError.compile({
      activeClass: text ? "auth__error_active" : "",
      text,
    });
  }
}

export { ServerError };
