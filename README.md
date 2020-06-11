# Simple chat

## Описание

Клиент мессенджера позволяющий обмениваться сообщениями.

## Технологии

HTML, CSS, БЭМ

## Ссылки

```
https://ecstatic-edison-b968c0.netlify.app/ - главная
https://ecstatic-edison-b968c0.netlify.app/pages/signin/ - вход;
https://ecstatic-edison-b968c0.netlify.app/pages/signup/ - регистрация;
https://ecstatic-edison-b968c0.netlify.app/pages/user-settings/ - настройки пользователя;
https://ecstatic-edison-b968c0.netlify.app/pages/not-found/ - ошибка не найдено;
https://ecstatic-edison-b968c0.netlify.app/pages/server-error/ - ошибка сервера.
```

## Полезные команды

```
Данный команды нужно скопировать и вставить в консоль.

Показать начальный экран

document.querySelector('.messages-window__start-container').classList.remove('messages-window__start-container_hidden');
document.querySelector('.messages-window__container').classList.add('messages-window__container_hidden');

Показать экран сообщений

document.querySelector('.messages-window__start-container').classList.add('messages-window__start-container_hidden');
document.querySelector('.messages-window__container').classList.remove('messages-window__container_hidden');
```
