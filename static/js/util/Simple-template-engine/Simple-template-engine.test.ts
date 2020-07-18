import { SimpleTemplateEngine } from "./Simple-template-engine";

describe("SimpleTemplateEngine", () => {
  it("Возврат разметки без контекста", () => {
    const string = "<button>Click</button>";
    const template = new SimpleTemplateEngine(string);
    expect(template.compile()).toEqual("<button>Click</button>");
  });

  it("Возврат разметки с контекстом", () => {
    const string = "<button>{% text %}</button>";
    const template = new SimpleTemplateEngine(string);
    const ctx = { text: "Click" };
    expect(template.compile(ctx)).toEqual("<button>Click</button>");
  });

  //   it("Возврат ноды без контекста контекстом", () => {
  //     const string = "<button>Click</button>";
  //     const template = new SimpleTemplateEngine(string);
  //     // expect(template.getNode().innerHTML).toMatchSnapshot();
  //     document.body.innerHTML =
  //       "<div>" +
  //       '  <span id="username" />' +
  //       '  <button id="button" />' +
  //       "</div>";
  //   });
});
