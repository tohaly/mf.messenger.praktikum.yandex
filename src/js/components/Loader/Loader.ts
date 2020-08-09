import { Block } from '../../util/Block/Block';
import {
  SimpleTemplateEngine,
  objectKeyStringNumber,
} from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const loader = new SimpleTemplateEngine(template);

class Loader extends Block {
  constructor(props: objectKeyStringNumber) {
    super('div', props);
  }

  render(): string {
    const { isLoad } = this.props;
    const className = isLoad ? 'loader_is-active' : ' ';
    return loader.compile({ className });
  }
}

export { Loader };
