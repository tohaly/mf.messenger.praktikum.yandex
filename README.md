# Simple chat

Version: v.1.0.0

## Описание

Клиент мессенджера. Учебный проект для тренировки навыков програмирования. В данном проекте были реализованны: реактивная компонента с собственным жизненым циклом(с применением паттерна event bus), роутинг(singleton, mediator), собственная реализация `fetch` при помощи `XMLHttpRequest`. Применены полученные навыки тестирвоания на `Jest`. 

### Что было сделано
- Разработан дизай в [Figma](https://www.figma.com/file/6I5ORSR415c6Q0JNxVatUe/Chat-maket?node-id=0%3A1&viewport=25%2C180%2C0.16015595197677612) или можно посмотреть скриншоты [Папка со скриншотами](https://github.com/tohaly/mf.messenger.praktikum.yandex/tree/master/ui);
- Верстка HTML, CSS, БЭМ;
- Напсиан собственный шаблонизатор, реактивная компонента, роутинг;
- Реализация fetch;
- В процессе разработки в проект был внедрен TypeScript(исключенно использование any:))
- Виртуализация при помощи Docker(DockerFile);
- Тесты написаны на `Jest`;
- Настроен вебпак:
    - html: `HtmlWebpackPlugin`;
    - обработка css: `css-loader`, `style-loader`, `postcss-loader`, `autoprefixer`, `cssnano`, `mini-css-extract-plugin`;
    - сборка TS/JS: `babel`, `ts-loader`;
- Кодстайлинг: Prettier, Eslint.

## Использование
### Локальный запуск
1. Склонировать репозиторий
    ```
        git clone https://github.com/tohaly/bestbuddies.github.io.git
    ```
2. Доставить отсутствющие модули npm
    ```
        npm i
    ```
3. Запустить локальный сервер
    ```
        npm run dev
    ```

### Публикация на Netlify
1. Сделать форк проекта
2. Склонировать репозиторий
    ```
        git clone https://github.com/tohaly/bestbuddies.github.io.git
    ```
3. Доставить отсутствующие модули npm
    ```
        npm i
    ```
4. Запушить собранный проект на GitHub
    ```
        npm run deployNetlify
    ```

### Внесение изменений
1. При необходимости, после внесения изменений, запустить тестирование
    ```
        npm run eslint
    ```
2. Для автоматического исправления можно воспользоваться командой:
    ```
        npm run eslintFix
    ```

### Запуск проекта на nodejs express
  ```
    npm run start
  ```


## Ссылки на развернутый проект

```
На heroku: https://tohalb-chat.herokuapp.com/
На Netlify: https://ecstatic-edison-b968c0.netlify.app/
```
