import { propsObject } from '../Block/Block';

interface ISimpleTemplateEngine {
  _TEMPLATE_REGEXP: RegExp;
  _REGEXP_CTX: RegExp;
  _template: string;

  compile(ctx?: objectKeyString, className?: string): string;
  _compileTemplate(ctx?: objectKeyString): string;
  get(obj: propsObject, path: string, defaultValue?: string): string | number | boolean;
  getNode(ctx: objectKeyString): ChildNode | HTMLElement;
}

interface Window {
  [key: string]: Function;
}

class SimpleTemplateEngine implements ISimpleTemplateEngine {
  _TEMPLATE_REGEXP = /\{\%(.*?)\%\}/gi;
  _REGEXP_CTX = /\(\)\(\%(.*?)\%\)/gi;
  _template: string;

  constructor(template: string) {
    this._template = template;
  }

  compile(ctx?: propsObject): string {
    const html = this._compileTemplate(ctx);
    return html;
  }

  _compileTemplate(ctx: propsObject) {
    let tmpl = this._template;
    let key: string | RegExpExecArray = null;
    const regExp = this._TEMPLATE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue: string = key[1].trim();
        const data = String(this.get(ctx, tmplValue));
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
      }
      continue;
    }
    return tmpl;
  }

  get(obj: propsObject, path: string, defaultValue?: string): string | number | boolean {
    const keys = path.split('.');
    let result;

    for (const key of keys) {
      const value = obj[key];

      if (!value) {
        return 'Prop is not find';
      }
      result = value;
    }
    return result || defaultValue;
  }

  getNode(ctx?: propsObject): HTMLElement {
    const element: HTMLElement = document.createElement('div');

    element.insertAdjacentHTML('beforeend', this.compile(ctx).trim());

    return element.firstChild as HTMLElement;
  }
}

export { SimpleTemplateEngine };
