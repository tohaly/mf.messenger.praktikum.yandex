import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine, } from '../../util/Simple-template-engine/simple-template-engine.js';
import { template } from './template.js';
const title = new SimpleTemplateEngine(template);
class Title extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return title.compile({
            className: this.props.className,
            text: this.props.text,
        });
    }
}
export { Title };
