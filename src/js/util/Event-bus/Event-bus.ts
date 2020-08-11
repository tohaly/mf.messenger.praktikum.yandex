import { propsObject } from '../Block/Block';

interface IEventBus {
  listeners: { [key: string]: Function[] };
  _setError(event: string): void;
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
  emit(event: string, ...args: propsObject[]): void;
}

class EventBus implements IEventBus {
  listeners: { [key: string]: Function[] };
  constructor() {
    this.listeners = {};
  }

  _setError(event: string) {
    if (!this.listeners[event]) {
      throw new Error(`Event does not exist: ${event}`);
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    this._setError(event);
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: propsObject[]) {
    this._setError(event);
    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

export { EventBus, IEventBus };
