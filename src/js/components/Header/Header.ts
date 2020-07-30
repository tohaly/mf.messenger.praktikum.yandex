import { Block } from "../../util/Block/Block";
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from "../../util/Simple-template-engine/simple-template-engine";

import { template } from "./template";

const tmplButton = new SimpleTemplateEngine(template);

class Header extends Block {
  constructor(props: objectKeyStringNumber) {
    super("div", props);
  }

  render(): string {
    return tmplButton.compile({
      buttons: this.props.buttons,
    });
  }
}

export { Header };
