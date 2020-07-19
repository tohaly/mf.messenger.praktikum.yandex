import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine, } from '../../util/Simple-template-engine/simple-template-engine.js';
import { template } from './template.js';
const chatCard = new SimpleTemplateEngine(template);
class ChatCard extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return chatCard.compile({
            activateHandle: this.props.activateHandle,
            Avatar: this.props.Avatar.render(),
            title: this.props.title,
            text: this.props.text,
        });
    }
}
export { ChatCard };
