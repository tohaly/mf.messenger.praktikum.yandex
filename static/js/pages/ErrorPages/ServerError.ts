import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/Simple-template-engine";

import { template } from "./error-template";

const templateEngine = new SimpleTemplateEngine(template);

class ServerError extends Block {
  constructor() {
    super("div");
  }

  render(): string {
    return templateEngine.compile({
      errorCode: "Error 500",
      errorTitle: "Problems with server",
    });
  }
}

export { ServerError };
