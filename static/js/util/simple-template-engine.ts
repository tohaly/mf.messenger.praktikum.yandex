type objectKeyStringNumber = {
  [key: string]:
    | string
    | objectKeyStringNumber
    | Function
    | objectKeyStringNumber[];
};

interface ISimpleTemplateEngine {
  _TEMPLATE_REGEXP: RegExp;
  _REGEXP_CTX: RegExp;
  _template: string;

  compile(ctx?: objectKeyStringNumber, className?: string): string;
  addClassName(tmpl: string, className?: string): string;
  _compileTemplate(ctx?: objectKeyStringNumber): string;
  get(
    obj: objectKeyStringNumber,
    path: string,
    defaultValue?: string | boolean | Function
  ): string | boolean | Function;
  getNode(
    ctx: objectKeyStringNumber,
    className?: string
  ): ChildNode | HTMLElement;
  eachOf(ctx: objectKeyStringNumber, length: number): string;
}

interface Window {
  SimpleTemplateEngine: new (template: string) => ISimpleTemplateEngine;
}

(function () {
  class SimpleTemplateEngine implements ISimpleTemplateEngine {
    _TEMPLATE_REGEXP: RegExp = /\{\%(.*?)\%\}/gi;
    _REGEXP_CTX: RegExp = /\(\)\(\%(.*?)\%\)/gi;
    _template: string;

    constructor(template: string) {
      this._template = template;
    }

    compile(ctx: objectKeyStringNumber, className?: string): string {
      let html = this._compileTemplate(ctx);
      if (className) {
        html = this.addClassName(html, className);
      }
      return html;
    }

    addClassName(tmpl: string, className?: string): string {
      const rexp: RegExp = /\<.{1,}\s+class="/i;
      const matches = tmpl.match(rexp);

      return matches ? tmpl.replace(rexp, `${matches[0]}${className} `) : "";
    }

    _compileTemplate(ctx: objectKeyStringNumber) {
      let tmpl = this._template;
      let key = null;
      const regExp = this._TEMPLATE_REGEXP;

      while ((key = regExp.exec(tmpl))) {
        if (key[1]) {
          const tmplValue: any = key[1].trim();
          const data: any = this.get(ctx, tmplValue);

          if (typeof data === "function") {
            window[tmplValue] = data;
            tmpl = tmpl.replace(
              new RegExp(key[0], "gi"),
              `window.${key[1].trim()}()`
            );

            const keyCtx = this._REGEXP_CTX.exec(tmpl);
            if (keyCtx) {
              tmpl = tmpl.replace(keyCtx[0], `.${keyCtx[1].trim()}()`);
            }
            continue;
          }
          tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
        }
      }
      return tmpl;
    }

    get(
      obj: objectKeyStringNumber,
      path: string,
      defaultValue?: string | boolean | Function
    ): string | boolean | Function {
      const keys = path.replace("]", "").split(/[\[\.]/gi);
      let result: any = obj;

      for (let key of keys) {
        const value = result[key];

        if (!value) {
          return defaultValue;
        }
        result = value;
      }
      return result || defaultValue;
    }

    getNode(ctx: objectKeyStringNumber, className?: string): HTMLElement {
      const element: HTMLElement = document.createElement("div");

      element.insertAdjacentHTML(
        "beforeend",
        this.compile(ctx, className).trim()
      );

      return element;
    }

    eachOf(ctx: objectKeyStringNumber, length: number): string {
      let html = "";
      if (length) {
        window.range(length).forEach(() => {
          html = `${html}
        ${this.compile(ctx)}      
        `;
        });
      }
      return html;
    }
  }
  window.SimpleTemplateEngine = SimpleTemplateEngine;
})();
