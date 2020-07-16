import { Block } from "../../util/Block/Block.js";
import { SimpleTemplateEngine, } from "../../util/Simple-template-engine/simple-template-engine.js";
import template from "./button-template.js";
const button = new SimpleTemplateEngine(template);
class Button extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return button.compile({
            text: this.props.text,
            handleClick: this.props.handleClick,
            className: this.props.className,
        });
    }
}
export { Button };
