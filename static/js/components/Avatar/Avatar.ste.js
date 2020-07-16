import { Block } from "../../util/Block/Block.js";
import { SimpleTemplateEngine, } from "../../util/Simple-template-engine/simple-template-engine.js";
import template from "./avatar-template.js";
const avatar = new SimpleTemplateEngine(template);
class Avatar extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return avatar.compile({
            link: this.props.link,
            alt: this.props.alt,
            className: this.props.className,
        });
    }
}
export { Avatar };
