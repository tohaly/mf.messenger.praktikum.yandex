# Simple chat

## Описание

Клиент мессенджера позволяющий обмениваться сообщениями.

## Технологии

HTML, CSS, БЭМ

## Как пользоваться

### Запуск сервера

```
npm run start
```

### Деплой проекта

После того как вы зафиксируете изменения, выполнить следующую команду

```
npm run deploy
```

### Сборка проекта

```
npm run build
```

## Ссылка на развернутый проект

```
https://ecstatic-edison-b968c0.netlify.app/
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
