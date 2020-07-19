import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine, } from '../../util/Simple-template-engine/simple-template-engine.js';
import { template } from './template.js';
const tmplButton = new SimpleTemplateEngine(template);
class Header extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return tmplButton.compile({
            buttons: this.props.buttons,
        });
    }
}
export { Header };
