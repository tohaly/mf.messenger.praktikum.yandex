import { Block } from '../../util/Block/Block.js';
import { SimpleTemplateEngine } from '../../util/Simple-template-engine/simple-template-engine.js';
import { passwordValidator, simpleTextValidator } from '../../util/validators.js';
import router from '../../router.js';
import template from './signin-template.js';
import { Title, Input, Button } from '../../components/index.js';
import { Form } from '../../form.js';
import { InputValidate, } from '../../components/Input/InputValidate.js';
const signinPageTemplate = new SimpleTemplateEngine(template);
let form;
let validate = [];
const inputsProps = [
    {
        attributes: `
        type="text"
        placeholder="login" 
        minlength="2"
        maxlength="20"
        required
      `,
        name: "login",
        handleBlur: simpleTextValidator,
    },
    {
        attributes: `
        type="password" 
        placeholder="password" 
        pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*"
        minlength="8"
        autocomplete="on"
        required
      `,
        name: "password",
        handleBlur: passwordValidator,
    },
];
const data = {
    title: new Title({ text: "Signin" }),
    inputs: inputsProps.map((item) => {
        validate.push(new InputValidate(item.handleBlur));
        return new Input({
            attributes: item.attributes,
            name: item.name,
            className: "auth__input",
        });
    }),
    button: new Button({
        text: "Signin",
        className: "button auth__button",
    }),
    altText: "don't have an account?",
};
class SigninPage extends Block {
    constructor() {
        super("div", data);
    }
    getFormData() {
        event.preventDefault();
        console.log(form.getData());
    }
    goSignup() {
        event.preventDefault();
        router.go("#/signup");
    }
    componentDidMount() {
        this.eventBus().on(this.EVENTS.FLOW_RENDER, () => {
            const { element } = this;
            const formContainer = element.querySelector("form");
            const formButton = element.querySelector(".auth__button");
            const inputs = element.querySelectorAll(".input");
            const altButton = element.querySelector(".auth__link_signin");
            form = new Form(formContainer, formButton);
            inputs.forEach((input, i) => {
                input.onfocus = validate[i].handleFocus;
                input.onblur = validate[i].handleBlur;
            });
            formContainer.oninput = form.formIsValid;
            formButton.onclick = this.getFormData;
            altButton.onclick = this.goSignup;
        });
    }
    render() {
        return signinPageTemplate.compile({
            title: this.props.title.render(),
            inputs: this.props.inputs.map((item) => item.render()).join(""),
            button: this.props.button.render(),
            altText: this.props.altText,
        });
    }
}
export { SigninPage };
