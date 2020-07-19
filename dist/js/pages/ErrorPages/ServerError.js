import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/Simple-template-engine.js';
import { template } from './error-template.js';
const templateEngine = new SimpleTemplateEngine(template);
class ServerError extends Block {
    constructor() {
        super("div");
    }
    render() {
        return templateEngine.compile({
            errorCode: "Error 500",
            errorTitle: "Problems with server",
        });
    }
}
export { ServerError };
