import { EventBus } from "../Event-bus/Event-bus.js";
class Block {
    constructor(tagName = "div", props = {}) {
        this.EVENTS = {
            INIT: "init",
            FLOW_CDM: "flow:component-did-mount",
            FLOW_CDU: "flow:component-did-update",
            FLOW_RENDER: "flow:render",
        };
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
        this._makePropsProxy = (props) => {
            return new Proxy(props, {
                get(target, prop) {
                    const value = target[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                },
                set: (target, prop, value) => {
                    target[prop] = value;
                    this.eventBus().emit(this.EVENTS.FLOW_CDU, Object.assign({}, target), target);
                    return true;
                },
                deleteProperty() {
                    throw new Error("No access");
                },
            });
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(this.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(this.EVENTS.INIT, this.init.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }
    init() {
        this._createResources();
        this.eventBus().emit(this.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(this.EVENTS.FLOW_RENDER);
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }
    componentDidUpdate(oldProps, newProps) {
        return true;
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        this._element.innerHTML = block;
    }
    render() {
        return "";
    }
    getContent() {
        return this.element;
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = "block";
    }
    hide() {
        this.getContent().style.display = "none";
    }
}
export { Block };
