import { Block } from "../../util/Block/Block";
import { SimpleTemplateEngine } from "../../util/Simple-template-engine/Simple-template-engine";

import { template } from "./error-template";

const templateEngine = new SimpleTemplateEngine(template);

class NotFound extends Block {
  constructor() {
    super("div");
  }

  render(): string {
    return templateEngine.compile({
      errorCode: "Error 404",
      errorTitle: "Not found",
    });
  }
}

export { NotFound };
