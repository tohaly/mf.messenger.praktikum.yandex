import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine, } from '../../util/Simple-template-engine/simple-template-engine.js';
import { template } from './template.js';
const input = new SimpleTemplateEngine(template);
class Input extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return input.compile({
            attributes: this.props.attributes,
            name: this.props.name,
            className: this.props.className,
        });
    }
}
export { Input };
