class SimpleTemplateEngine {
    constructor(template) {
        this._TEMPLATE_REGEXP = /\{\%(.*?)\%\}/gi;
        this._REGEXP_CTX = /\(\)\(\%(.*?)\%\)/gi;
        this._template = template;
    }
    compile(ctx, className) {
        let html = this._compileTemplate(ctx);
        if (className) {
            html = this.addClassName(html, className);
        }
        return html;
    }
    addClassName(tmpl, className) {
        const rexp = /\<.{1,}\s+class="/i;
        const matches = tmpl.match(rexp);
        return matches ? tmpl.replace(rexp, `${matches[0]}${className} `) : "";
    }
    _compileTemplate(ctx) {
        let tmpl = this._template;
        let key = null;
        const regExp = this._TEMPLATE_REGEXP;
        const random = String(Math.random() * 100);
        while ((key = regExp.exec(tmpl))) {
            if (key[1]) {
                const tmplValue = key[1].trim();
                const data = this.get(ctx, tmplValue);
                if (typeof data === "function") {
                    console.log(tmplValue);
                    const randomName = `${tmplValue}${`${Math.random() * 100}`.replace(".", "")}`;
                    window[randomName] = data;
                    tmpl = tmpl.replace(new RegExp(key[0], "gi"), `window.${randomName.trim()}()`);
                    const keyCtx = this._REGEXP_CTX.exec(tmpl);
                    if (keyCtx) {
                        tmpl = tmpl.replace(keyCtx[0], `.${keyCtx[1].trim()}()`);
                    }
                }
                tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
            }
            continue;
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
        element.insertAdjacentHTML("beforeend", this.compile(ctx, className).trim());
        return element;
    }
    eachOf(ctx, length) {
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
export { SimpleTemplateEngine };
