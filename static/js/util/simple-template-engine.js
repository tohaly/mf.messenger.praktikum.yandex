window.SimpleTemplateEngine = class SimpleTemplateEngine {
  _TEMPLATE_REGEXP = /\{\%(.*?)\%\}/gi;
  _REGEXP_CTX = /\(\)\(\%(.*?)\%\)/gi;

  constructor(template) {
    this._template = template;
  }

  compile(ctx, className) {
    let string = this._compileTemplate(ctx);
    if (className) {
      string = this.addClassName(string, className);
    }
    return string;
  }

  addClassName(tmpl, className) {
    const rexp = /\<.{1,}\s+class="/i;
    const replacingString = tmpl.match(rexp)[0];
    return tmpl.replace(rexp, `${replacingString}${className} `);
  }

  _compileTemplate(ctx) {
    let tmpl = this._template;
    let key = null;
    const regExp = this._TEMPLATE_REGEXP;

    while ((key = regExp.exec(tmpl))) {
      if (key[1]) {
        const tmplValue = key[1].trim();
        const data = this.get(ctx, tmplValue);

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

  get(obj, path, defaultValue) {
    const keys = path.replace("]", "").split(/[\[\.]/gi);
    let result = obj;

    for (let key of keys) {
      const value = result[key];

      if (!value) {
        return defaultValue;
      }
      result = value;
    }
    return result || defaultValue;
  }

  getNode(ctx, className) {
    const element = document.createElement("div");
    element.insertAdjacentHTML(
      "beforeend",
      this.compile(ctx, className).trim()
    );
    return element.firstChild;
  }

  eachOf(ctx, length) {
    let html = "";
    if (length) {
      window.range(length).forEach(() => {
        html = `${html}
        ${this.compile(ctx)}      
        `;
      });
    } else {
      ctx.forEach((element) => {
        html = `${html}
        ${this.compile(element)}      
        `;
      });
    }
    return html;
  }
};
