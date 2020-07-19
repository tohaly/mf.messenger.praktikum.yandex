import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine, } from '../../util/Simple-template-engine/simple-template-engine.js';
import { template } from './template.js';
const message = new SimpleTemplateEngine(template);
class Message extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return message.compile({
            avatar: this.props.avatar.render(),
            text: this.props.text,
        });
    }
}
export { Message };
