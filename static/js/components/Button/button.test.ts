import { Button } from "./Button.ste";

describe("Тест компонента Button", () => {
  it("Проверка правильности рендера кнопки", () => {
    const props = {
      text: "Click me",
      handleClick() {
        return true;
      },
      className: "button_click",
    };

    const actual = new Button(props).render().trim();
    const expected = '<button class="button button_click" onClick="window.handleClick()" disabled>Click me</button>'.trim();

    expect(actual).toEqual(expected);
  });

  it("Проверка правильности рендера кнопки", () => {
    const props = {
      text: "Click me",
      handleClick() {
        return jest.fn();
      },
      className: "button_click",
    };

    document.body.innerHTML = new Button(props).render().trim();
    let button: any = document.querySelector(".button_click");
    button.click();
    expect(props.handleClick).toBeCalled();
  });
});
