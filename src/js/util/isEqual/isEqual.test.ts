import { isEqual } from './isEqual';

describe('isEqual', () => {
  it('Должно возвращать true если ссылки на объекты равны', () => {
    const a = { a: 'test1' };
    const b = a;
    expect(isEqual(a, b)).toBeTruthy();
  });

  it('Должно возвращать false если ссылки на объекты не равны', () => {
    const a = { a: 'test1' };
    const b = { a: 'test1' };

    expect(isEqual(a, b)).toEqual(false);
  });
});
