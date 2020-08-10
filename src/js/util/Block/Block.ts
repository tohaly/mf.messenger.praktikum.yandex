import { EventBus, IEventBus } from '../Event-bus/Event-bus';

type propsObject = {
  [key: string]: any;
};

interface IBlock {
  EVENTS: { [key: string]: string };
  _element: HTMLElement;
  _meta: { tagName: string; props: propsObject };
  props: propsObject;
  lastActiveElement: Element;
  eventBus(): IEventBus;

  _registerEvents(eventBus: IEventBus): void;
  _createResources(): void;
  init(): void;
  _componentDidMount(): void;
  componentDidMount(): void;
  _componentDidUpdate(oldProps: propsObject, newProps: propsObject): void;
  componentDidUpdate(): boolean;
  setProps(nextProps: propsObject): void;
  _render(): void;
  render(): string;
  getContent(): Element;
  _makePropsProxy(props: propsObject): propsObject;
  _createDocumentElement(tagName: string): HTMLElement;
  show(): void;
  hide(): void;
}

class Block implements IBlock {
  EVENTS: { [key: string]: string } = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement = null;
  lastActiveElement: Element;
  _meta: { tagName: string; props: propsObject } = null;

  props: propsObject;
  eventBus: () => IEventBus;

  constructor(tagName = 'div', props: propsObject = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.lastActiveElement;

    this.eventBus = (): IEventBus => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(this.EVENTS.INIT);
    this.setProps = this.setProps.bind(this);
  }

  _registerEvents(eventBus: IEventBus): void {
    eventBus.on(this.EVENTS.INIT, this.init.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(this.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(this.EVENTS.FLOW_RENDER);
  }

  componentDidMount(): void {}

  _componentDidUpdate(oldProps: propsObject, newProps: propsObject): void {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
    this.eventBus().emit(this.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(): boolean {
    return true;
  }

  setProps = (nextProps: propsObject): void => {
    if (!nextProps) {
      return;
    }
    this.lastActiveElement = document.activeElement;
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render(): void {
    const block = this.render();
    this._element.innerHTML = block;
    this._setLastFocusInput();
  }

  render(): any {}

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy = (props: propsObject): propsObject => {
    return new Proxy(props, {
      get(target: propsObject, prop: string | number) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target: any, prop: string | number, value: string): boolean => {
        target[prop] = value;
        this.eventBus().emit(this.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  };

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  _setLastFocusInput() {
    const element = this.lastActiveElement;
    if (element && element.tagName === 'INPUT') {
      const className = element.classList[2];
      (document.querySelector(`.${className}`) as HTMLInputElement).focus();
    }
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}

export { Block, IBlock, propsObject };
