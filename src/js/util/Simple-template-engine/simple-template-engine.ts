type objectKeyStringNumber = {
  [key: string]: any;
};

interface ISimpleTemplateEngine {
  _TEMPLATE_REGEXP: RegExp;
  _REGEXP_CTX: RegExp;
  _template: string;

  compile(ctx?: objectKeyStringNumber, className?: string): string;
  _compileTemplate(ctx?: objectKeyStringNumber): string;
  get(
    obj: objectKeyStringNumber,
    path: string,
    defaultValue?: string | boolean | Function
  ): string | boolean | Function;
  getNode(ctx: objectKeyStringNumber): ChildNode | HTMLElement;
}

class SimpleTemplateEngine implements ISimpleTemplateEngine {
  _TEMPLATE_REGEXP = /\{\%(.*?)\%\}/gi;
  _REGEXP_CTX = /\(\)\(\%(.*?)\%\)/gi;
  _template: string;

  constructor(template: string) {
    this._template = template;
  }

  compile(ctx?: objectKeyStringNumber): string {
    const html = this._compileTemplate(ctx);
    return html;
  }

  _compileTemplate(ctx: objectKeyStringNumber) {
    let tmpl = this._template;
    let key = null;
    const regExp = this._TEMPLATE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue: any = key[1].trim();
        const data: any = this.get(ctx, tmplValue);
        if (typeof data === 'function') {
          window[tmplValue] = data;
          tmpl = tmpl.replace(new RegExp(key[0], 'gi'), `window.${tmplValue}()`);

          const keyCtx = this._REGEXP_CTX.exec(tmpl);
          if (keyCtx) {
            tmpl = tmpl.replace(keyCtx[0], `.${keyCtx[1].trim()}()`);
          }
        }
        tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
      }
      continue;
    }
    return tmpl;
  }

  get(
    obj: objectKeyStringNumber,
    path: string,
    defaultValue?: string | boolean | Function
  ): string | boolean | Function {
    const keys = path.split('.');
    let result: any = obj;
    for (const key of keys) {
      const value = result[key];

      if (!value) {
        return defaultValue;
      }
      result = value;
    }
    return result || defaultValue;
  }

  getNode(ctx?: objectKeyStringNumber): HTMLElement {
    const element: HTMLElement = document.createElement('div');

    element.insertAdjacentHTML('beforeend', this.compile(ctx).trim());

    return element.firstChild as HTMLElement;
  }
}

export { SimpleTemplateEngine, objectKeyStringNumber };
