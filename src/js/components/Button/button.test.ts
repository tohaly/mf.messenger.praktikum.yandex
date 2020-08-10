import { Button } from './Button';

describe('Тест компонента Button', () => {
  it('Проверка правильности рендера кнопки', () => {
    const actual = new Button({ text: 'Click me', className: 'button_click', isDisabled: true })
      .render()
      .trim();
    const expected = '<button disabled class="button button_click" >Click me</button>'.trim();

    expect(actual).toEqual(expected);
  });

  it('Ререндер кнопки после обновления свойств', () => {
    const button = new Button({ text: 'Click me' });

    const mock = jest.fn();

    button.render = mock;

    button.setProps({ text: 'Hi' });

    expect(mock).toBeCalled();

    mock.mockRestore();
  });
});
