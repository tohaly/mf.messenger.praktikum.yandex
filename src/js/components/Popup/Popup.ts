import { Block, propsObject } from '../../util/Block/Block';
import { ServerMessage } from '../index';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine';

import { template } from './template';

const popup = new SimpleTemplateEngine(template);

class Popup extends Block {
  constructor(props: propsObject) {
    super('div', props);
  }

  render(): string {
    const { titleInput, buttonSubmit, buttonCancel, errorText = '' } = this.props;

    return popup.compile({
      titleInput,
      buttonSubmit,
      buttonCancel,
      serverError: new ServerMessage({
        text: errorText,
        isError: true,
      }).render(),
    });
  }
}

export { Popup };
