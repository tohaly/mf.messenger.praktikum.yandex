import { SimpleTemplateEngine } from './simple-template-engine';

const string = '<button>Click</button>';
const stringWithProp = '<button>{% text %}</button>';
const expected = '<button>Click</button>';

describe('SimpleTemplateEngine', () => {
  it('Возврат разметки без контекста', () => {
    const template = new SimpleTemplateEngine(string);

    const actual = template.compile();

    expect(actual).toEqual(expected);
  });

  it('Возврат разметки с контекстом', () => {
    const ctx = { text: 'Click' };
    const template = new SimpleTemplateEngine(stringWithProp);

    const actual = template.compile(ctx);

    expect(actual).toEqual(expected);
  });

  it('Возврат ноды без контекста контекстом', () => {
    const template = new SimpleTemplateEngine(string);

    const actual = template.getNode().outerHTML;

    expect(actual).toEqual(expected);
  });

  it('Возврат ноды с контекстом контекстом', () => {
    const ctx = { text: 'Click' };
    const template = new SimpleTemplateEngine(stringWithProp);

    const actual = template.getNode(ctx).outerHTML;

    expect(actual).toEqual(expected);
  });

  it('Возврат undefined если передано не правильное имя', () => {
    const ctx = { text: 'Click' };
    const stringWithProp = '<button>{% tex %}</button>';
    const template = new SimpleTemplateEngine(stringWithProp);

    const actual = template.getNode(ctx).outerHTML;
    const expected = '<button>undefined</button>';
    expect(actual).toEqual(expected);
  });
});
